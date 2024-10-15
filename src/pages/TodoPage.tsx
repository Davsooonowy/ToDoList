import { useState } from 'react';
import { TextField, Button, List, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTodoStore } from '../store/todoStore';
import TodoItem from '../components/TodoItem';

const TodoPage = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const { todos, addTodo } = useTodoStore();

  const handleAddTodo = () => {
    let finalDueDate = dueDate;
    if (!finalDueDate) {
      finalDueDate = new Date();
      finalDueDate.setHours(23, 59, 59, 999);
    }
    if (text.trim()) {
      addTodo(text, finalDueDate);
      setText('');
      setDueDate(null);
    }
  };

  const undoneTodos = todos.filter(todo => !todo.completed);
  const doneTodos = todos.filter(todo => todo.completed);

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Todo List</Typography>
      </div>
      <div className="todo-input">
        <TextField
          label="New Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          fullWidth
        />
        <TextField
          label="Due Date"
          type="datetime-local"
          value={dueDate ? dueDate.toISOString().slice(0, 16) : ''}
          onChange={(e) => setDueDate(new Date(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleAddTodo} variant="contained" color="primary">Add</Button>
      </div>
      <Typography variant="h6">Undone Tasks</Typography>
      <List className="todo-list">
        {undoneTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </List>
      <Accordion className="accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Done Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className="todo-list">
            {doneTodos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TodoPage;
