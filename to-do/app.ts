enum ToDoStatus{
    incomplete,
    completed,
}

class ToDo {
    constructor(
        public id: number,
        public title: string, 
        public description: string , 
        public status: ToDoStatus,
        public message: string
        ){}
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
    }
    private getInputData(){
        this.formElem.addEventListener('submit', (e) =>{
            e.preventDefault();
            console.log('button clicked')
            const title = this.titleElem.value;
            const description = this.descriptionElem.value;
            console.log(title, description)

            
        });
        this.formValidation()
    }
    private formValidation = ()=>{
        if (this.titleElem.value === '' && this.descriptionElem.value === ''){
            this.message.innerHTML = 'All input fields must not be blank!';
        } else {
            this.message.innerHTML = '';
        }
    };
}

const ToDoInstance = new ToDoInput() ;