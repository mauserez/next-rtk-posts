import { InputLabel, InputLabelProps, Stack } from "@mantine/core";
import { Calendar, CalendarProps } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
import { MdClear } from "react-icons/md";
import { getDate, getDateFormatted } from "shared/lib/dayjs";
import { ButtonActionIcon } from "shared/ui/buttons";
interface DayPickerProps extends CalendarProps {
	label?: InputLabelProps["children"];
}
export function DayPicker(props: DayPickerProps) {
	const {
		label = "",
		defaultValue = [],
		hideOutsideDates = true,
		hideWeekdays = true,
		defaultDate = getDate({ value: "2024-07-01" }),
		classNames,
	} = props;
	const [selected, setSelected] = useState<string[]>([]);
	const handleSelect = (dt: Date) => {
		console.log(dt);
		const dayNumber = getDateFormatted({ value: dayjs(dt), format: "D" });
		const isDaySelected = selected.includes(dayNumber);
		if (isDaySelected) {
			setSelected((current) => current.filter((d) => d !== dayNumber));
		} else {
			setSelected((current) => [...current, dayNumber]);
		}
	};
	const defaultClassNames = { calendarHeader: "hidden" };
	console.log(selected);
	return (
		<Stack gap={4} className="relative">
			{label ? <InputLabel>{label}</InputLabel> : null}
			<Calendar
				weekendDays={[]}
				defaultValue={defaultValue}
				classNames={{ ...defaultClassNames, ...classNames }}
				// зашито для 1 день понедельник
				defaultDate={defaultDate}
				hideOutsideDates={hideOutsideDates}
				hideWeekdays={hideWeekdays}
				getDayProps={(dt) => ({
					selected: selected.includes(
						getDateFormatted({ value: dayjs(dt), format: "D" })
					),
					onClick: () => handleSelect(dt),
				})}
			/>
		</Stack>
	);
}
