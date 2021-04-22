import pageFrame from "/src/pageFrame.js";
import { ToDo } from "/src/ToDos.js";
import Project from "/src/Projects.js";
import { todoLists, projectsSidebar, sideBarEvents } from "/src/sidebar.js";
import { subContainerHeader, subContainerList, subContainerEvents } from "/src/subContainer.js";
import modalDOM from "/src/modal.js";

const onLoad = (function () {
    pageFrame.renderPageFrame();
    todoLists.renderTodoLists();
    projectsSidebar.renderProjectsSidebar();
    subContainerHeader.renderSubContainerHeader();
    subContainerList.renderSubContainerList();
    subContainerList.renderNewTodo();
    sideBarEvents.renderListTitleEvent();
    subContainerEvents.newTodoButtonEvents();
    modalDOM.renderModalFrame();
})();

let todoData = {
    title: "Test Title",
    description: "this is a test",
    dueDate: "01-01-1970",
    priority: "high",
}

let testToDo = new ToDo(todoData);
console.log(testToDo);

let projectData = {
    title: "Test Project",
    description: "this is a project",
    dueDate: "01-01-1970",
    priority: "medium",
}

let testProject = new Project(projectData);
console.log(testProject);