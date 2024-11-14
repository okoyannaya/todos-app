export interface TodoCardProps {
  isСompleted: boolean;
  isDelete: boolean;
  handleDelete: VoidFunction;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  id: string
}
