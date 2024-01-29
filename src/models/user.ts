import type { DD_Category } from "./categories";
import type { DD_Recurrence } from "./recurrence";
import type { DD_Stats } from "./stats";
import type { DD_Tag } from "./tag";
import type { DD_Transaction } from "./transaction";

export interface DD_User {
  id: string;
  subscriptionId?: string;
  email: string;
  displayName: string;
  settings?: UserSettings;
  friendList?: string[]; // list of friends to whom you are sharing the expenses with
  // subcollections
  transactions?: DD_Transaction[];
  categories?: DD_Category[];
  tags?: DD_Tag[];
  statistics?: DD_Stats[];
  recurrencies?: DD_Recurrence[];
}

interface UserSettings {
  theme?: string;
  holidayMode?: {
    active: boolean;
    startDate?: string;
    endDate?: string;
    tagId: string;
  };
  startOfMonth?: number;
}
