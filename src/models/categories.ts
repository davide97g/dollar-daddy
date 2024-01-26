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
  excluded?: boolean;
  childrenCategoryIdList?: string; // children here (MAYBE NOT USEFUL)
}
