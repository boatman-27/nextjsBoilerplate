"use client";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EditUserData, getCurrentUserData } from "./service";
import { useForm } from "react-hook-form";

import type { User } from "@/types/UserModels";
import Loader from "@/app/loading";
import EditUserForm from "./EditUserForm";
import ChangePasswordPage from "./ChangePassword";
import Error from "@/app/error";
import { EditedUser } from "@/types/APIModels";
import { UseUser } from "@/contexts/UserContext";

interface Props {}

const ViewProfile: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const { dispatch } = UseUser();
  const { error, isPending, data, isSuccess } = useQuery<{
    message: string;
    user: User;
  }>({
    queryKey: ["userData"],
    queryFn: getCurrentUserData,
    staleTime: 0,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<EditedUser>();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Data fetched successfully");
    }
  }, [isSuccess, data]);

  const { mutate, isPending: isUpdatePending } = useMutation({
    mutationFn: async (data: EditedUser) => {
      const { fname, lname, email } = data;
      return EditUserData(fname, lname, email);
    },
    mutationKey: ["updateUser"],
    onSuccess: (data) => {
      if (data.user && data.accessToken) {
        dispatch({
          type: "UpdateUser",
          payload: { user: data.user, accessToken: data.accessToken },
        });
      } else if (data.user) {
        const token = localStorage.getItem("accessToken");
        dispatch({
          type: "UpdateUser",
          payload: { user: data.user, accessToken: token! },
        });
        toast.success("User Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["updateUser"] });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.message || "Updating user detailss failed, please try again.",
      );
    },
  });

  const onSubmit = (data: EditedUser) => {
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

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return (
      <Error
        error={error as Error}
        reset={() => queryClient.invalidateQueries({ queryKey: ["userData"] })}
      />
    );
  }

  return (
    <div className="flex items-center justify-center p-3 backdrop-blur-md w-2/3">
      <div className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="flex-1">
            <EditUserForm
              User={data.user}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              onError={onError}
              register={register}
              errors={errors}
              isLoading={isPending}
              watch={watch}
            />
          </div>
          <div className="flex-1">
            <ChangePasswordPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
