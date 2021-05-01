//create todo lists
class TodoList {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }
}

//create todo items
class Todo {
    constructor(todoData) {
        this.title = todoData.title;
        this.description = todoData.description;
        this.dueDate = todoData.dueDate;
        this.priority = todoData.priority;
        this.index;
    }
}

const todoListManager = (function () {
    let allTodoLists = [];

    function addTodoList(todoList) {
        allTodoLists.push(todoList);
    }

    function printLists() {
        console.log(allTodoLists);
    }

    return {
        addTodoList,
        printLists
    }
})();

export { Todo, TodoList, todoListManager };