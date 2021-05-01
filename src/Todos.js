//create todo lists
class TodoList {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }

    enumerateItems() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].index = i;
        }
    }

    setItemsListName() {
        this.items.forEach((item) => {
            item.listName = this.name;
        })
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
        this.listName;
    }
}

const todoListManager = (function () {
    let allTodoLists = [];

    function addTodoList(todoList) {
        allTodoLists.push(todoList);
    }

    function pushInCorrectList(listName, item) {
        allTodoLists.forEach((list) => {
            if (list.name === listName) {
                list.items.push(item);
            }
        })
    }

    //TEST
    function printLists() {
        console.log(allTodoLists);
    }

    return {
        addTodoList,
        pushInCorrectList,
        printLists
    }
})();

export { Todo, TodoList, todoListManager };