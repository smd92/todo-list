import {
  subContainerHeader,
  subContainerList,
  subContainerEvents,
} from "/src/subContainer.js";
import modalDOM from "/src/modal.js";
import { todoListManager } from "./Todos";

const todoListsSidebar = (function () {
  let listsContainer;
  let defaultList;
  let todayList;
  let upcomingList;
  let overdueList;
  let globalList;
  let archiveList;

  function createListsContainer() {
    const sidebar = document.querySelector("#sidebar");
    listsContainer = document.createElement("div");
    listsContainer.id = "listsContainer";

    sidebar.appendChild(listsContainer);
  }

  function createSidebarItem(elementVar, id, textContent, listType) {
    elementVar = document.createElement("p");
    elementVar.id = id;
    elementVar.classList.add(listType);
    elementVar.classList.add("white-transparent");
    elementVar.textContent = textContent;

    listsContainer.appendChild(elementVar);
  }

  function renderSideBar() {
    createListsContainer();
    createSidebarItem(defaultList, "defaultList", "Eingang", "todoList");
    //watchlists are not actual todo-list objects as they only serve for displaying todo-items filtered by certain criteria
    createSidebarItem(todayList, "todayList", "Heute", "watchlist");
    createSidebarItem(upcomingList, "upcomingList", "Demnächst", "watchlist");
    createSidebarItem(overdueList, "overdueList", "Überfällig", "watchlist");
    createSidebarItem(globalList, "globalList", "Alle Aufgaben", "watchlist");
    createSidebarItem(archiveList, "archiveList", "Archiv", "watchlist");
  }

  return {
    renderSideBar,
    createSidebarItem,
  };
})();

const projectsSidebar = (function () {
  let projectsContainer;
  let projectsList;

  function renderProjectsContainer() {
    const sidebar = document.querySelector("#sidebar");
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

  function renderNewProject(project) {
    const sidebarProject = document.createElement("p");
    sidebarProject.id = project.nameDOM;
    sidebarProject.classList.add("todoList");
    sidebarProject.classList.add("sidebar-project");
    sidebarProject.classList.add("white-transparent");
    sidebarProject.textContent = project.visibleName;
    //components means edit button, delete button etc
    const components = [];
    //edit button
    const editBtn = document.createElement("p");
    editBtn.classList.add("editBtn-project");
    components.push(editBtn);
    //delete button
    const deleteBtn = document.createElement("p");
    deleteBtn.classList.add("deleteBtn-project");
    components.push(deleteBtn);
    sideBarEvents.editProjectEvent(editBtn);
    //append components
    components.forEach((component) => {
      sidebarProject.appendChild(component);
    });

    projectsList.appendChild(sidebarProject);
    sideBarEvents.renderListTitleEvent();
    sideBarEvents.renderListItemsEvent();
    sideBarEvents.manageNewTodoButtonEvent();
  }

  function renderAllProjects() {
    const doNotRender = ["defaultList", "archiveList"];
    const allTodoLists = todoListManager.getAllTodoLists();
    allTodoLists.forEach((list) => {
      if (doNotRender.includes(list.nameDOM) === false) {
        projectsSidebar.renderNewProject(list);
      }
    });
    const editProjectButtons = document.querySelectorAll(".editBtn-project");
    for (let i = 0; i < editProjectButtons.length; i++) {
      sideBarEvents.editProjectEvent(editProjectButtons[i]);
    }
  }

  function removeAllProjects() {
    const projectNodes = document.querySelectorAll(".sidebar-project");
    for (let i = 0; i < projectNodes.length; i++) {
      projectNodes[i].remove();
    }
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

  return {
    renderProjectsSidebar,
    renderNewProject,
    renderAllProjects,
    removeAllProjects,
  };
})();

const sideBarEvents = (function () {
  let listsNodes = document.getElementsByClassName("todoList");
  let watchNodes = document.getElementsByClassName("watchlist");

  function getAllNodes() {
    return [...listsNodes, ...watchNodes];
  }

  function refreshListsNodes() {
    listsNodes = document.getElementsByClassName("todoList");
    watchNodes = document.getElementsByClassName("watchlist");
  }

  function renderListTitleEvent() {
    refreshListsNodes();
    const allNodes = getAllNodes();
    for (let i = 0; i < allNodes.length; i++) {
      allNodes[i].addEventListener("click", (e) => {
        //display the lists title in the header of the subcontainer
        subContainerHeader.setSubContainerTitle(e.target.textContent);
        //change classname of subcontainer title to know which list is open
        subContainerHeader.setSubContainerBodyClassName(e.target.id);
      });
    }
  }

  function newProjectButtonEvents() {
    const newProjectDiv = document.querySelector("#newProjectDiv");
    newProjectDiv.addEventListener("click", () => {
      const modal = document.querySelector("#modal");
      //open modal
      modalDOM.openModal(modal);
      //render modal form
      modalDOM.renderNewProjectModal();
    });
  }

  function editProjectEvent(editBtn) {
    editBtn.addEventListener("click", (e) => {
      const modal = document.querySelector("#modal");
      //open modal
      modalDOM.openModal(modal);
      //render edit modal
      modalDOM.renderNewProjectModal(e.target);
    });
  }

  function manageNewTodoButtonEvent() {
    for (let i = 0; i < listsNodes.length; i++) {
      listsNodes[i].addEventListener("click", () => {
        const newTodoButton = document.querySelector("#newTodoDiv");
        //add button for adding new todo
        if (newTodoButton === null) {
          subContainerList.renderNewTodoButton();
          subContainerEvents.newTodoButtonEvents();
        }
      });
    }
    for (let i = 0; i < watchNodes.length; i++) {
      watchNodes[i].addEventListener("click", () => {
        const newTodoButton = document.querySelector("#newTodoDiv");
        if (newTodoButton != null) {
          newTodoButton.remove();
        }
      });
    }
  }

  function clearSubcontainerEvent() {
    const allNodes = getAllNodes();
    for (let i = 0; i < allNodes.length; i++) {
      allNodes[i].addEventListener("click", () => {
        subContainerList.clearSubcontainerList();
      });
    }
  }

  //triggers rendering of the items within clicked list
  function renderListItemsEvent() {
    for (let i = 0; i < listsNodes.length; i++) {
      listsNodes[i].addEventListener("click", (e) => {
        subContainerList.renderLists(e.target.id);
      });
    }
  }

  function rederListsEvent() {
    const allNodes = getAllNodes();
    for (let i = 0; i < allNodes.length; i++) {
      allNodes[i].addEventListener("click", (e) => {
        subContainerList.renderLists(e.target.id);
      });
    }
  }

  function addSidebarEvents() {
    renderListTitleEvent();
    newProjectButtonEvents();
    manageNewTodoButtonEvent();
    clearSubcontainerEvent();
    rederListsEvent();
  }

  return {
    renderListTitleEvent,
    newProjectButtonEvents,
    editProjectEvent,
    manageNewTodoButtonEvent,
    renderListItemsEvent,
    addSidebarEvents,
  };
})();

export { todoListsSidebar, projectsSidebar, sideBarEvents };
