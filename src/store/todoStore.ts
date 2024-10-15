import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: Date;
  overdue: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, dueDate: Date) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  checkOverdueTodos: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text: string, dueDate: Date) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false, dueDate, overdue: false }],
    })),
  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  updateTodo: (id: number, text: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      ),
    })),
  checkOverdueTodos: () =>
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (!todo.completed && new Date() > new Date(todo.dueDate)) {
          return { ...todo, completed: true, overdue: true };
        }
        return todo;
      }),
    })),
}));

setInterval(() => {
  useTodoStore.getState().checkOverdueTodos();
}, 60000);
