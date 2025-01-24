"use client";

import { loginSchema } from "@/lib/schema";
import { LoginInputs } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import withErrorMessage from "@/components/hocs/withErrorMessage";
import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:rounded-2xl lg:border lg:border-primary-400 lg:p-10"
    >
      <h2 className="mb-6 text-center text-xl font-semibold lg:text-2xl">
        Login
      </h2>
      <div className="mb-6">
        <Controller
          control={control}
          name="email"
          render={({ field }) =>
            withErrorMessage<LoginInputs>(
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
          name="password"
          render={({ field }) =>
            withErrorMessage<LoginInputs>(
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
      <Button type="submit" className="mb-4 w-full">
        Login
      </Button>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="trans-all font-semibold text-primary-400 hover:text-primary-500 focus-visible:text-primary-500"
        >
          Signup
        </Link>
      </p>
    </form>
  );
}
