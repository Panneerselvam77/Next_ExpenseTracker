"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface ComboboxBasicProps<T extends string> {
  dropdowninput: readonly T[];
  id: string;
  value: T | "";
  onValueChange: (value: T | null) => void;
  required?: boolean;
}

export function ComboboxBasic<T extends string>({
  dropdowninput,
  id,
  value,
  onValueChange,
  required,
}: ComboboxBasicProps<T>) {
  return (
    <Combobox
      items={dropdowninput}
      value={value || null}
      onValueChange={onValueChange}
    >
      <ComboboxInput
        id={id}
        placeholder="Select"
        required={required}
        className="w-full"
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
