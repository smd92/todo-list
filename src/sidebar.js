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
  let globalList;
  let archiveList;

  function createListsContainer() {
    const sidebar = document.querySelector("#sidebar");
    listsContainer = document.createElement("div");
    listsContainer.id = "listsContainer";

    sidebar.appendChild(listsContainer);
  }

  function createSidebarItem(elementVar, id, textContent) {
    elementVar = document.createElement("p");
    elementVar.id = id;
    elementVar.classList.add("todoList");
    elementVar.classList.add("white-transparent");
    elementVar.textContent = textContent;

    listsContainer.appendChild(elementVar);
  }

  function renderSideBar() {
    createListsContainer();
    createSidebarItem(defaultList, "defaultList", "Eingang");
    createSidebarItem(todayList, "todayList", "Heute");
    createSidebarItem(upcomingList, "upcomingList", "Demnächst");
    //globalList is not an actual todo-list object as it only serves for displaying all todo items of all lists
    createSidebarItem(globalList, "globalList", "Alle Aufgaben");
    createSidebarItem(archiveList, "archiveList", "Archiv");
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
    let sidebarProject = document.createElement("p");
    sidebarProject.id = project.nameDOM;
    sidebarProject.classList.add("todoList");
    sidebarProject.classList.add("white-transparent");
    sidebarProject.textContent = project.visibleName;

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

  function refreshListsNodes() {
    listsNodes = document.getElementsByClassName("todoList");
  }

  function renderListTitleEvent() {
    refreshListsNodes();
    for (let i = 0; i < listsNodes.length; i++) {
      listsNodes[i].addEventListener("click", (e) => {
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
      listsNodes[i].addEventListener("click", (e) => {
        const newTodoButton = document.querySelector("#newTodoDiv");
        const noTodoButton = [
          "todayList",
          "upcomingList",
          "archiveList",
          "globalList",
        ];
        //add/remove button for adding new todo
        if (noTodoButton.includes(e.target.id) && newTodoButton != null) {
          subContainerList.removeNewTodoButton();
        }
        if (
          e.target.id != "todayList" &&
          e.target.id != "upcomingList" &&
          e.target.id != "globalList" &&
          e.target.id != "archiveList" &&
          newTodoButton === null
        ) {
          subContainerList.renderNewTodoButton();
          subContainerEvents.newTodoButtonEvents();
        }
      });
    }
  }

  //triggers rendering of the items within clicked list
  function renderListItemsEvent() {
    for (let i = 0; i < listsNodes.length; i++) {
      listsNodes[i].addEventListener("click", (e) => {
        if (e.target.id === "todayList") {
          console.log(todoListManager.getAllTodayItems());
        }
        subContainerList.clearSubcontainerList();
        let todoLists = todoListManager.getAllTodoLists();
        todoLists.forEach((list) => {
          if (e.target.id != "globalList" && list.nameDOM === e.target.id) {
            list.items.forEach((item) => {
              subContainerList.renderListItem(e.target.id, item);
            });
          }
        });
      });
    }
  }

  //globalList event
  function globalListEvent() {
    const globalList = document.querySelector("#globalList");
    globalList.addEventListener("click", () => {
      if (document.querySelector("#globalContainer") === null) {
        subContainerList.renderGlobalList();
        subContainerList.renderGLobalItems();
      }
    });
  }

  //remove globalList Container
  function removeGlobal() {
    for (let i = 0; i < listsNodes.length; i++) {
      listsNodes[i].addEventListener("click", (e) => {
        const globalContainer = document.querySelector("#globalContainer");
        if (e.target.id != "globalList") {
          if (globalContainer != null) globalContainer.remove();
        }
      });
    }
  }

  function addSidebarEvents() {
    renderListTitleEvent();
    newProjectButtonEvents();
    manageNewTodoButtonEvent();
    renderListItemsEvent();
    globalListEvent();
    removeGlobal();
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
