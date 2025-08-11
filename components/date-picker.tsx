"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getLocalMySQLDatetime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { Input, InputProps } from "./ui/input";


type DatePickerProps = InputProps & {
    hasRegister?: boolean,
    register?: any,
    fieldName?: string,
    defaultDate?: any,
    disabledDate?: any,
    
};





export default function DatePicker({
    hasRegister,
    register,
    fieldName,
    defaultDate,
    disabledDate,
    ...restProps
}: DatePickerProps) {
    const selectedDate = defaultDate ? new Date(defaultDate) : new Date();
    const [date, setDate] = React.useState<any | null>(selectedDate);
    const { theme: mode } = useTheme();
    const [open, setOpen] = React.useState(false);

    const setSelectedDate = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            setOpen(false); // close on date selection
        }
    };

    return (
        <div className={cn("grid gap-2")}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>

                    {
                        hasRegister ? <Input value={getLocalMySQLDatetime(undefined, date)} {...register(fieldName)} {...restProps} /> : <Input value={date} {...restProps} />
                    }



                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[999999999999999999999999]" align="end">
                    <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={date}
                        selected={date}
                        onSelect={setSelectedDate}
                        numberOfMonths={1}
                        className="z-[9999999999999999999999]"
                        disabled={{ after: disabledDate }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
