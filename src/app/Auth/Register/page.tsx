"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseUser } from "@/contexts/UserContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import type { RegisterData } from "@/types/APIModels";
import { signup } from "./service";
import RegisterForm from "./RegisterForm";

const Registerpage: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { dispatch } = UseUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<RegisterData>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => {
      return signup(data);
    },
    mutationKey: ["registeration"],
    onSuccess: (data) => {
      if (data.accessToken) {
        dispatch({
          type: "Login",
          payload: data,
        });
        toast.success("Registeration successful!");
        queryClient.invalidateQueries({ queryKey: ["accountStatus"] });
        router.push("/");
        reset();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registeration failed. Please try again.");
    },
  });

  const onSubmit = (data: RegisterData) => {
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
    <RegisterForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      register={register}
      errors={errors}
      isLoading={isPending}
      watch={watch}
    />
  );
};

export default Registerpage;
