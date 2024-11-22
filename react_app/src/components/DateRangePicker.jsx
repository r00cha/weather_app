import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main stylesheet
import "react-date-range/dist/theme/default.css"; // Theme stylesheet
import { addDays } from "date-fns";
import enUS from "date-fns/locale/en-US"; // Import the desired locale

function DateRangePicker({ onSelectRange }) {
    const [range, setRange] = useState([
        {
            startDate: new Date("2024-11-06"), // Default start date: November 6, 2024
            endDate: new Date("2024-11-09"), // Default end date: November 6, 2024
            key: "selection",
        },
    ]);

    const handleSelect = (ranges) => {
        setRange([ranges.selection]);
        const start_date = ranges.selection.startDate.toISOString().split("T")[0];
        const end_date = ranges.selection.endDate.toISOString().split("T")[0];
        onSelectRange({ start_date, end_date });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <label className="pt-4 pb-2 self-start text-lg font-medium text-gray-900">
                Select a Date Range
            </label>
            <DateRange
                className="w-full"
                ranges={range}
                onChange={handleSelect}
                locale={enUS} // Pass the locale here
            />
        </div>
    );
}

export default DateRangePicker;
