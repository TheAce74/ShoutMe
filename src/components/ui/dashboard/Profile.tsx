"use client";

import { profileSchema } from "@/lib/schema";
import { ProfileInputs } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import withErrorMessage from "@/components/hocs/withErrorMessage";
import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotePencil } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/sbutton";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/tanstack/queries/user/useGetUser";
import { useAuthStore } from "@/store/auth";
import { useUpdateUser } from "@/hooks/tanstack/mutations/user/useUpdateUser";

export default function Profile() {
  const { user } = useGetUser();
  const { logout } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      phoneNumber: user ? user.phoneNumber : "",
      location: user ? user.location : "",
      password: "",
      profilePicture: user ? user.profilePicture : "",
    },
  });

  const [disabled, setDisabled] = useState(true);

  const selectedImage = watch("profilePicture");

  const { updateUser, updateUserPending } = useUpdateUser(() => {
    setDisabled(true);
  });

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    await updateUser(data);
  };

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phoneNumber", user.phoneNumber);
      setValue("location", user.location);
      setValue("profilePicture", user.profilePicture ?? "");
      setValue("password", "");
    }
  }, [user, setValue]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-8"
      >
        <div
          className={cn(
            "relative mx-auto !mb-6 w-max",
            Boolean(errors.profilePicture) && "!mb-12"
          )}
        >
          <Avatar className="size-[120px] lg:size-[320px]">
            <AvatarImage
              src={
                selectedImage
                  ? typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                  : undefined
              }
            />
            <AvatarFallback className="text-3xl">
              {getInitials(user ? user.name : "User Profile")}
            </AvatarFallback>
          </Avatar>
          {/* special file input */}
          <div>
            <Controller
              control={control}
              name="profilePicture"
              render={({ field }) =>
                withErrorMessage<ProfileInputs>(
                  <>
                    <Input
                      type="file"
                      className="hidden"
                      id="profilePicture"
                      placeholder="Upload image"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                    <label
                      htmlFor="profilePicture"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute bottom-0 right-0 z-[2] !h-9 !w-9 cursor-pointer !rounded-circle bg-accent !p-0 hover:text-primary-400 focus-visible:text-primary-400 lg:bottom-7 lg:right-7",
                        Boolean(errors.profilePicture) && "text-primary-500"
                      )}
                      tabIndex={0}
                    >
                      <NotePencil size={20} />
                    </label>
                  </>,
                  {
                    errors,
                    key: "profilePicture",
                  },
                  "absolute -bottom-8 left-1/2 -translate-x-1/2 w-[min(500px,_90dvw)] lg:w-[920px] mx-auto text-center"
                )
              }
            />
          </div>
        </div>
        <div className="lg:rounded-2xl lg:border lg:border-primary-400 lg:p-10">
          <h2 className="mb-6 text-center text-xl font-bold text-primary-400 lg:text-2xl">
            Personal Details
          </h2>
          <div className="mb-6">
            <Controller
              control={control}
              name="name"
              render={({ field }) =>
                withErrorMessage<ProfileInputs>(
                  <Input
                    {...field}
                    id="name"
                    placeholder="Name"
                    type="text"
                    error={Boolean(errors.name)}
                    disabled={disabled}
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
                withErrorMessage<ProfileInputs>(
                  <Input
                    {...field}
                    id="email"
                    placeholder="Email"
                    type="email"
                    error={Boolean(errors.email)}
                    disabled={disabled}
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
                withErrorMessage<ProfileInputs>(
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Phone"
                    type="text"
                    error={Boolean(errors.phoneNumber)}
                    disabled={disabled}
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
                withErrorMessage<ProfileInputs>(
                  <Input
                    {...field}
                    id="location"
                    placeholder="Location (residence in school)"
                    type="text"
                    error={Boolean(errors.location)}
                    disabled={disabled}
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
                withErrorMessage<ProfileInputs>(
                  <PasswordInput
                    {...field}
                    id="password"
                    placeholder="Password"
                    error={Boolean(errors.password)}
                    disabled={disabled}
                  />,
                  {
                    errors,
                    key: "password",
                  }
                )
              }
            />
          </div>
          <div className="ml-auto flex w-max items-center gap-4">
            <Button disabled={!disabled} onClick={() => setDisabled(false)}>
              Update
            </Button>
            <Button
              variant="inverted"
              type="submit"
              disabled={disabled || updateUserPending}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
      <button
        className="trans-all mx-auto mt-6 block w-max text-lg font-semibold text-primary-400 hover:text-primary-500 focus-visible:text-primary-500 active:scale-95 lg:hidden"
        onClick={logout}
      >
        Logout from your account
      </button>
    </div>
  );
}
