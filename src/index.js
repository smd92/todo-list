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
    subContainerList.renderNewTodoButton();
    sideBarEvents.addSidebarEvents();
    subContainerEvents.newTodoButtonEvents();
    modalDOM.renderModalFrame();
})();

const onLoadFunctionality = (function () {
    let defaultList = new TodoList("defaultList");
    let todayList = new TodoList("todayList");
    let upcomingList = new TodoList("upcomingList");
    todoListManager.addTodoList(defaultList);
    todoListManager.addTodoList(todayList);
    todoListManager.addTodoList(upcomingList);
})();