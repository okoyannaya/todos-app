export interface TodoCardProps {
  isCompleted: boolean;
  isDelete: boolean;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  id: string;
  handleDeleteTodo?: ()=>void
}
