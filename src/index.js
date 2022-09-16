import {
  Button,
  Card,
  CardContent,
  TextField,
  Checkbox,
  Tooltip,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
import NoTaskPNG from "./no-task.png";

function TodoListItem({
  content,
  isFinished,
  id,
  deleteItem,
  setFinished,
  setContent,
}) {
  const [checked, setChecked] = useState(isFinished);
  const textRef = useRef();

  const handleCheck = (e) => {
    let check = !checked;
    setChecked(check);
    setFinished(id, check);
  };

  const removeClick = (e) => {
    e.stopPropagation();
    deleteItem(id);
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
            onBlur={(e) => setContent(id, e.target.innerHTML)}
            ref={textRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.target.blur();
              }
            }}
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

function ListInput({ addTask }) {
  const inputRef = useRef();

  const handleInput = () => {
    if (!inputRef.current.value) return;
    let newTask = {
      content: inputRef.current.value,
      isFinished: false,
    };
    addTask(newTask);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
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
  );
}

function AllList({ todoList, setFinished, setContent, deleteItem }) {
  return (
    <>
      <div
        className={
          todoList.length !== 0
            ? "hidden"
            : "flex justify-center items-center flex-col w-full h-full "
        }
      >
        <img className="h-2/5 w-auto translate-x-2" src={NoTaskPNG} />
        <p className="text-slate-600">Congrats ! You have no tasks left !</p>
      </div>

      <div className="todo-list max-h-[85%] overflow-y-auto my-3">
        {todoList.map((item, index) => (
          <TodoListItem
            key={item.id}
            setFinished={setFinished}
            setContent={setContent}
            id={item.id}
            deleteItem={deleteItem}
            content={item.content}
            isFinished={item.isFinished}
          />
        ))}
      </div>
    </>
  );
}

function ActiveList({ todoList, setContent, setFinished, deleteItem }) {
  const [activeList, setActiveList] = useState(todoList.filter(elem => !elem.isFinished));

  useEffect(() => {
    setActiveList()
  }, [todoList])
  return (
    <>
      <div
        className={
          todoList.length !== 0
            ? "hidden"
            : "flex justify-center items-center flex-col w-full h-full "
        }
      >
        <img className="h-2/5 w-auto translate-x-2" src={NoTaskPNG} />
        <p className="text-slate-600">Congrats ! You have no tasks left !</p>
      </div>

      <div className="todo-list max-h-[85%] overflow-y-auto my-3">
        {activeList.map((item) => (
          <TodoListItem
            key={item.id}
            id={item.id}
            setFinished={setFinished}
            setContent={setContent}
            deleteItem={deleteItem}
            content={item.content}
            isFinished={item.isFinished}
          />
        ))}
      </div>
    </>
  );
}

function CompletedList({ todoList }) {

}

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [keyProvider, setKeyProvider] = useState(0);
  const [value, setValue] = useState("1");

  const addTask = (newTask) => {
    newTask.id = keyProvider;
    setKeyProvider(keyProvider + 1);
    setTodoList([...todoList, newTask]);
  };

  const setFinished = (id, isFinished) => {
    let newTodoList = [...todoList];
    newTodoList.find(elem => elem.id, id).isFinished = isFinished;
    setTodoList(newTodoList);
  };

  const setContent = (id, content) => {
    console.table(todoList);
    let newTodoList = [...todoList];
    newTodoList.find(elem => elem.id, id).content = content;
    setTodoList(newTodoList);
  };

  const deleteItem = (id) => {
    let newTodoList = [...todoList];
    newTodoList.splice(newTodoList.findIndex(elem => elem.id, id), 1);
    setTodoList(newTodoList);
  };

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Get data from localStorage
    let localTodoList;
    if ((localTodoList = localStorage.getItem("todoList")))
      setTodoList(JSON.parse(localTodoList));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.table(todoList);
  }, [todoList]);
  return (
    <>
      <ListInput addTask={addTask} />
      <TabContext value={value}>
        <TabList onChange={handleTabChange}>
          <Tab label="All" value="1" />
          <Tab label="Active" value="2" />
          <Tab label="Completed" value="3" />
        </TabList>
        <TabPanel value="1" className="p-0 w-full h-full">
          <AllList setContent={setContent} setFinished={setFinished} deleteItem={deleteItem} todoList={todoList}/>
        </TabPanel>
        <TabPanel value="2" className="p-0 w-full h-full">
          <ActiveList todoList={todoList} setContent={setContent} setFinished={setFinished} deleteItem={deleteItem}/>
        </TabPanel>
        <TabPanel value="3" className="p-0 w-full h-full">3</TabPanel>
      </TabContext>
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
