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
    view.displayTodos();
  },
};

// user interaction
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ''; 
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput = '';
  },
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput = '';
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

// output todo(s) in runtime
var view = {
  displayTodos: function() {
    var todosUL = document.getElementById('displayTodos');
    todosUL.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var textCompleted = '';

      if (todo.completed === true) {
        todoCompleted = '(X) ' + todo.todoText;
      } else {
        todoCompleted = '( ) ' + todo.todoText;
      }

      todoLi.textContent = todoCompleted;
      todosUL.appendChild(todoLi);
    }
  }
};

// shortcut to debugger
function runDebugger(funcToDebug) {
  debugger;
  funcToDebug();
};
