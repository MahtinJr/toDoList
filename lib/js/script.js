// date of today
const date = document.getElementById('date');
const today = new Date();
const options = {
  weekday: 'long',
  month: 'short', 
  day: 'numeric'
}

date.innerHTML = today.toLocaleDateString('en-US', options);

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
    
    // obtain number of completed task(s)   
    this.todos.forEach(function(task) {
      if (task.completed === true) {
        completedTodos++;
      }
    });  
    
    // are both variables equal? if yes, make false, else true
    this.todos.forEach(function(task) {
      if (completedTodos === totalTodos) {
        task.completed = false;
      } else {
        task.completed = true;    
      }  
    }); 
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
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);   
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
    // get displays ul
    var todosUl = document.getElementById('displayTodos');
    
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position) {
      // create an li for each todo
      var todoLi = document.createElement('li');
      var textCompleted = ''; 
      var checkmark = '<i class="fas fa-check"></i>';
      var unchecked = '<i class="far fa-circle"></i>'; 
       var trash = '<i class="fas fa-trash-alt"></i>';
      
      // check if todo is completed or not
      if (todo.completed === true) {
        textCompleted = todo.todoText;
        // shows checkmark for completion
        todosUl.insertAdjacentHTML('beforeend', checkmark);        
      } else {
        textCompleted = todo.todoText;
        // shows circle indicator for incomplete task
        todosUl.insertAdjacentHTML('beforeend', unchecked);
      }
     
      
      // appends index position 
      todoLi.id = position;      
      // toggle completion of todo
      todoLi.textContent = textCompleted;
      // adds font awesome trash icon
      // todosUl.insertAdjacentHTML('beforeend', trash);
      // appends btn to each todo
      todoLi.appendChild(this.deleteBtn());  
      // prepends the toggle btn
      todoLi.prepend(this.toggleBtn());
      // appends li and list each todo 
      todosUl.appendChild(todoLi);
    }, this);  
  },
  // function which adds delete btn 
  deleteBtn: function() {
    var deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  // function which adds toggle btn 
  toggleBtn: function() {
    var toggleBtn = document.createElement('input');
    toggleBtn.id = "checkbox";
    toggleBtn.type = "checkbox";
    toggleBtn.className = 'toggleBtn';    
    return toggleBtn;
  },
  eventSetup: function() {
    // grabs the empty ul ID
    var todosUl = document.getElementById('displayTodos');
    // triggers delete event
    todosUl.addEventListener('click', function(event) {
      // store clicked li by id
      var btnClicked = event.target;

      // check if delete was clicked
      if (btnClicked.className === 'deleteBtn') {
        // run delete handler after obtaining position
        handlers.deleteTodo(parseInt(btnClicked.parentNode.id));
      }  else if (btnClicked.className === 'toggleBtn') {
        // run toggle handler after obtaining position
        handlers.toggleCompleted(parseInt(btnClicked.parentNode.id));        
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