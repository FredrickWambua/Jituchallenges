enum ToDoStatus{
    incomplete,
    completed,
}

class ToDo {
    constructor(
        public id: number,
        public title: string, 
        public description: string , 
        public status: ToDoStatus
        ){}
}

class ToDoInput {
    formElem: HTMLElement
    titleElem: HTMLInputElement
    descriptionElem: HTMLInputElement

    constructor(){
        this.formElem =document.querySelector('form') as HTMLFormElement;
        this.titleElem = document.getElementById('title') as HTMLInputElement;
        this.descriptionElem = document.getElementById('description') as HTMLInputElement;

        this.getInputData();
    }
    private getInputData(){
        this.formElem.addEventListener('submit', this.submitHandler.bind(this));
    }
    private submitHandler(e:Event){
        e.preventDefault();
        const title = this.titleElem.value;
        const description = this.descriptionElem.value;
        console.log(title);
        console.log(description);
    }
}

const ToDoInstance = new ToDoInput() ;