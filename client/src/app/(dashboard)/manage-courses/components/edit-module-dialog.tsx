import { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { Label } from "@/components/components/ui/label";
import { updateModule } from "../action";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Module } from "../types";

interface EditModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module;
}

interface ActionState {
  status?: string;
  message?: string;
  data?: any;
  errors?: Record<string, string[]>;
}

const initialState: ActionState = {
  status: "idle",
  message: "",
  errors: undefined,
};

export default function EditModuleDialog({
  isOpen,
  onOpenChange,
  module,
}: EditModuleDialogProps) {
  // Cast updateModule to any to bypass strict type check on the union return type mismatch
  // or better, define the action type properly. For now, casting is safest to proceed without changing action.ts
  const [state, action, isPending] = useActionState(
    updateModule as any,
    initialState
  );

  useEffect(() => {
    if (state?.status === "success") {
      if (state.message) toast.success(state.message);
      onOpenChange(false);
    } else if (state?.status === "error") {
      if (state.message) toast.error(state.message);
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
            {state?.errors?.title && (
              <p className="text-sm text-destructive">
                {state.errors.title.join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-module-description">Description</Label>
            <textarea
              id="edit-module-description"
              name="description"
              defaultValue={module.description}
              rows={3}
            />
            {state?.errors?.description && (
              <p className="text-sm text-destructive">
                {state.errors.description.join(", ")}
              </p>
            )}
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
