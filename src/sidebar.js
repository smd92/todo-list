import { subContainerHeader, subContainerList } from "/src/subContainer.js";

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

    function createProjectsContainer() {
        projectsContainer = document.createElement("div");
        projectsContainer.id = "projectsContainer";

        sidebar.appendChild(projectsContainer);
    }

    function createProjectsTitle() {
        const title = document.createElement("p");
        title.id = "projectsTitle";
        title.textContent = "Projekte";

        projectsContainer.appendChild(title);
    }

    function renderProjectsSidebar() {
        createProjectsContainer();
        createProjectsTitle();
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
                }
            })
        }
    }

    return {
        renderListTitleEvent,
        manageNewTodoButtonEvent
    }
})();

export { todoListsSidebar, projectsSidebar, sideBarEvents };