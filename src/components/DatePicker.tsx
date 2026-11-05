"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  id?: string;
  value?: Date | null;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ id, value, onDateChange }: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date>();
  const date = value === undefined ? internalDate : value ?? undefined;

  function handleDateChange(selectedDate: Date | undefined) {
    if (value === undefined) {
      setInternalDate(selectedDate);
    }
    onDateChange?.(selectedDate);
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant={"outline"}
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
