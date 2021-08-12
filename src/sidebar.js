import {
  subContainerHeader,
  subContainerList,
  subContainerEvents,
} from "/src/subContainer.js";
import { todoListManager } from "/src/Todos.js";
import modalDOM from "/src/modal.js";

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
    //append components
    components.forEach((component) => {
      sidebarProject.appendChild(component);
    });

    projectsList.appendChild(sidebarProject);
    sideBarEvents.renderListTitleEvent();
    sideBarEvents.renderListItemsEvent();
    sideBarEvents.manageNewTodoButtonEvent();
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
  };
})();

const sideBarEvents = (function () {
  let listsNodes = document.getElementsByClassName("todoList");
  let watchNodes = document.getElementsByClassName("watchlist");
  let timingNodes = [
    document.querySelector("#todayList"),
    document.querySelector("#upcomingList"),
  ];
  let globalArchiveNodes = [
    document.querySelector("#globalList"),
    document.querySelector("#archiveList"),
  ];

  function getAllNodes() {
    return [...listsNodes, ...watchNodes];
  }

  function refreshListsNodes() {
    listsNodes = document.getElementsByClassName("todoList");
    watchNodes = document.getElementsByClassName("watchlist");
    timingNodes = [
      document.querySelector("#todayList"),
      document.querySelector("#upcomingList"),
      document.querySelector("#overdueList"),
    ];
    globalArchiveNodes = [
      document.querySelector("#globalList"),
      document.querySelector("#archiveList"),
    ];
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
        subContainerList.clearSubcontainerList();
        let todoLists = todoListManager.getAllTodoLists();
        todoLists.forEach((list) => {
          if (e.target.id != "globalList" && list.nameDOM === e.target.id) {
            list.items.forEach((item) => {
              subContainerList.renderListItem(e.target.id, item);
            });
            //add events for editing/deleting items
            subContainerEvents.editTodoItemEvent();
            subContainerEvents.deleteButtonEvent();
          }
        });
      });
    }
  }

  function renderTimingLists() {
    for (let i = 0; i < timingNodes.length; i++) {
      timingNodes[i].addEventListener("click", (e) => {
        const items = _getWatchlistItems(e.target.id);
        items.forEach((item) => {
          subContainerList.renderListItem(e.target.id, item);
        });
        //add events for editing/deleting items
        subContainerEvents.editTodoItemEvent();
        subContainerEvents.deleteButtonEvent();
      });
    }
  }

  function renderGlobalAndArchiveItemsEvent() {
    for (let i = 0; i < globalArchiveNodes.length; i++) {
      globalArchiveNodes[i].addEventListener("click", (e) => {
        const listsArr = _getWatchlistItems(e.target.id);
        //container rendering und item rendering zusammenfassen, dann von hier callen
        subContainerList.renderWatchlistContainers(listsArr);
        subContainerList.renderGlobalAndArchiveItems(listsArr);
        //add events for editing/deleting items
        subContainerEvents.editTodoItemEvent();
        subContainerEvents.deleteButtonEvent();
      });
    }
  }

  function _getWatchlistItems(watchlist) {
    switch (watchlist) {
      case "todayList":
        return todoListManager.getAllTodayItems();
      case "upcomingList":
        return todoListManager.getAllUpcomingItems();
      case "overdueList":
        return todoListManager.getAllOverdueItems();
      case "globalList":
        return todoListManager.getAllTodoLists();
      case "archiveList":
        break;
    }
  }

  function addSidebarEvents() {
    renderListTitleEvent();
    newProjectButtonEvents();
    manageNewTodoButtonEvent();
    clearSubcontainerEvent();
    renderListItemsEvent();
    renderTimingLists();
    renderGlobalAndArchiveItemsEvent();
  }

  return {
    renderListTitleEvent,
    newProjectButtonEvents,
    manageNewTodoButtonEvent,
    renderListItemsEvent,
    addSidebarEvents,
  };
})();

export { todoListsSidebar, projectsSidebar, sideBarEvents };
