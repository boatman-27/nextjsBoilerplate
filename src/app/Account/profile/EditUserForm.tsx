import React from "react";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { User } from "@/types/UserModels";
import type { EditedUser } from "@/types/APIModels";
import Button from "@/components/Button";

interface UpdateUserProps {
  User: User;
  handleSubmit: UseFormHandleSubmit<EditedUser>;
  onSubmit: (data: EditedUser) => void;
  onError: (errors: FieldErrors<EditedUser>) => void;
  register: UseFormRegister<EditedUser>;
  errors: FieldErrors<EditedUser>;
  isLoading: boolean;
  watch: (name: string) => string;
}

const EditUserForm: React.FC<UpdateUserProps> = ({
  User,
  handleSubmit,
  onSubmit,
  onError,
  register,
  errors,
  isLoading,
  watch,
}) => {
  const { Fname, Lname, Email, UserId, UserRole, Level, Xp, Coins, Streak } =
    User;
  return (
    <>
      <div className="max-w-3xl mx-auto rounded-xl bg-white dark:bg-gray-800 shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Edit Your Profile
        </h3>

        <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Username
              </h4>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {UserId}
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fName"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                id="fName"
                type="text"
                placeholder="John"
                defaultValue={Fname}
                {...register("fname", {
                  required: "Please enter your first name.",
                })}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors.fname && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fname.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lName"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                id="lName"
                type="text"
                placeholder="Doe"
                defaultValue={Lname}
                {...register("lname", {
                  required: "Please enter your last name.",
                })}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors.lname && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lname.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                defaultValue={Email}
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format.",
                  },
                })}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Level
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {Level}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                XP
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {Xp}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Coins
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {Coins}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Streak
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {Streak}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Role
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {UserRole}
              </span>
            </div>
          </div>

          <Button disabled={isLoading} variant={"form"} customClass={"w-full"}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditUserForm;
