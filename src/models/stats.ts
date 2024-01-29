export interface DD_Stats {
  year: number;
  month?: number; // ? if "monthly" this is a valid month
  day?: number; // ? if 'daily' this is a valid day
  userId: string;

  totEarnings: number;
  totExpenses: number;

  // *** AGGREGATED
  categories: {
    categoryId: string;
    total: number;
  }[];
}
