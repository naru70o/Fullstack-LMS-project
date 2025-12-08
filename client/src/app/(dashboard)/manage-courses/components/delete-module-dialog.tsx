"use client";

import { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { deleteModule } from "../action";
import toast from "react-hot-toast";
import { Loader2, AlertTriangle } from "lucide-react";
import { Module } from "../types";

interface DeleteModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module;
}

const initialState = {
  status: "",
  message: "",
};

export default function DeleteModuleDialog({
  isOpen,
  onOpenChange,
  module,
}: DeleteModuleDialogProps) {
  const [state, action, isPending] = useActionState(deleteModule, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      onOpenChange(false);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertTriangle className="h-6 w-6" />
            <DialogTitle>Delete Module?</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete the module &quot;
            <strong>{module.title}</strong>&quot;? This action cannot be undone
            and will delete all lectures within this module.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="mt-4 flex justify-end gap-2">
          <input type="hidden" name="moduleId" value={module.id} />
          <Button type="submit" variant="destructive" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Module"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
