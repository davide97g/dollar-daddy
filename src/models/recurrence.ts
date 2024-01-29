export type WEEK_DAY =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface DD_Recurrence {
  id: string;
  userId: string;
  startingDate: string;
  endingDate: string;
  frequencyType: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  repeatMode: "END_DATE" | "NUMBER_OF_RECURRENCIES";
  repeatEvery?: number;
  repeatOnWeekly?: WEEK_DAY[]; // Monday to Sunday
  repeatOnMonthly?: number[]; // 1,3,17,29,31 (exception for last days of months 29->31)
}
