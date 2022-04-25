"use strict";
const toDoList = document.getElementById('todo-list');
class ToDo {
    constructor(id, title, description, status, message) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.message = message;
    }
}
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["incomplete"] = 0] = "incomplete";
    ToDoStatus[ToDoStatus["completed"] = 1] = "completed";
})(ToDoStatus || (ToDoStatus = {}));
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
                console.log(userData);
                this.clearInput();
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
const ToDoInstance = new ToDoInput();
//# sourceMappingURL=app.js.map