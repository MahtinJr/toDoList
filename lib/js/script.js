var todoList = {
  todos: [],

  // adds item to todo list
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  // changes item from todo list
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  // deletes an item from todo list
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  // toggles item whether completed or not completed
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  //toggles all items completed or not completed
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  },
};

// user interaction
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ''; 
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// output todo(s) in runtime
var view = {
  displayTodos: function() {
    var todosUl = document.getElementById('displayTodos');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var textCompleted = '';
      
      // check if todo is completed or not
      if (todo.completed === true) {
        textCompleted = '(X) ' + todo.todoText;
      } else {
        textCompleted = '( ) ' + todo.todoText;
      }
      
      // appends index position 
      todoLi.id = i;
      // toggle completion of todo
      todoLi.textContent = textCompleted;
      // appends btn to each todo
      todoLi.appendChild(this.deleteBtn());
      // appends li and list each todo 
      todosUl.appendChild(todoLi);
    }
  },
  // function which adds delete btn 
  deleteBtn: function() {
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  eventSetup: function() {
    // grabs the empty ul ID
    var todosUl = document.getElementById('displayTodos');
    // triggers delete event
    todosUl.addEventListener('click', function(event) {
      // store clicked li by id
      var deleteClicked = event.target

      // check if delete was clicked
      if (deleteClicked.className === 'deleteBtn') {
        // run delete handler after obtaining position
        handlers.deleteTodo(parseInt(deleteClicked.parentNode.id));
      }
    });
  }
};

view.eventSetup();

// shortcut to debugger
function runDebugger(funcToDebug) {
  debugger;
  funcToDebug();
};


