const todoContainer = document.querySelector("#todo-container");
const addForm = document.querySelector(".add-todo");
const addInput = document.querySelector("#add-input");
const addInput2 = document.querySelector("#add-input2");
const addInput3 = document.querySelector("#add-input3");
const addInput4 = document.querySelector("#add-input4");
const resetBtn = document.querySelector(".reset-btn");

const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editInput = document.querySelector("#edit-input");
const editInput2 = document.querySelector("#edit-input2");
const editInput3 = document.querySelector("#edit-input3");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
render();
function render() {
  todoContainer.innerHTML = "";
  todos.forEach((item) => {
    todoContainer.innerHTML += `
    <div class="todo-item">
    <img src = "${item.surname}" class = "image" alt = "${item.name}">
    <span class = "square" >${item.email}</span>
    <span class = "square" >${item.number}</span>
    <span class = "square" >${item.name}</span>
    <div>
    <div>
    <button id="${item.id}" class="edit-btn">Edit</button>
    <button id="${item.id}" class="delete-btn">Delete</button>
  </div>
  </div>
    `;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!addInput.value.trim()) {
    return;
  }
  const todo = {
    id: Date.now(),
    email: addInput4.value,
    number: addInput2.value,
    name: addInput3.value,
    surname: addInput.value,
  };

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);

  addInput.value = "";
  addInput2.value = "";
  addInput3.value = "";
  addInput4.value = "";

  render();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("todos");
  todos = [];
  render();
});

// ! Delete
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((item) => item.id != e.target.id);
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
  }
});

//! Edit

let editId = null;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const todoToEdit = todos.find((item) => item.id == e.target.id);
    editInput.value = todoToEdit.title;
    editInput.focus();

    // editSubmit.id = e.target.id;
    editId = e.target.id;
  }
});

closeModalBtn.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (!editInput.value.trim()) {
    return;
  }

  todos = todos.map((item) => {
    if (item.id == editId) {
      item.email = editInput.value;
      item.number = editInput2.value;
      item.name = editInput3.value;
    }
    return item;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  render();
  editCancel.click();
});
