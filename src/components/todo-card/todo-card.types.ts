export interface TodoCardProps {
  isCompleted: boolean;
  isDelete: boolean;
  handleDelete: VoidFunction;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
}
