import { Checkbox } from "@/components/components/ui/checkbox";
import { Label } from "@/components/components/ui/label";
import clsx from "clsx";
import React from "react";
import { SelectInput } from "../../courses/_components/heroSearchBar";
import { useRegisterInstructorContext } from "./registerInstructorContext";

type InputProps = {
  type: string;
  placeholder?: string;
  description: string;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  inputValue?: string | number;
  name: string;
  min?: number;
  max?: number;
};

type InputSelectProps = {
  selectItems: string[];
  selectLabel: string;
  selectPlaceholder: string;
  multiple?: boolean;
};
type InputCheckboxProps = {
  checkboxId: string;
  label: string;
  paragraph?: string;
  selectedOption: boolean;
  onhandleSelectionChange: (field: string, value: any) => void;
};

export function InstructorFormInput({
  type,
  setSelected,
  placeholder,
  description,
  name,
  inputValue,
  min,
  max,
}: InputProps) {
  const { updateRegisterDataForm } = useRegisterInstructorContext();
  return (
    <>
      <Label className="w-[80%]">{description}</Label>
      <input
        type={type}
        name={name}
        id={name}
        value={inputValue ? inputValue : ""}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.type);
          if (setSelected) {
            setSelected((prev: any) => ({
              ...prev,
              [name]: e.target.value,
            }));

            updateRegisterDataForm(
              type === "number"
                ? { [name]: Number(e.target.value) }
                : { [name]: e.target.value }
            );
          }
        }}
        className={clsx(
          "bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg outline-none ring-2 ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px] placeholder:overflow-hidden"
        )}
      />
    </>
  );
}

export function InstructorFormSelect({
  selectItems,
  selectLabel,
  selectPlaceholder,
}: InputSelectProps) {
  return (
    <SelectInput
      className="w-full max-w-full"
      selectItems={selectItems}
      selectLabel={selectLabel}
      selectPlaceholder={selectPlaceholder}
    />
  );
}

export function InstructorFormCheckbox({
  checkboxId,
  label,
  paragraph,
  selectedOption,
  onhandleSelectionChange,
}: InputCheckboxProps) {
  console.log(selectedOption);
  return (
    <div className="flex items-center gap-3">
      <input
        type="hidden"
        name={checkboxId}
        value={selectedOption.toString()}
      />
      <Checkbox
        id={checkboxId}
        className="h-6 w-6 border-1 border-primary cursor-pointer"
        required
        checked={selectedOption}
        onCheckedChange={() =>
          onhandleSelectionChange(checkboxId, !selectedOption)
        }
      />
      <div className="grid gap-2">
        <Label htmlFor={checkboxId}>{label}</Label>
        {paragraph && (
          <p className="text-muted-foreground text-sm">{paragraph}</p>
        )}
      </div>
    </div>
  );
}
