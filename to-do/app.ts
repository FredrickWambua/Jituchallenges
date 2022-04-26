

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
type Listener<T> = (todos:T[])=> void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listener: Listener<T>){
        this.listeners.push(listener)
    }

}

class ToDoPosting extends State<ToDo>{
    private static instance : ToDoPosting;
    private todos: ToDo[] = [];
    private constructor(){ 
        super()
    }

    static getInstance(){
            if(this.instance){
                return this.instance;
            }else {
                this.instance  = new ToDoPosting()
                return this.instance;
            }
        }

    addToDo(title:string|number, description: string){
        const todo = new ToDo(Math.random(), title, description, ToDoStatus.active);
        this.todos.push(todo);
        this.updateListeners()
    }
    moveTodo(todoId: string, newStatus: ToDoStatus){
        const todo:any = this.todos.find((tdo) => tdo.id === todo.id);
        if(todo){
            todo.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners(){
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

interface Draggable {
    dragStartHandler(event:DragEvent): void;
    dragEndHandler(event:DragEvent):void;

}

interface DragTarget {
    dragOverHandler(event:DragEvent): void;
    dragLeaveHandler(event:DragEvent): void;
    dropHandler(event:DragEvent): void;

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
class ToDoList implements DragTarget {
    assignedTodos: ToDo[] =[];
    ulElem: HTMLUListElement;
    constructor(private type: string){
        this.ulElem = document.getElementById(`${this.type}-todo-list`) as HTMLUListElement;
        todoPosting.addListener((todos:ToDo[])=>{
            const relevantTodos = todos.filter(todo=>{
                if (this.type === 'active'){
                    return todo.status ===ToDoStatus.active;
                }
                return todo.status === ToDoStatus.completed;
            });
            this.assignedTodos = relevantTodos;
            this.renderToDos();
        });
        this.configure()
    }
    configure(){
        this.ulElem.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.ulElem.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.ulElem.addEventListener('drop', this.dropHandler.bind(this));
    }
    dragOverHandler(event: DragEvent): void {
        event.preventDefault()
        this.ulElem.classList.add('droppable');
    }
    dragLeaveHandler(event: DragEvent): void {
        this.ulElem.classList.remove('droppable');
    }

    dropHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0]==='text/plain'){
            let todoId = event.dataTransfer.getData('text/plain');
            todoPosting.moveTodo(todoId, )
        }
    }

    private renderToDos(){
        this.ulElem.innerHTML = '';
        for (const todo of this.assignedTodos){
            new TodoItem(todo, this.ulElem);
        }
    }
}

class TodoItem implements Draggable{
    liElement: HTMLLIElement;
    constructor(private todo:ToDo, private element: HTMLUListElement){
        this.liElement = document.createElement('li');
        this.liElement.setAttribute('draggable', 'true')
        this.renderContent();
        this.configure()
    }
    private configure(){
        this.liElement.addEventListener('dragstart', this.dragStartHandler);
        this.liElement.addEventListener('dragend', this.dragEndHandler);
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.todo.id.toString());
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {

    }
    renderContent(){
        const liData = `<div class='card-elements'><h3 class ='title'>${this.todo.title}</h3>
        <div class= 'description'>${this.todo.description}</div></div>`;
        this.liElement.innerHTML = liData;
        this.element.appendChild(this.liElement);
    }
}
const activeTodoList = new ToDoList('active');
const completedTodoList = new ToDoList('completed');
const ToDoInstance = new ToDoInput() ;
