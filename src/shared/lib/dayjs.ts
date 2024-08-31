import dayjs, { Dayjs, ManipulateType } from "dayjs";
type DayJsValueType = string | null | Dayjs;
export function getToday(format: string = "YYYY-MM-DD") {
	return dayjs().format(format);
}
export function getWeekAgo(
	value: DayJsValueType,
	format: string = "YYYY-MM-DD"
) {
	return dayjs(value).subtract(7, "d").format(format);
}
export function getMonthStart(
	value: DayJsValueType = null,
	format: string = "YYYY-MM-DD"
) {
	let day = dayjs(value);
	if (!value) {
		day = dayjs();
	}
	return day.startOf("M").format(format);
}
export function getMonthEnd(
	value: DayJsValueType = null,
	format: string = "YYYY-MM-DD"
) {
	let day = dayjs(value);
	if (!value) {
		day = dayjs();
	}
	return day.endOf("M").format(format);
}
export type GetDateOptionsType = {
	value?: DayJsValueType;
	format?: string;
	diff?: {
		num: number;
		unit?: ManipulateType;
	};
};
export function getDate(options: GetDateOptionsType) {
	const { value = null, diff = { num: 0, unit: "day" } } = options;
	let dt = dayjs(value);
	if (!value) {
		dt = dayjs();
	}
	if (diff?.num > 0) {
		dt = dt.add(diff.num, diff?.unit);
	}
	if (diff.num < 0) {
		dt = dt.subtract(diff.num, diff?.unit);
	}
	return dt.toDate();
}
export function getDateFormatted(options: GetDateOptionsType) {
	const { format = "YYYY-MM-DD" } = options;
	const dt = getDate(options);
	return dayjs(dt).format(format);
}
