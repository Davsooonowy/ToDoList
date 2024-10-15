import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TodoPage from './pages/TodoPage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="header">
        <h1>Tuduś</h1>
      </div>
      <TodoPage />
    </ThemeProvider>
  );
}

export default App;
