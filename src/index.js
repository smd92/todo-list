import pageFrame from "/src/pageFrame.js";
import ToDo from "/src/createToDo.js";
import Project from "/src/createProject.js";

pageFrame.renderPageFrame();

let todoData = {
    title: "Test Title",
    description: "this is a test",
    dueDate: "01-01-1970",
    priority: "high",
    notes: "this is a test note"
}

let testToDo = new ToDo(todoData);
console.log(testToDo);

let projectData = {
    title: "Test Project",
    description: "this is a project",
    dueDate: "01-01-1970",
    priority: "medium",
    notes: "test project note"
}

let testProject = new Project(projectData);
console.log(testProject);