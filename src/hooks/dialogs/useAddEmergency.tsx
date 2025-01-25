import AddEmergencyForm from "@/components/ui/dashboard/AddEmergencyForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useRef } from "react";

function useAddEmergency(
  success: {
    open: () => void;
    close: () => void;
  },
  error: {
    open: () => void;
    close: () => void;
  }
) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  const closeDialog = useCallback(() => {
    closeRef.current?.click();
  }, []);

  const openDialog = useCallback(() => {
    openRef.current?.click();
  }, []);

  return {
    openEmergencyDialog: openDialog,
    closeEmergencyDialog: closeDialog,
    emergencyDialog: (
      <Dialog>
        <DialogTrigger ref={openRef} className="hidden">
          Open
        </DialogTrigger>
        <DialogClose className="hidden" ref={closeRef}>
          Close
        </DialogClose>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Create an alert</DialogTitle>
            <DialogDescription>
              Alert everyone on the current situation
            </DialogDescription>
          </DialogHeader>
          <AddEmergencyForm
            closeEmergencyDialog={closeDialog}
            success={success}
            error={error}
          />
        </DialogContent>
      </Dialog>
    ),
  };
}

export { useAddEmergency };
