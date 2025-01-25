import Button from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "@phosphor-icons/react";
import { useCallback, useRef } from "react";

function useSuccess(message: string, btnText: string) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  const closeDialog = useCallback(() => {
    closeRef.current?.click();
  }, []);

  const openDialog = useCallback(() => {
    openRef.current?.click();
  }, []);

  return {
    openSuccessDialog: openDialog,
    closeSuccessDialog: closeDialog,
    successDialog: (
      <Dialog>
        <DialogTrigger ref={openRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogClose className="hidden" ref={closeRef}>
          Close
        </DialogClose>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Successful action</DialogTitle>
            <DialogDescription>Yay! it worked out</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <h2 className="mb-4 text-center text-xl font-semibold lg:text-2xl">
              Successful
            </h2>
            <div className="trans-all mx-auto mb-8 flex w-max items-center justify-center rounded-circle bg-success-400 p-6 text-neutral-100">
              <Check size={64} weight="bold" />
            </div>
            <p className="mb-6 text-center">{message}</p>
            <Button
              variant="inverted"
              className="mx-auto"
              onClick={closeDialog}
            >
              {btnText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    ),
  };
}

export { useSuccess };
