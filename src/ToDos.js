//create todo items
class ToDo {
    constructor(todoData) {
        this.title = todoData.title;
        this.description = todoData.description;
        this.dueDate = todoData.dueDate;
        this.priority = todoData.priority;
        this.index;
    }
}

const todoManager = (function () {
    //store all todo items
    let allTodos = [];
    //contains the pre-set lists
    let fixedLists = {
        defaultList: [],
        todayList: [],
        upcomingList: []
    }

    //take form input and use it to create new todo item
    function addNewTodo(formData, list) {
        let todoData = {
            title: formData[0],
            description: formData[1],
            dueDate: formData[2],
            priority: formData[3]
        }
        let todo = new ToDo(todoData);
        //store the todo item
        allTodos.push(todo);
        pushTodoInList(list, todo);
        //enumerate the todo item
        setTodoIndexes();
        console.log(allTodos);
    }
    
    function setNewTodoList(newList) {
        todoLists.newList = [];
    }

    //push todo in respective list
    function pushTodoInList(list, todo) {
        switch (list) {
            case "defaultList":
                fixedLists.defaultList.push(todo);
                break;
            case "todayList":
                fixedLists.todayList.push(todo);
                break;
            case "upcomingList":
                fixedLists.upcomingList.push(todo);
        }
    }

    function setTodoIndexes() {
        for (let i = 0; i < allTodos.length; i++) {
            allTodos[i].index = i;
        }
    }

    return {
        addNewTodo,
        setNewTodoList
    }
})();

export { ToDo, todoManager };