"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import type { ChangePassword } from "@/types/APIModels";
import Button from "@/components/Button";
import { ChangeCurrentPassword } from "./service";
interface Props {}

const ChangePasswordPage: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<ChangePassword>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ChangePassword) => {
      const { oldPassword, newPassword, confirmNewP } = data;
      return ChangeCurrentPassword(oldPassword, newPassword, confirmNewP);
    },
    onSuccess: (data) => {
      if (data.message == "Password updated successfully") {
        toast.success("Password Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["newPassword"] });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message || "Updating user detailss failed, please try again.",
      );
    },
  });

  const onSubmit = (data: ChangePassword) => {
    clearErrors();
    mutate(data);
  };

  const onError = (errors: Record<string, { message?: string }>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto rounded-xl bg-white dark:bg-gray-800 shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Change Password
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Old Password
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="password"
            id="password"
            placeholder="••••••••"
            {...register("oldPassword", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="password"
            id="newPassword"
            placeholder="••••••••"
            {...register("newPassword", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
        </div>
        <div>
          <label
            htmlFor="confirmNewP"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="password"
            id="confirmNewP"
            placeholder="••••••••"
            {...register("confirmNewP", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match.",
            })}
          />
        </div>
        {errors.confirmNewP && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.confirmNewP.message}
          </p>
        )}

        <Button disabled={isPending} variant={"form"} customClass={"w-full"}>
          {isPending ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
