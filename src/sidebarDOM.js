const todoLists = (function() {

    let listsContainer;
    let globalList;
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

    function renderTodoLists() {
        createListsContainer();
        createSidebarItem(globalList, "globalList", "Eingang");
        createSidebarItem(todayList, "todayList", "Heute");
        createSidebarItem(upcomingList, "upcomingList", "Demnächst");
    }

    return { renderTodoLists };
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

const sideBarEvents = (function() {

    function addTodoListsEvent() {
        let listsNodes = document.getElementsByClassName("todoList");
        for (let i = 0; i < listsNodes.length; i++) {
            listsNodes[i].addEventListener(("click"), () => {
                
            })
        }
    }

    function addProjectsContainerEvent() {
        projectsContainer.addEventListener(("click"), () => {

        })
    }

    function addSidebarEvents() {
        addTodoListsEvent();
        addProjectsContainerEvent();
    }

    return { addSidebarEvents }
})();

export { todoLists, projectsSidebar, sideBarEvents };