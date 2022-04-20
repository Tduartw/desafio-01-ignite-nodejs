const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

// const users = [];

// function checksExistsUserAccount(request, response, next) {
//   const { username } = request.headers;

//   const user = users.find((user) => user.username === username);

//   if (!user) {
//     return response.status(400).json({ error: "User does not exists" });
//   }

//   request.user = user;
//   next();
// }

// app.post("/users", (request, response) => {
//   const { name, username } = request.body;

//   const usernameExists = users.some((user) => user.username === username);

//   if (usernameExists) {
//     return response.status(400).json({ error: "User already exists" });
//   }

//   const user = {
//     id: uuidv4(),
//     name,
//     username,
//     todos: [],
//   };

//   users.push(user);

//   return response.status(201).json(user);
// });

// app.get("/todos", checksExistsUserAccount, (request, response) => {
//   const { user } = request;
//   const userTodoList = user.todos.map((todo) => todo);

//   return response.status(200).json(userTodoList);
// });

// app.post("/todos", checksExistsUserAccount, (request, response) => {
//   const { title, deadline } = request.body;
//   const { user } = request;

//   const todo = {
//     id: uuidv4(),
//     title,
//     done: false,
//     deadline: new Date(deadline),
//     created_at: new Date(),
//   };

//   user.todos.push(todo);

//   return response.status(201).json(todo);
// });

app.put("/todos/:id", (request, response) => {
  const {teste} = request.headers
  console.log(teste);
  return response.send(teste)
})


app.patch("/todos/:id/done", (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", (request, response) => {
  // Complete aqui
});

module.exports = app;
