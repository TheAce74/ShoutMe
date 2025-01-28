"use client";

import { addEmergencySchema } from "@/lib/schema";
import { AddEmergencyInputs } from "@/lib/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import withErrorMessage from "@/components/hocs/withErrorMessage";
import Button from "@/components/ui/button";
import { useCountDown } from "@/hooks/useCountDown";
import { useCallback, useEffect } from "react";
import { useAddEmergency } from "@/hooks/tanstack/mutations/emergency/useAddEmergency";

type AddEmergencyFormProps = {
  closeEmergencyDialog: () => void;
  success: {
    open: () => void;
    close: () => void;
  };
  error: {
    open: () => void;
    close: () => void;
  };
};

export default function AddEmergencyForm({
  closeEmergencyDialog,
  success,
  error,
}: AddEmergencyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddEmergencyInputs>({
    resolver: zodResolver(addEmergencySchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
    },
  });

  const title = watch("title");
  const location = watch("location");
  const description = watch("description");

  const { startCountdown, pauseCountdown, seconds } = useCountDown(10);

  const { addEmergency, addEmergencyPending } = useAddEmergency(() => {
    success.open();
    closeEmergencyDialog();
  }, error.open);

  const onSubmit: SubmitHandler<AddEmergencyInputs> = useCallback(
    async (data) => {
      await addEmergency(data);
    },
    [addEmergency]
  );

  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (title || location || description) {
      pauseCountdown();
    }
  }, [title, location, description, pauseCountdown]);

  useEffect(() => {
    if (Number(seconds) === 0) {
      onSubmit({
        title: "High alert!",
        location: "Unknown",
        description: "Beware! It's very dangerous so be extremely cautious",
      });
    }
  }, [seconds, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="mb-6 text-center text-xl font-semibold lg:text-2xl">
        Add Emergency
      </h2>
      <div className="mb-6">
        <Controller
          control={control}
          name="title"
          render={({ field }) =>
            withErrorMessage<AddEmergencyInputs>(
              <Input
                {...field}
                id="title"
                placeholder="Title"
                type="text"
                error={Boolean(errors.title)}
              />,
              {
                errors,
                key: "title",
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
            withErrorMessage<AddEmergencyInputs>(
              <Input
                {...field}
                id="location"
                placeholder="Location"
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
          name="description"
          render={({ field }) =>
            withErrorMessage<AddEmergencyInputs>(
              <Input
                {...field}
                id="description"
                placeholder="Description"
                type="text"
                error={Boolean(errors.description)}
              />,
              {
                errors,
                key: "description",
              }
            )
          }
        />
      </div>
      <Button
        type="submit"
        className="mb-4 w-full"
        disabled={addEmergencyPending}
      >
        Submit
      </Button>
      <p className="mb-4 text-center">
        This form will auto-submit if not interacted with in
      </p>
      <p className="text-center text-6xl font-bold text-primary-400">
        {seconds}
      </p>
    </form>
  );
}
