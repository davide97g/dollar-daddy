export interface DD_Tag {
  id: string;

  userId: string;

  title: string;
  shortName: string;
  color: string;

  holiday?: boolean;

  excluded?: boolean;
  deleted?: boolean;
}
