//create Projects
class Project {
    constructor(projectData) {
        this.title = projectData.title;
        this.description = projectData.description;
        this.dueDate = projectData.dueDate;
        this.priority = projectData.priority;
        this.notes = projectData.notes;
        this.todoList = [];
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    removeTodo(todo) {
        let index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
    }
}

export default Project;