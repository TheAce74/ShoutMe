"use client";

import { registerSchema } from "@/lib/schema";
import { RegisterInputs } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import withErrorMessage from "@/components/hocs/withErrorMessage";
import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:rounded-2xl lg:border lg:border-primary-400 lg:p-10"
    >
      <h2 className="mb-6 text-center text-xl font-semibold lg:text-2xl">
        SignUp
      </h2>
      <div className="mb-6">
        <Controller
          control={control}
          name="name"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <Input
                {...field}
                id="name"
                placeholder="Name"
                type="text"
                error={Boolean(errors.name)}
              />,
              {
                errors,
                key: "name",
              }
            )
          }
        />
      </div>
      <div className="mb-6">
        <Controller
          control={control}
          name="email"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <Input
                {...field}
                id="email"
                placeholder="Email"
                type="email"
                error={Boolean(errors.email)}
              />,
              {
                errors,
                key: "email",
              }
            )
          }
        />
      </div>
      <div className="mb-6">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <Input
                {...field}
                id="phoneNumber"
                placeholder="Phone"
                type="text"
                error={Boolean(errors.phoneNumber)}
              />,
              {
                errors,
                key: "phoneNumber",
              }
            )
          }
        />
      </div>
      <div className="mb-6">
        <Controller
          control={control}
          name="location"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <Input
                {...field}
                id="location"
                placeholder="Location (residence in school)"
                type="text"
                error={Boolean(errors.location)}
              />,
              {
                errors,
                key: "location",
              }
            )
          }
        />
      </div>
      <div className="mb-6">
        <Controller
          control={control}
          name="password"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <PasswordInput
                {...field}
                id="password"
                placeholder="Password"
                error={Boolean(errors.password)}
              />,
              {
                errors,
                key: "password",
              }
            )
          }
        />
      </div>
      <div className="mb-6">
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) =>
            withErrorMessage<RegisterInputs>(
              <PasswordInput
                {...field}
                id="confirmPassword"
                placeholder="Confirm password"
                error={Boolean(errors.confirmPassword)}
              />,
              {
                errors,
                key: "confirmPassword",
              }
            )
          }
        />
      </div>
      <Button type="submit" className="mb-4 w-full">
        Signup
      </Button>
      <p className="text-center">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="trans-all font-semibold text-primary-400 hover:text-primary-500 focus-visible:text-primary-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
