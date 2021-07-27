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
    setSubContainerBodyClassName,
  };
})();

const subContainerList = (function () {
  function renderGlobalList() {
    const subContainerBody = document.querySelector("#subContainerBody");
    const allTodoLists = todoListManager.getAllTodoLists();

    const globalContainer = document.createElement("div");
    globalContainer.id = "globalContainer";

    allTodoLists.forEach((list) => {
      if (list.items.length > 0) {
        //create the listContainer
        const listContainer = document.createElement("div");
        listContainer.id = `${list.nameDOM}-global`;
        listContainer.className = "listContainer";
        //create the listContainer title
        const listContainerTitle = document.createElement("p");
        listContainerTitle.className = "listContainerTitle";
        listContainerTitle.textContent = list.visibleName;

        listContainer.appendChild(listContainerTitle);
        globalContainer.appendChild(listContainer);
      }
    });
    subContainerBody.appendChild(globalContainer);
  }

  //render global items for overview only
  function renderGLobalItems() {
    const listContainers = document.querySelectorAll(".listContainer");
    const allTodoLists = todoListManager.getAllTodoLists();
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        //container
        const newItem = document.createElement("div");
        newItem.classList.add("global-item");
        //item title
        const itemTitle = document.createElement("p");
        itemTitle.classList.add("global-item-title");
        itemTitle.textContent = item.title;
        newItem.appendChild(itemTitle);
        //item dueDate
        const itemDueDate = document.createElement("p");
        itemDueDate.classList.add("global-item-dueDate");
        itemDueDate.textContent = item.dueDate;
        newItem.appendChild(itemDueDate);

        for (let i = 0; i < listContainers.length; i++) {
          if (listContainers[i].id === `${item.listName}-global`) {
            listContainers[i].appendChild(newItem);
          }
        }
      });
    });
  }

  //render todo item
  function renderListItem(listName, item) {
    listName = CSS.escape(listName);
    const taskList = document.querySelector(`.${listName}`);
    //container
    const newItem = document.createElement("div");
    newItem.id = listName + item.index;
    newItem.classList.add("todo-item");
    newItem.classList.add("white-transparent");
    newItem.setAttribute("data-index", item.index);
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
    /*-----------------------------------------------
    //timing button
    let timingBtn = document.createElement("p");
    timingBtn.id = "timingBtn" + item.index;
    components.push(timingBtn);
    //notes button
    let notesBtn = document.createElement("p");
    notesBtn.id = "notesBtn" + item.index;
    components.push(notesBtn);
    //move item to other list button
    let moveListBtn = document.createElement("p");
    moveListBtn.id = "moveListBtn" + item.index;
    components.push(moveListBtn);
    ------------------------------------------------*/

    //append components
    components.forEach((component) => {
      newItem.appendChild(component);
    });

    //append item to list
    const addTodoBtn = document.querySelector("#newTodoDiv");
    if (addTodoBtn != null) {
      taskList.insertBefore(newItem, addTodoBtn);
    } else {
      taskList.appendChild(newItem);
    }

    //edit item event
    subContainerEvents.editTodoItemEvent();
    //delete item event
    subContainerEvents.deleteButtonEvent();
  }

  /*
  //render all items of all lists
  function renderAllItemsForDefaultList() {
    const allTodoLists = todoListManager.getAllTodoLists();
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        subContainerList.renderListItem("defaultList", item);
      });
    });
  }
  */

  //clear the todo-list
  function clearSubcontainerList() {
    const items = document.querySelectorAll(".todo-item");
    for (let i = 0; i < items.length; i++) {
      items[i].remove();
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

  return {
    renderGlobalList,
    renderGLobalItems,
    renderListItem,
    clearSubcontainerList,
    renderNewTodoButton,
    removeNewTodoButton,
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
    const todoItems = document.querySelectorAll(".todo-item");
    for (let i = 0; i < todoItems.length; i++) {
      todoItems[i].addEventListener("click", () => {
        //get item data
        let listName = dataDOM.getListName();
        dataDOM.setItemIndex(todoItems[i]);
        let itemIndex = dataDOM.getItemIndex();
        let item = todoListManager.getItemFromList(listName, itemIndex);
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

  //deleting items
  function deleteButtonEvent() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", () => {
        dataDOM.setItemIndex(deleteButtons[i].parentNode);
        const itemIndex = dataDOM.getItemIndex();
        console.log(itemIndex);
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

  //get/set list name of todo item
  function getListName() {
    let listName = document.querySelector("#subContainerBody").className;
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
    getListName,
    setItemIndex,
    getItemIndex,
  };
})();

export { subContainerHeader, subContainerList, subContainerEvents, dataDOM };
