const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "User does not exists" });
  }

  request.user = user;
  next();
}

function checksTodoExists(request, response, next) {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return response.status(404).json({ error: "Todo does not exist" });
  }

  request.todoIndex = todoIndex;
  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    return response.status(400).json({ error: "User already exists" });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/users", (request, response) => {
  return response.json(users);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const userTodoList = user.todos.map((todo) => todo);

  return response.status(200).json(userTodoList);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put(
  "/todos/:id",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { title, deadline } = request.body;
    const { user, todoIndex } = request;

    const newTodo = {
      ...user.todos[todoIndex],
      title,
      deadline: new Date(deadline),
    };

    user.todos[todoIndex] = newTodo;

    return response.status(200).json(newTodo);
  }
);

app.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { user, todoIndex } = request;

    user.todos[todoIndex].done = !user.todos[todoIndex].done;

    return response.status(200).json(user.todos[todoIndex]);
  }
);

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { user, todoIndex } = request;

    user.todos.splice(user.todos[todoIndex], 1); 

    return response.status(204).json(user.todos);
  }
);



module.exports = app;
