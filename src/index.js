import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function TodoListItem({ content }) {
  return (
    <Card className="my-1 shadow-lg rounded-none">
      <CardContent className="align-middle">{content}</CardContent>
    </Card>
  );
}

function TodoList() {
  const [todoList, setTodoList] = useState(["hello", "sdasa"]);
	const inputRef = useRef('');

	const handleInput = () => {
		let newTask = inputRef.current.value;
		if (!newTask) return;
		setTodoList([...todoList, newTask]);
		inputRef.current.value = '';
		inputRef.current.focus();
	}
  return (
    <>
      <div className="flex">
        <TextField
          className="mr-3 w-full"
          id="task-input"
          label="New tasks"
          color="primary"
          size="medium"
					inputRef={inputRef}
					onKeyUp={e => {
						if(e.key === 'Enter') handleInput();
					}}
        />
        <Button className="bg-fuchsia-700 text-white inline" color="primary" onClick={handleInput}>
          Add
        </Button>
      </div>
      <div className="overflow-scroll max-h-full">
        {todoList.map((item) => (
          <TodoListItem content={item} />
        ))}
      </div>
    </>
  );
}

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "rgb(162 28 175)",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <div className="max-h-[80%] overflow-hidden w-4/5 rounded-md p-8 bg-white shadow-2xl flex-col">
      <ThemeProvider theme={theme}>
        <TodoList />
      </ThemeProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
