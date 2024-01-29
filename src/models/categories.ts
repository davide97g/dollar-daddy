export interface DD_Category {
  id: string;

  userId: string;

  title: string;
  color: string;

  budget?: {
    weekly?: number;
    monthly?: number;
    yearly?: number;
  };
  excludedFromStats?: boolean;
  parentCategoryId?: string;
  deleted?: boolean;
}
