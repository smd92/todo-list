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

    let fixedLists = {
        defaultList: [],
        todayList: [],
        upcomingList: []
    }

    function addNewTodo(formData) {
        let todoData = {
            title: formData[0],
            description: formData[1],
            dueDate: formData[2],
            priority: formData[3]
        }
        let todo = new ToDo(todoData);
        pushTodoInList(fixedLists.defaultList, todo);
        console.log(fixedLists.defaultList);
    }
    
    function setNewTodoList(newList) {
        todoLists.newList = [];
    }
    
    function pushTodoInList(list, todo) {
        list.push(todo);
    }

    return {
        addNewTodo,
        setNewTodoList,
        pushTodoInList
    }
})();

export { ToDo, todoManager };