export interface DD_Transaction {
  id: string;

  userId: string; // owner of that expense
  month: number;
  year: number;

  categoryId: string; // unique category => the hierarchy will be handled within categories collection
  value: number;
  description: string;

  tagId?: string;
  recurrencyId?: string; // reference to the recurrency
}
