

class ToDo {
    constructor(
        public id: number,
        public title: string | number,
        public description: string , 
        public status: ToDoStatus,
        ){}
}

enum ToDoStatus{
    active,
    incomplete,
    completed,
}
type Listener = (todos:ToDo[])=> void;
class ToDoPosting {
    private static instance : ToDoPosting;
    private todos: ToDo[] = [];
    private listeners: Listener[] = [];
    private constructor(){

    }
    static getInstance(){
            if(this.instance){
                return this.instance;
            }else {
                this.instance  = new ToDoPosting()
                return this.instance;
            }
        }
    addListener(listener: Listener){
        this.listeners.push(listener)
    }
    addToDo(title:string|number, description: string){
        const todo = new ToDo(Math.random(), title, description, ToDoStatus.active);
        this.todos.push(todo);
        for (const listener of this.listeners){
            listener(this.todos)
        }
    }
    }

const todoPosting:any = ToDoPosting.getInstance()

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
                const [title, description] = userData
                this.clearInput();
                todoPosting.addToDo(title, description);

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
class ToDoList {
    assignedTodos: ToDo[] =[]
    constructor(private type: string){
        todoPosting.addListener((todos:ToDo[])=>{
            const relevantTodos = todos.filter(todo=>{
                if (this.type === 'active'){
                    return todo.status ===ToDoStatus.active;
                }
                return todo.status === ToDoStatus.completed;
            });
            this.assignedTodos = relevantTodos;
            this.renderToDos();

        })
    }
    private renderToDos(){
        const listElem = document.getElementById(`${this.type}-todo-list`) as HTMLUListElement;
        listElem.innerHTML = '';
        for (const todo of this.assignedTodos){
            const listItem:any = document.createElement('li');
            listItem.innerHTML = todo.title;
            listElem.appendChild(listItem);
        }
    }
}
const activeTodoList = new ToDoList('active');
const completedTodoList = new ToDoList('completed');
const ToDoInstance = new ToDoInput() ;
