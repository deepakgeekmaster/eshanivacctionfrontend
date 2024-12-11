"use client";
import * as React from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({ onChange, className }) {
  const [date, setDate] = useState({
    from: new Date(), 
    to: addDays(new Date(),1),
  });

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    if (onChange) {
      const timeDiff = Math.abs(newDate.from - newDate.to);
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate number of nights
      onChange(newDate, numberOfNights); // Pass the date range and the number of nights to parent
    }
  };


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect} // Update the local date state when a date range is selected
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
