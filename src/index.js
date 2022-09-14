import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  cardClasses,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Add,
  CheckBoxRounded,
  Delete,
  Edit,
  RadioButtonUnchecked,
  RemoveCircleOutline,
  TaskAlt,
} from "@mui/icons-material";

function TodoListItem({ content, isFinished, index, deleteItem, setFinished }) {
  const [checked, setChecked] = useState(isFinished);
  const textRef = useRef();

  const handleCheck = (e) => {
    setChecked(true);
    setFinished(index);
  };

  const onBlur = () => {
  };

  const removeClick = (e) => {
    e.stopPropagation();
    deleteItem(index);
  };

  return (
    <Card
      variant="outlined"
      className="group my-2 place-content-center text-md hover:bg-fuchsia-100"
    >
      <CardContent className="align-middle p-1 flex flex-row items-center">
        <Checkbox
          className="hover:text-[rgb(162,28,175)]"
          onClick={handleCheck}
          checked={checked}
          icon={<RadioButtonUnchecked fontSize="small" />}
          checkedIcon={<TaskAlt fontSize="small" />}
        />
        <span
          contentEditable
          onBlur={onBlur}
          ref={textRef}
          className={
            checked
              ? "align-middle line-through text-slate-500 text italic"
              : "align-middle"
          }
        >
          {content}
        </span>
        <Delete
          onClick={removeClick}
          fontSize="small"
          color="primary"
          className="ml-auto mr-2 opacity-0 group-hover:opacity-100 hover:scale-125 hover:cursor-pointer transition-all"
        />
      </CardContent>
    </Card>
  );
}

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef("");

  const handleInput = () => {
    if (!inputRef.current.value) return;
    let newTask = {
      content: inputRef.current.value,
      isFinished: false,
    };
    setTodoList([...todoList, newTask]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const setFinished = (index) => {
    todoList[index].isFinished = true;
  };

  const deleteItem = (index) => {
    let newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };
  return (
    <>
      <div className="flex">
        <TextField
          className="mr-3 w-full"
          id="task-input"
          label="New tasks"
          color="primary"
          size="small"
          inputRef={inputRef}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleInput();
          }}
        />
        <Button
          className="bg-fuchsia-700 text-white"
          color="primary"
          onClick={handleInput}
        >
          <Add className="m-auto" />
        </Button>
      </div>
      <div className="todo-list max-h-[85%] overflow-y-auto my-3">
        {todoList.map((item, index) => (
          <TodoListItem
            key={item.content}
            setFinished={setFinished}
            index={index}
            deleteItem={deleteItem}
            content={item.content}
            isFinished={item.isFinished}
          />
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
    <div className="h-3/5 overflow-hidden w-3/5 rounded-md p-8 bg-white shadow-2xl flex-col">
      <ThemeProvider theme={theme}>
        <TodoList />
      </ThemeProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
