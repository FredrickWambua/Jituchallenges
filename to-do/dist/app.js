"use strict";
class ToDo {
    constructor(id, title, description, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["active"] = 0] = "active";
    ToDoStatus[ToDoStatus["incomplete"] = 1] = "incomplete";
    ToDoStatus[ToDoStatus["completed"] = 2] = "completed";
})(ToDoStatus || (ToDoStatus = {}));
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
}
class ToDoPosting extends State {
    constructor() {
        super();
        this.todos = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ToDoPosting();
            return this.instance;
        }
    }
    addToDo(title, description) {
        const todo = new ToDo(Math.random(), title, description, ToDoStatus.active);
        this.todos.push(todo);
        this.updateListeners();
    }
    moveTodo(todoId, newStatus) {
        const todo = this.todos.find((tdo) => tdo.id === todo.id);
        if (todo) {
            todo.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listener of this.listeners) {
            listener(this.todos);
        }
    }
}
const todoPosting = ToDoPosting.getInstance();
function validate(validateInput) {
    let isValid = true;
    if (validateInput.required) {
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }
    return isValid;
}
class ToDoInput {
    constructor() {
        this.formElem = document.querySelector('form');
        this.titleElem = document.getElementById('title');
        this.descriptionElem = document.getElementById('description');
        this.message = document.getElementById('message');
        this.getInputData();
        this.acceptData();
    }
    getInputData() {
        this.formElem.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = this.acceptData();
            if (userData) {
                const [title, description] = userData;
                this.clearInput();
                todoPosting.addToDo(title, description);
            }
        });
    }
    clearInput() {
        this.titleElem.value = '';
        this.descriptionElem.value = '';
    }
    acceptData() {
        const title = this.titleElem.value;
        const description = this.descriptionElem.value;
        const titleValidate = {
            value: title,
            required: true,
        };
        const descriptionValidate = {
            value: description,
            required: true,
        };
        if (!validate(titleValidate) || !validate(descriptionValidate)) {
            this.message.innerHTML = 'Fields cannot be empty!';
        }
        else {
            this.message.innerHTML = '';
        }
        return [title, description];
    }
}
class ToDoList {
    constructor(type) {
        this.type = type;
        this.assignedTodos = [];
        this.ulElem = document.getElementById(`${this.type}-todo-list`);
        todoPosting.addListener((todos) => {
            const relevantTodos = todos.filter(todo => {
                if (this.type === 'active') {
                    return todo.status === ToDoStatus.active;
                }
                return todo.status === ToDoStatus.completed;
            });
            this.assignedTodos = relevantTodos;
            this.renderToDos();
        });
        this.configure();
    }
    configure() {
        this.ulElem.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.ulElem.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.ulElem.addEventListener('drop', this.dropHandler.bind(this));
    }
    dragOverHandler(event) {
        event.preventDefault();
        this.ulElem.classList.add('droppable');
    }
    dragLeaveHandler(event) {
        this.ulElem.classList.remove('droppable');
    }
    dropHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            let todoId = event.dataTransfer.getData('text/plain');
            todoPosting.moveTodo(todoId);
        }
    }
    renderToDos() {
        this.ulElem.innerHTML = '';
        for (const todo of this.assignedTodos) {
            new TodoItem(todo, this.ulElem);
        }
    }
}
class TodoItem {
    constructor(todo, element) {
        this.todo = todo;
        this.element = element;
        this.liElement = document.createElement('li');
        this.liElement.setAttribute('draggable', 'true');
        this.renderContent();
        this.configure();
    }
    configure() {
        this.liElement.addEventListener('dragstart', this.dragStartHandler);
        this.liElement.addEventListener('dragend', this.dragEndHandler);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.todo.id.toString());
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(event) {
    }
    renderContent() {
        const liData = `<div class='card-elements'><h3 class ='title'>${this.todo.title}</h3>
        <div class= 'description'>${this.todo.description}</div></div>`;
        this.liElement.innerHTML = liData;
        this.element.appendChild(this.liElement);
    }
}
const activeTodoList = new ToDoList('active');
const completedTodoList = new ToDoList('completed');
const ToDoInstance = new ToDoInput();
//# sourceMappingURL=app.js.map