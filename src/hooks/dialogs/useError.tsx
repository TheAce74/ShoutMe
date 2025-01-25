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
import { X } from "@phosphor-icons/react";
import { useCallback, useRef } from "react";

function useError(message: string, btnText: string) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  const closeDialog = useCallback(() => {
    closeRef.current?.click();
  }, []);

  const openDialog = useCallback(() => {
    openRef.current?.click();
  }, []);

  return {
    openErrorDialog: openDialog,
    closeErrorDialog: closeDialog,
    errorDialog: (
      <Dialog>
        <DialogTrigger ref={openRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogClose className="hidden" ref={closeRef}>
          Close
        </DialogClose>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Failed action</DialogTitle>
            <DialogDescription>Boo! too bad</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <h2 className="mb-4 text-center text-xl font-semibold lg:text-2xl">
              Failed
            </h2>
            <div className="trans-all mx-auto mb-8 flex w-max items-center justify-center rounded-circle bg-primary-400 p-6 text-neutral-100">
              <X size={64} weight="bold" />
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

export { useError };
