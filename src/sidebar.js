import { subContainerEvents } from "/src/subContainer.js";
import { subContainerHeader, subContainerList } from "/src/subContainer.js";
import { todoListManager } from "/src/Todos.js";

const todoListsSidebar = (function() {

    let listsContainer;
    let defaultList;
    let todayList;
    let upcomingList;

    function createListsContainer() {
        listsContainer = document.createElement("div");
        listsContainer.id = "listsContainer";
        
        sidebar.appendChild(listsContainer);
    }

    function createSidebarItem(elementVar, id, textContent) {
        elementVar = document.createElement("p");
        elementVar.id = id;
        elementVar.classList.add("todoList");
        elementVar.textContent = textContent;

        listsContainer.appendChild(elementVar);
    }

    function renderSideBar() {
        createListsContainer();
        createSidebarItem(defaultList, "defaultList", "Eingang");
        createSidebarItem(todayList, "todayList", "Heute");
        createSidebarItem(upcomingList, "upcomingList", "Demnächst");
    }

    return { 
        renderSideBar,
        createSidebarItem
     };
})();

const projectsSidebar = (function() {
    
    let projectsContainer;
    let projectsList;

    function renderProjectsContainer() {
        projectsContainer = document.createElement("div");
        projectsContainer.id = "projectsContainer";

        sidebar.appendChild(projectsContainer);
    }

    function renderProjectsTitle() {
        const title = document.createElement("p");
        title.id = "projectsTitle";
        title.textContent = "Projekte";

        projectsContainer.appendChild(title);
    }

    function renderProjectsList() {
        projectsList = document.createElement("div");
        projectsList.id = "projectsList";

        projectsContainer.appendChild(projectsList);
    }

    function renderAddProjectButton() {
        const newProjectDiv = document.createElement("div");
        newProjectDiv.id = "newProjectDiv";

        const plusProject = document.createElement("p");
        plusProject.id = "plusProject";
        plusProject.textContent = "+";

        const newProject = document.createElement("p");
        newProject.id = "newProject";
        newProject.textContent = "neues Projekt";

        newProjectDiv.appendChild(plusProject);
        newProjectDiv.appendChild(newProject);
        projectsList.appendChild(newProjectDiv);
    }

    function renderProjectsSidebar() {
        renderProjectsContainer();
        renderProjectsTitle();
        renderProjectsList();
        renderAddProjectButton();
    }

    return { renderProjectsSidebar };
})();

const sideBarEvents = (function () {

    let listsNodes = document.getElementsByClassName("todoList");
    
    function renderListTitleEvent() {
        for (let i = 0; i < listsNodes.length; i++) {
            listsNodes[i].addEventListener(("click"), (e) => {
                //display the lists title in the header of the subcontainer
                subContainerHeader.setSubContainerTitle(e.target.textContent);
                //change classname of subcontainer title to know which list is open
                subContainerHeader.setSubContainerTitleClassName(e.target.id);
            })
        }
    }

    function manageNewTodoButtonEvent() {
        for (let i = 0; i < listsNodes.length; i++) {
            listsNodes[i].addEventListener("click", (e) => {
                const newTodoButton = document.querySelector("#newTodoDiv");

                //add/remove button for adding new todo
                if (e.target.id != "defaultList" && newTodoButton != null) {
                    subContainerList.removeNewTodoButton();
                }
                if (e.target.id === "defaultList" && newTodoButton === null) {
                    subContainerList.renderNewTodoButton();
                    subContainerEvents.newTodoButtonEvents();
                }
            })
        }
    }

    //triggers rendering of the items within clicked list
    function renderListItemsEvent() {
        for (let i = 0; i < listsNodes.length; i++) {
            listsNodes[i].addEventListener("click", (e) => {

                let todoLists = todoListManager.getTodoLists();
                todoLists.forEach((list) => {
                    if (list.name === e.target.id) {
                        list.items.forEach((item) => {
                            subContainerList.renderListItem(e.target.id, item);
                        })
                    }
                })
            })
        }
    }

    function addSidebarEvents() {
        renderListTitleEvent();
        manageNewTodoButtonEvent();
        renderListItemsEvent();
    }

    return {
        renderListTitleEvent,
        manageNewTodoButtonEvent,
        renderListItemsEvent,
        addSidebarEvents
    }
})();

export { todoListsSidebar, projectsSidebar, sideBarEvents };