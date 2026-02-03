let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");




// Challenge: Try and using your addTaskButton with a "keydown" eventlistener
// and create a way to use the enter key to submit a new list item.

addTaskButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    addTaskButton.click(); 
  }



addTaskButton.addEventListener("click", (e) => {
  e.preventDefault(); 
  const todo = localStorage.getItem("todo");
 
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }


  if (text.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }


  todoArray.push(text.value.trim());
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});




window.addEventListener("load", displayTodo);

//to display list


function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
      htmlCode += `<div class='todo-item flex mb-4 items-center'>
        <p class='todo-text w-full text-white font-bold'>${list}</p>
        <button onclick='edit(${ind})' class='todo-btn todo-btn-edit flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
        <button onclick='deleteTodo(${ind})' class='todo-btn todo-btn-delete flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}


// Delete function

function deleteTodo(ind) {

  const todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}


//To edit  

function edit(ind) {
 
  saveInd.value = ind;
  const todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.classList.add("hidden");
  saveTaskButton.classList.remove("hidden");
}


//saves it to the list 


saveTaskButton.addEventListener("click", () => {

  const todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  const id = saveInd.value;
  todoArray[id] = text.value.trim();
  addTaskButton.classList.remove("hidden");
  saveTaskButton.classList.add("hidden");
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});