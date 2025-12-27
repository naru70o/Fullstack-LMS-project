import { Button } from "@/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Label } from "@/components/components/ui/label";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateModule } from "../action";
import { Module } from "../types";
import { Textarea } from "@/components/components/ui/textarea";

interface EditModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module;
}

export default function EditModuleDialog({
  isOpen,
  onOpenChange,
  module,
}: EditModuleDialogProps) {
  const [state, action, isPending] = useActionState(updateModule, null);

  useEffect(() => {
    if (state?.status === "success") {
      if (Array.isArray(state.message)) {
        toast.success(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
        onOpenChange(false);
      } else {
        toast.success(state.message ?? "Module updated successfully");
        onOpenChange(false);
      }
    } else if (state?.status === "error") {
      if (Array.isArray(state.message)) {
        toast.error(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
      } else {
        toast.error(state.message ?? "Failed to update module");
      }
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
          <DialogDescription>Update the module information</DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-4">
          <input type="hidden" name="moduleId" value={module.id} />
          <div className="space-y-2">
            <Label htmlFor="edit-module-title">Module Title</Label>
            <input
              className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
              id="edit-module-title"
              name="title"
              defaultValue={module.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-module-description">Description</Label>
            <Textarea
              id="edit-module-description"
              name="description"
              defaultValue={module.description}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
