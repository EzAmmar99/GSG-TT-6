const titleInput = document.querySelector(".title-input");
const contentInput = document.querySelector(".content-input");

const disabledFooter = document.querySelector("footer.disabled");
const activeFooter = document.querySelector("footer.active");

const todos = document.querySelector(".todos");

const xhttp = new XMLHttpRequest();

xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts"); // https://jsonplaceholder.typicode.com/todos
xhttp.send();

xhttp.onload = function () {
  JSON.parse(this.responseText).map((ele) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.innerHTML = `
         <h2 class="todo-title">${ele.title}</h2>
         <p class="todo-content">${ele.body}</p>
`;
    todos.appendChild(todo);
  });
};

const onAddClick = () => {
  disabledFooter.style = "display: none";
  activeFooter.style = "display: block";
  todos.style = "padding-bottom: 0px;";
  todos.scrollTo(0, todos.scrollHeight);
};

const onCansleClick = () => {
  disabledFooter.style = "display: flex";
  activeFooter.style = "display: none";
  todos.style = "padding-bottom: 100px;";
  todos.scrollTo(0, 0);
};

const onSaveClick = () => {
  const title = titleInput.value;
  const desc = contentInput.value;
  titleInput.style = "outline: 1px solid transparent;";
  contentInput.style = "outline: 1px solid transparent;";

  
  if (!title) {
    titleInput.style = "outline: 1px solid #f00;";
  }

  if (!desc) {
    contentInput.style = "outline: 1px solid #f00;";
  }

  if (title && desc) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: title,
        body: desc,
      }),
    }).then((res) => {
      console.log(res);
      const todo = document.createElement("div");
      todo.classList.add("todo");
      todo.innerHTML = `
         <h2 class="todo-title">${title}</h2>
         <p class="todo-content">${desc}</p>
`;
      todos.appendChild(todo);
      todos.scrollTo(0, todos.scrollHeight);
      titleInput.value = "";
      contentInput.value = "";
      todos.style = "padding-bottom: 100px;";
      disabledFooter.style = "display: flex";
      activeFooter.style = "display: none";
    });
  }
};
