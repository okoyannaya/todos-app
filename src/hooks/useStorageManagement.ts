import { RootTodos } from "src/types";

export const useStorageManagement = () => {
    function getTodosFromLocalStorage(key: 'activeTodos' | 'deletedTodos'): RootTodos[] {
        const todosString = localStorage.getItem(key);
        if (todosString) {
          const parsedTodos: RootTodos[] = JSON.parse(todosString);
          
          return parsedTodos.map(todo => ({
            ...todo,
            startDate: new Date(todo.startDate),
            endDate: new Date(todo.endDate),
          }));
        }

        return [];
      }

  function saveDeletedTodoToLocalStorage(todo: RootTodos) {
    const deletedTodos = getTodosFromLocalStorage('deletedTodos');
    deletedTodos.push(todo);
    localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
  }

  function moveTodoToDeleted(id: string) {
    const activeTodos = getTodosFromLocalStorage('activeTodos');
    const todoIndex = activeTodos.findIndex(todo => todo.id === id);
    
    if (todoIndex > -1) {
      const [todo] = activeTodos.splice(todoIndex, 1);
      saveDeletedTodoToLocalStorage(todo);
      localStorage.setItem('activeTodos', JSON.stringify(activeTodos));
    }
  }

  function saveTodoToLocalStorage(todo: RootTodos) {
    const activeTodos = getTodosFromLocalStorage("activeTodos");

    // Проверка, есть ли тудушка с таким id
    const todoIndex = activeTodos.findIndex(
      (existingTodo) => existingTodo.id === todo.id
    );

    if (todoIndex > -1) {
      // Заменяем старую тудушку на отредактированную
      activeTodos[todoIndex] = todo;
      localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
    } else {
      // Если тудушка не найдена, добавляем новую
      activeTodos.push(todo);
      localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
    }
  }

  return { getTodosFromLocalStorage, saveTodoToLocalStorage, moveTodoToDeleted }
};
