export interface DD_Transaction {
  id: string;

  userId: string; // owner of that expense
  timestamp: number;
  day: number;
  month: number;
  year: number;

  warningMessage?: string; // extra note to be reminded of

  categoryId: string; // unique category => the hierarchy will be handled within categories collection
  amount: number;
  description: string;

  tagId?: string;
  recurrencyId?: string; // reference to the recurrency
}
