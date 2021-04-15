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
        let index = todo.index;
        this.todoList.splice(index, 1);
    }

    indexTodos() {
        let count = 0;
        this.todoList.forEach((todo) => {
            todo.index = count;
            count++;
        })
    }
}

export default Project;