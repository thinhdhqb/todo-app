import {
  Button,
  Card,
  CardContent,
  TextField,
  Checkbox,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Add,
  Delete,
  RadioButtonUnchecked,
  TaskAlt,
} from "@mui/icons-material";
import NoTaskPNG from './no-task.png';

function TodoListItem({ content, isFinished, index, deleteItem, setFinished, setContent }) {
  const [checked, setChecked] = useState(isFinished);
  const textRef = useRef();

  const handleCheck = (e) => {
    let check = !checked
    setChecked(check);
    setFinished(index, check);
  };

  const removeClick = (e) => {
    e.stopPropagation();
    deleteItem(index);
  };

  return (
    <Card
      size="small"
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
        <Tooltip title="Edit">
        <span
          suppressContentEditableWarning={true}
          spellCheck={false}
          contentEditable={checked ? false : true}
          onBlur={(e) => setContent(index, e.target.innerHTML)}
          ref={textRef}
          onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault(); e.target.blur()}}}
          className={
            checked
              ? "align-middle line-through text-slate-500 text italic px-2 py-1 cursor-default"
              : "align-middle max-w-full break-words px-2 py-1 hover:bg-fuchsia-200 rounded-sm focus-visible:outline-none focus-visible:bg-fuchsia-200"
          }
        >
          {content}
        </span>
        </Tooltip>
        <Tooltip title="Delete">
        <Delete
          onClick={removeClick}
          fontSize="small"
          color="primary"
          className="ml-auto mr-2 opacity-0 group-hover:opacity-100 hover:scale-125 hover:cursor-pointer transition-all"
        />
        </Tooltip>
        
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

  const setFinished = (index, isFinished) => {
    let newTodoList = [...todoList];
    newTodoList[index].isFinished = isFinished;
    setTodoList(newTodoList);
  };

  const setContent = (index, content) => {
    console.table(todoList);
    let newTodoList = [...todoList];
    newTodoList[index].content = content;
    setTodoList(newTodoList);
  }

  const deleteItem = (index) => {
    let newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  useEffect(() => {
    let localTodoList;
    if (localTodoList = localStorage.getItem('todoList')) setTodoList(JSON.parse(localTodoList));
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    console.table(todoList);
  }, [todoList]);
  return (
    <>
      <div className="flex">
        <TextField
          autoComplete="false"
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
          className="bg-[rgb(205,48,219)] text-white"
          color="primary"
          onClick={handleInput}
        >
          <Add className="m-auto" />
        </Button>
      </div>
      {todoList.length === 0 ? 
        <div className="flex justify-center items-center flex-col w-full h-full">
        <img className="h-2/5 w-auto translate-x-2" src={NoTaskPNG} /> 
        <p className="text-slate-600">Congrats ! You have no tasks left !</p>
        </div>
        : ''
      }
      <div className="todo-list max-h-[85%] overflow-y-auto my-3">
        {todoList.map((item, index) => (
          <TodoListItem
            key={item.content + index}
            setFinished={setFinished}
            setContent={setContent}
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
      main: "rgb(205,48,219)",
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
    <div className="h-3/5 overflow-hidden w-3/5 rounded-md p-8 bg-white shadow-2xl flex-col relative">
      <ThemeProvider theme={theme}>
        <TodoList />
      </ThemeProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
