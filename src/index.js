import pageFrame from "/src/pageFrame.js";
import ToDo from "/src/ToDos.js";
import Project from "/src/Projects.js";
import { todoLists, projectsSidebar } from "/src/sidebar.js";
import { subContainerHeader, subContainerList } from "/src/subContainer.js";
import modalDOM from "/src/modal.js";

const sideBarEvents = (function () {
    //displays the lists title in the header of the subcontainer
    function renderListTitleEvent() {
        let listsNodes = document.getElementsByClassName("todoList");
        for (let i = 0; i < listsNodes.length; i++) {
            listsNodes[i].addEventListener(("click"), (e) => {
                subContainerHeader.setSubContainerTitle(e.target.textContent);
            })
        }
    }

    return {
        renderListTitleEvent
    }
})();

const subContainerEvents = (function () {

    function addTodoButtonEvents() {
        const addTodoDiv = document.querySelector("#addTodoDiv");
        addTodoDiv.addEventListener("click", () => {
            const modal = document.querySelector("#modal");
            //open modal
            modalDOM.openModal(modal);
            //render modal form
            modalDOM.renderAddTodoModal();
        })
    }

    return {
        addTodoButtonEvents
    }
})();

const onLoad = (function () {
    pageFrame.renderPageFrame();
    todoLists.renderTodoLists();
    projectsSidebar.renderProjectsSidebar();
    subContainerHeader.renderSubContainerHeader();
    subContainerList.renderSubContainerList();
    subContainerList.renderAddTodo();
    sideBarEvents.renderListTitleEvent();
    subContainerEvents.addTodoButtonEvents();
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