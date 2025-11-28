import {
  Button,
  ButtonGroup,
  Card,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Homepage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [todos, setTodos] = useState([]);
  const API_URl = "http://localhost:3000";
  useEffect(() => {
    handleFetchTodo();
  }, [todos]);

  async function handleFetchTodo() {
    const fetchedItems = await axios.get(`${API_URl}/fetch`);
    const todos = fetchedItems.data.foundTodo;
    setTodos(todos);
  }

  async function handleAddTodo(params) {
    setSuccess("");
    setError("");
    if (!title || !content) {
      setError("All fileds are recquired !!!");
      return;
    } else {
      try {
        const response = await axios.post(`${API_URl}/create`, {
          title,
          content,
        });
        if (response.status === 201) {
          setSuccess("The todo was updated succesfully");
        }
      } catch (e) {
        setError("Mhhhh something went wrong try again");
      }
    }

    handleFetchTodo();
  }

  async function handleComplete(id) {
    if (id === null) {
      alert("please click again");
      return;
    }
    const updated = await axios.patch(`${API_URl}/markcomplete/${id}`);
    await handleFetchTodo();
  }

  async function handleDelete(id) {
    console.log(id);
    await axios.patch(`${API_URl}/delete/${id}`);
    handleFetchTodo();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        You can List the elements you want below
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Card
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          width: "40rem",
          height: "15rem",
          padding: "5px",
        }}
      >
        <Typography textAlign="center" component="h1" variant="h4">
          Add a Todo
        </Typography>
        <TextField
          label="Todo title"
          sx={{ fontSize: "10px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Todo content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></TextField>

        <ButtonGroup fullWidth sx={{ display: "flex" }}>
          <Button variant="contained" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </ButtonGroup>
      </Card>

      {/*  Displaying Todos*/}
      {todos &&
        todos.map((todo) => {
          return (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "3px",
                width: "25rem",
                minHeight: "10rem",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={todo.id}
            >
              <Typography>{todo.title}</Typography>
              <Typography>{todo.excerpt}</Typography>
              <ButtonGroup fullWidth sx={{ marginTop: "4px" }}>
                <Button
                  onClick={() => {
                    handleComplete(todo.id);
                  }}
                >
                  {todo.isComplete ? "Completed" : " Mark As Complete"}
                </Button>
                <Button
                  sx={{ bgcolor: "red", color: "white", padding: ".5rem" }}
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  Delete Todo
                </Button>
              </ButtonGroup>
            </Card>
          );
        })}
    </Box>
  );
}

export default Homepage;
