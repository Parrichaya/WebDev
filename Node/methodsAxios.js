const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const deleteBtn = document.getElementById("delete-btn");

getBtn.addEventListener("click", getTodos);
postBtn.addEventListener("click", postTodo);
putBtn.addEventListener("click", putTodo);
deleteBtn.addEventListener("click", deleteTodo);

function getTodos() {
  // Write your code here
  axios
    .get("https://crudcrud.com/api/44c55783e7d747658df46f7d209a2387/todo")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function postTodo() {
  // Write your code here
  axios
    .post("https://crudcrud.com/api/44c55783e7d747658df46f7d209a2387/todo", {
        title: "Learn Axios",
        completed: false
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function putTodo() {
  // Write your code here
  axios
    .put("https://crudcrud.com/api/44c55783e7d747658df46f7d209a2387/todo/65df69f872109f03e8c7f5d7", {
        "title": "Learn Axios",
        "completed": true
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function deleteTodo() {
  // Write your code here
  axios
  .delete("https://crudcrud.com/api/44c55783e7d747658df46f7d209a2387/todo/65df69f872109f03e8c7f5d7")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
}
