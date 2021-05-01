import pageFrame from "/src/pageFrame.js";
import { Todo, TodoList } from "/src/Todos.js";
import Project from "/src/Projects.js";
import { todoListsSidebar, projectsSidebar, sideBarEvents } from "/src/sidebar.js";
import { subContainerHeader, subContainerList, subContainerEvents } from "/src/subContainer.js";
import modalDOM from "/src/modal.js";
import { todoListManager } from "./Todos";

const onLoadDOM = (function () {
    pageFrame.renderPageFrame();
    todoListsSidebar.renderSideBar();
    projectsSidebar.renderProjectsSidebar();
    subContainerHeader.renderSubContainerHeader();
    subContainerList.renderSubContainerList();
    subContainerList.renderNewTodoButton();
    sideBarEvents.renderListTitleEvent();
    sideBarEvents.manageNewTodoButtonEvent();
    subContainerEvents.newTodoButtonEvents();
    modalDOM.renderModalFrame();
})();

const onLoadFunctionality = (function () {
    let defaultList = new TodoList("defaultList");
    todoListManager.addTodoList(defaultList);
    todoListManager.printLists();
})();

/* TEST DATA

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

*/