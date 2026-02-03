let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");




// Challenge: Try and using your addTaskButton with a "keydown" eventlistener
// and create a way to use the enter key to submit a new list item.





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
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
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
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}


//saves it to the list 


saveTaskButton.addEventListener("click", () => {

  const todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  const id = saveInd.value;
  todoArray[id] = text.value.trim();
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});