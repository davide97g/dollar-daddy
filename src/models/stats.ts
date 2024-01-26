export interface DD_Stats {
  year: number;
  month?: number; // ? if "monthly" this is a valid month
  userId: string;

  totEarnings: number;
  totExpenses: number;

  categories: {
    categoryId: string;
    total: number;
  }[];
}
