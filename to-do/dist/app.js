"use strict";
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["incomplete"] = 0] = "incomplete";
    ToDoStatus[ToDoStatus["completed"] = 1] = "completed";
})(ToDoStatus || (ToDoStatus = {}));
class ToDo {
    constructor(id, title, description, status, message) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.message = message;
    }
}
class ToDoInput {
    constructor() {
        this.formValidation = () => {
            if (this.titleElem.value === '' && this.descriptionElem.value === '') {
                this.message.innerHTML = 'All input fields must not be blank!';
            }
            else {
                this.message.innerHTML = '';
            }
        };
        this.formElem = document.querySelector('form');
        this.titleElem = document.getElementById('title');
        this.descriptionElem = document.getElementById('description');
        this.message = document.getElementById('message');
        this.getInputData();
    }
    getInputData() {
        this.formElem.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('button clicked');
            const title = this.titleElem.value;
            const description = this.descriptionElem.value;
            console.log(title, description);
        });
        this.formValidation();
    }
}
const ToDoInstance = new ToDoInput();
//# sourceMappingURL=app.js.map