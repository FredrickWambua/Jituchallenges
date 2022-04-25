

const toDoList = document.getElementById('todo-list')
class ToDo {
    constructor(
        public id: number,
        public title: string | number,
        public description: string , 
        public status: ToDoStatus,
        public message: string,
        ){}
}

enum ToDoStatus{
    incomplete,
    completed,
}

interface ValidateData {
    value: string | number;
    required: true;

}

function validate(validateInput: ValidateData): boolean{
    let isValid = true;

    if (validateInput.required){
        isValid = isValid && validateInput.value.toString().trim().length !==0;
    }
    return isValid;
}

class ToDoInput {
    formElem: HTMLElement
    titleElem: HTMLInputElement
    descriptionElem: HTMLInputElement
    message: HTMLElement

    constructor(){
        this.formElem =document.querySelector('form') as HTMLFormElement;
        this.titleElem = document.getElementById('title') as HTMLInputElement;
        this.descriptionElem = document.getElementById('description') as HTMLInputElement;
        this.message = document.getElementById('message') as HTMLElement;

        this.getInputData();
        this.acceptData();
    }
    private getInputData(){
        this.formElem.addEventListener('submit', (e) =>{
            e.preventDefault();
            const userData = this.acceptData();

            if (userData){
                console.log(userData)
                this.clearInput();
            }

            
        });
    }
    private clearInput(){
        this.titleElem.value = '';
        this.descriptionElem.value = '';
    }
    private acceptData(): [string | number, string] | void{
        const title = this.titleElem.value;
        const description = this.descriptionElem.value;

        const titleValidate: ValidateData = {
            value: title, 
            required: true,
        };

        const descriptionValidate: ValidateData = {
            value: description,
            required: true,
        }
        if (!validate(titleValidate) || !validate(descriptionValidate)){
            this.message.innerHTML = 'Fields cannot be empty!'
            
        }else{
            this.message.innerHTML = ''

        }
        return [title, description];
    }

}

const ToDoInstance = new ToDoInput() ;