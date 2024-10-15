import { FC, useState } from 'react';
import { IconButton, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  dueDate: Date;
  overdue: boolean;
}

const TodoItem: FC<TodoItemProps> = ({ id, text, completed, dueDate, overdue }) => {
  const { removeTodo, toggleTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    updateTodo(id, newText);
    setIsEditing(false);
  };

  const timeLeft = (dueDate: Date) => {
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  };

  const urgencyLevel = (hoursLeft: number) => {
    if (hoursLeft < 1) return 'high';
    if (hoursLeft < 24) return 'medium';
    return 'low';
  };

  const hoursLeft = timeLeft(dueDate);
  const urgency = urgencyLevel(hoursLeft);

  return (
    <ListItem
      className={`todo-item ${completed ? 'completed' : ''} ${overdue ? 'overdue' : ''} ${urgency}`}
      secondaryAction={
        <>
          {isEditing ? (
            <IconButton edge="end" aria-label="save" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="delete" onClick={() => removeTodo(id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <IconButton edge="start" onClick={() => toggleTodo(id)}>
        {completed ? (
          <CheckCircleIcon style={{ color: 'var(--accent-color)' }} />
        ) : (
          <RadioButtonUncheckedIcon style={{ color: 'var(--accent-color)' }} />
        )}
      </IconButton>
      {isEditing ? (
        <TextField value={newText} onChange={(e) => setNewText(e.target.value)} />
      ) : (
        <ListItemText primary={text} secondary={`Due: ${dueDate.toLocaleString()}`} />
      )}
      {overdue && !completed && <Typography color="error">Overdue</Typography>}
    </ListItem>
  );
};

export default TodoItem;
