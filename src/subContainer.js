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
  function renderListItem(listName, item) {
    listName = CSS.escape(listName);
    let taskList = document.querySelector(`.${listName}`);
    //container
    let newItem = document.createElement("div");
    newItem.id = listName + item.index;
    newItem.classList.add("todo-item");
    newItem.setAttribute("data-index", item.index);
    //components array for operations
    let components = [];
    //checkbox (task done/tasknot done)
    let checkbox = document.createElement("p");
    checkbox.id = "checkbox" + item.index;
    checkbox.classList.add("checkbox");
    components.push(checkbox);
    //item title
    let itemTitle = document.createElement("p");
    itemTitle.id = "itemTitle" + item.index;
    itemTitle.textContent = item.title;
    components.push(itemTitle);
    //edit button
    let editBtn = document.createElement("p");
    editBtn.id = "editBtn" + item.index;
    editBtn.classList.add("editBtn");
    components.push(editBtn);
    //delete button
    let deleteBtn = document.createElement("p");
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
  }

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

  return {
    newTodoButtonEvents,
    editTodoItemEvent,
  };
})();

//get dom data
const dataDOM = (function () {
  //get/set list name of todo item
  let itemIndex;

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
