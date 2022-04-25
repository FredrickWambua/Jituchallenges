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
class ToDoPosting {
    constructor() {
        this.todos = [];
        this.listeners = [];
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
    addListener(listener) {
        this.listeners.push(listener);
    }
    addToDo(title, description) {
        const todo = new ToDo(Math.random(), title, description, ToDoStatus.active);
        this.todos.push(todo);
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
    }
    renderToDos() {
        const listElem = document.getElementById(`${this.type}-todo-list`);
        listElem.innerHTML = '';
        for (const todo of this.assignedTodos) {
            const listItem = document.createElement('li');
            listItem.innerHTML = todo.title;
            listElem.appendChild(listItem);
        }
    }
}
const activeTodoList = new ToDoList('active');
const completedTodoList = new ToDoList('completed');
const ToDoInstance = new ToDoInput();
//# sourceMappingURL=app.js.map