import { storageManager } from "./Todos";
import modalDOM from "/src/modal.js";
import { todoListManager } from "/src/Todos.js";

const subContainerHeader = (function () {
  let subContainerHeader;
  let subContainerTitle;

  function createSubContainerHeader() {
    const subContainer = document.querySelector("#subContainer");
    subContainerHeader = document.createElement("div");
    subContainerHeader.id = "subContainerHeader";

    subContainer.appendChild(subContainerHeader);
  }

  function createSubContainerTitle() {
    subContainerTitle = document.createElement("p");
    subContainerTitle.id = "subContainerTitle";
    subContainerTitle.classList.add("white-transparent");
    subContainerTitle.textContent = "Eingang";

    subContainerHeader.appendChild(subContainerTitle);
  }

  function createSubContainerBody() {
    const subContainer = document.querySelector("#subContainer");
    const subContainerBody = document.createElement("div");
    subContainerBody.id = "subContainerBody";
    subContainerBody.classList = "defaultList";

    subContainer.appendChild(subContainerBody);
  }

  function setSubContainerTitle(text) {
    subContainerTitle.textContent = text;
  }

  function getSubContainerTitle() {
    return subContainerTitle.textContent;
  }

  function setSubContainerBodyClassName(className) {
    const subContainerBody = document.querySelector("#subContainerBody");
    subContainerBody.className = className;
  }

  function renderSubContainer() {
    createSubContainerHeader();
    createSubContainerTitle();
    createSubContainerBody();
  }

  return {
    renderSubContainer,
    setSubContainerTitle,
    getSubContainerTitle,
    setSubContainerBodyClassName,
  };
})();

const subContainerList = (function () {
  function renderWatchlistContainers(listsArr) {
    const subContainerBody = document.querySelector("#subContainerBody");
    const watchlistContainer = document.createElement("div");
    watchlistContainer.id = "watchlistContainer";
    watchlistContainer.classList.add("display");

    listsArr.forEach((list) => {
      if (list.items.length > 0) {
        //create the listContainer
        const listContainer = document.createElement("div");
        listContainer.id = `${list.nameDOM}-watchlist`;
        listContainer.classList.add(list.nameDOM);
        listContainer.classList.add("listContainer");
        //create the listContainer title
        const listContainerTitle = document.createElement("p");
        listContainerTitle.className = "listContainerTitle";
        listContainerTitle.textContent = list.visibleName;

        listContainer.appendChild(listContainerTitle);
        watchlistContainer.appendChild(listContainer);
      }
    });
    subContainerBody.appendChild(watchlistContainer);
  }

  function renderGlobalAndArchiveItems(listsArr) {
    const listContainers = document.querySelectorAll(".listContainer");
    listsArr.forEach((list) => {
      list.items.forEach((item) => {
        const newItem = renderListItem(item.listName, item, "watchlist");
        for (let i = 0; i < listContainers.length; i++) {
          if (listContainers[i].id === `${item.listName}-watchlist`) {
            listContainers[i].appendChild(newItem);
          }
        }
      });
    });
  }

  //render todo item
  function renderListItem(listName, item, type = "") {
    listName = CSS.escape(listName);
    let taskList;
    if (type === "edit-item") {
      taskList = document.querySelector(`#${listName}-watchlist`);
    } else {
      taskList = document.querySelector(`.${listName}`);
    }
    //container
    const newItem = document.createElement("div");
    newItem.id = listName + item.index;
    newItem.classList.add("todo-item");
    newItem.classList.add("white-transparent");
    newItem.classList.add("display");
    newItem.setAttribute("data-index", item.index);
    newItem.setAttribute("in-list", item.listName);
    //components array for operations such as editing, deleting
    const components = [];
    //checkbox (task done/tasknot done)
    const checkbox = document.createElement("p");
    checkbox.id = "checkbox" + item.index;
    checkbox.classList.add("checkbox");
    components.push(checkbox);
    //item title
    const itemTitle = document.createElement("p");
    itemTitle.id = "itemTitle" + item.index;
    itemTitle.textContent = item.title;
    components.push(itemTitle);
    //item dueDate
    const itemDueDate = document.createElement("p");
    itemDueDate.id = "itemDueDate" + item.index;
    itemDueDate.textContent = item.dueDate;
    components.push(itemDueDate);
    //edit button
    const editBtn = document.createElement("p");
    editBtn.id = "editBtn" + item.index;
    editBtn.classList.add("editBtn");
    components.push(editBtn);
    //delete button
    const deleteBtn = document.createElement("p");
    deleteBtn.id = "deleteBtn" + item.index;
    deleteBtn.classList.add("deleteBtn");
    components.push(deleteBtn);

    //append components
    components.forEach((component) => {
      newItem.appendChild(component);
    });

    //return item for renderGlobalAndArchiveItems function
    if (type === "watchlist") {
      return newItem;
    }

    //append item to list
    const addTodoBtn = document.querySelector("#newTodoDiv");
    if (addTodoBtn != null) {
      taskList.insertBefore(newItem, addTodoBtn);
    } else {
      taskList.appendChild(newItem);
    }
  }

  //clear the todo-list
  function clearSubcontainerList(type = "standard") {
    let removals;
    if (type === "standard") {
      removals = document.querySelectorAll(".display");
    }
    if (type === "item") {
      removals = document.querySelectorAll(".todo-item");
    }
    for (let i = 0; i < removals.length; i++) {
      removals[i].remove();
    }
  }

  function renderNewTodoButton() {
    const subContainerBody = document.querySelector("#subContainerBody");
    const newTodoDiv = document.createElement("div");
    newTodoDiv.id = "newTodoDiv";

    const plusSymbol = document.createElement("p");
    plusSymbol.id = "plusSymbol";
    plusSymbol.textContent = "+";

    const newTodo = document.createElement("p");
    newTodo.id = "newTodo";
    newTodo.textContent = "Aufgabe hinzufügen";

    newTodoDiv.appendChild(plusSymbol);
    newTodoDiv.appendChild(newTodo);
    subContainerBody.appendChild(newTodoDiv);
  }

  function removeNewTodoButton() {
    const newTodoDiv = document.querySelector("#newTodoDiv");
    newTodoDiv.remove();
  }

  function renderLists(listName) {
    switch (listName) {
      case "todayList":
        todoListManager.getAllTodayItems().forEach((item) => {
          subContainerList.renderListItem(listName, item);
        });
        break;
      case "upcomingList":
        todoListManager.getAllUpcomingItems().forEach((item) => {
          subContainerList.renderListItem(listName, item);
        });
        break;
      case "overdueList":
        todoListManager.getAllOverdueItems().forEach((item) => {
          subContainerList.renderListItem(listName, item);
        });
        break;
      case "globalList":
        todoListManager.getAllTodoLists();
        subContainerList.renderWatchlistContainers(
          todoListManager.getAllTodoLists()
        );
        subContainerList.renderGlobalAndArchiveItems(
          todoListManager.getAllTodoLists()
        );
        break;
      case "archiveList":
        break;
      default:
        clearSubcontainerList();
        todoListManager.getAllTodoLists().forEach((list) => {
          if (list.nameDOM === listName) {
            list.items.forEach((item) => {
              subContainerList.renderListItem(listName, item);
            });
          }
        });
    }
    //add events for editing/deleting items
    subContainerEvents.editTodoItemEvent();
    subContainerEvents.deleteButtonEvent();
  }

  return {
    renderWatchlistContainers,
    renderGlobalAndArchiveItems,
    renderListItem,
    clearSubcontainerList,
    renderNewTodoButton,
    removeNewTodoButton,
    renderLists,
  };
})();

const subContainerEvents = (function () {
  //render modal for adding new todo item
  function newTodoButtonEvents() {
    const newTodoDiv = document.querySelector("#newTodoDiv");
    newTodoDiv.addEventListener("click", () => {
      const modal = document.querySelector("#modal");
      //open modal
      modalDOM.openModal(modal);
      //render modal form
      modalDOM.renderNewTodoModal();
    });
  }

  function editTodoItemEvent() {
    const editButtons = document.querySelectorAll(".editBtn");
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", (e) => {
        //get item data
        dataDOM.setListName(e.target);
        const listName = dataDOM.getListName();
        dataDOM.setItemIndex(editButtons[i].parentNode);
        const itemIndex = dataDOM.getItemIndex();
        const item = todoListManager.getItemFromList(listName, itemIndex);
        const modal = document.querySelector("#modal");
        //open modal
        modalDOM.openModal(modal);
        //render modal form
        modalDOM.renderEditTodoModal();
        //fill form fields using the info from the respective list item
        modalDOM.fillEditFormFields(item);
      });
    }
  }

  //delete todo items
  function deleteButtonEvent() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", (e) => {
        const components = e.target.parentNode.childNodes;
        if (
          confirm(
            `Soll das folgende Todo wirklich gelöscht werden?
            "${components[1].textContent}"`
          )
        ) {
          dataDOM.setItemIndex(e.target.parentNode);
          const listNameDelete = e.target.parentNode.getAttribute("in-list");
          const listIndex = todoListManager.getListIndex(listNameDelete);
          const itemIndex = dataDOM.getItemIndex();
          todoListManager.deleteItemFromList(listIndex, itemIndex);
          //remove item from DOM by rendering all items without the now deleted item
          subContainerList.clearSubcontainerList("item");
          const listNameRender =
            document.querySelector("#subContainerBody").className;
          subContainerList.renderLists(listNameRender);
          //remove item from localStorage by storing all items without the now deleted item
          storageManager.storeAllData();
        }
      });
    }
  }

  return {
    newTodoButtonEvents,
    editTodoItemEvent,
    deleteButtonEvent,
  };
})();

//get dom data
const dataDOM = (function () {
  let itemIndex;
  let listName;

  //get/set list name of todo item
  function setListName(targetNode) {
    listName = targetNode.parentNode.getAttribute("in-list");
  }

  function getListName() {
    return listName;
  }

  //get/set index of todo item
  function setItemIndex(itemNode) {
    itemIndex = parseInt(itemNode.getAttribute("data-index"));
  }

  function getItemIndex() {
    return itemIndex;
  }

  return {
    setListName,
    getListName,
    setItemIndex,
    getItemIndex,
  };
})();

export { subContainerHeader, subContainerList, subContainerEvents, dataDOM };
