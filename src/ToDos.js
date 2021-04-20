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

    return {

    }
})();

const todoListsManager = (function () {

    let todoLists = {
        defaultList: [],
        todayList: [],
        upcomingList: []
    }

    function setNewTodoList(newList) {
        todoLists.newList = [];
    }

    function pushTodoInList(list, todo) {
        todoLists.list.push(todo);
    }

    return {
        setNewTodoList,
        pushTodoInList
    }
})();

export { ToDo, todoManager, todoListsManager };