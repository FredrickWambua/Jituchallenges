"use strict";
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["incomplete"] = 0] = "incomplete";
    ToDoStatus[ToDoStatus["completed"] = 1] = "completed";
})(ToDoStatus || (ToDoStatus = {}));
class ToDo {
    constructor(id, title, description, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
class ToDoInput {
    constructor() {
        this.formElem = document.querySelector('form');
        this.titleElem = document.getElementById('title');
        this.descriptionElem = document.getElementById('description');
        this.getInputData();
    }
    getInputData() {
        this.formElem.addEventListener('submit', this.submitHandler.bind(this));
    }
    submitHandler(e) {
        e.preventDefault();
        const title = this.titleElem.value;
        const description = this.descriptionElem.value;
        console.log(title);
        console.log(description);
    }
}
const ToDoInstance = new ToDoInput();
//# sourceMappingURL=app.js.map