import clsx from "clsx";
import React from "react";
import { SelectInput } from "../../courses/_components/heroSearchBar";
import { Label } from "@/components/components/ui/label";

type InputProps = {
  type: string;
  placeholder?: string;
  description: string;
  name: string;
};

type InputSelectProps = {
  selectItems: string[];
  selectLabel: string;
  selectPlaceholder: string;
  multiple?: boolean;
};

export function InstructorFormInput({
  type,
  placeholder,
  description,
  name,
}: InputProps) {
  return (
    <>
      <Label className="w-[80%]">{description}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={clsx(
          "bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg outline-none ring-2 ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
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
