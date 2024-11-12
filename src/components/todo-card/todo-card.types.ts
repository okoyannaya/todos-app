export interface TodoCardProps {
  isСompleted: boolean;
  isDelete: boolean;
  handleEdit: VoidFunction;
  handleDelete: VoidFunction;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  id: string
}
