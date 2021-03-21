//create Projects
class Project {
    constructor(projectData) {
        this.title = projectData.title;
        this.description = projectData.description;
        this.dueDate = projectData.dueDate;
        this.priority = projectData.priority;
        this.notes = projectData.notes;
    }
}

export default Project;