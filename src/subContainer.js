import modalDOM from "/src/modal.js";
import { todoListManager } from "/src/Todos.js";

const subContainerHeader = (function () {
  let subContainerHeader;
  let subContainerTitle;

  function createSubContainerHeader() {
    subContainerHeader = document.createElement("div");
    subContainerHeader.id = "subContainerHeader";

    subContainer.appendChild(subContainerHeader);
  }

  function createSubContainerTitle() {
    subContainerTitle = document.createElement("p");
    subContainerTitle.id = "subContainerTitle";
    subContainerTitle.className = "defaultList";
    subContainerTitle.textContent = "Eingang";

    subContainerHeader.appendChild(subContainerTitle);
  }

  function setSubContainerTitle(text) {
    subContainerTitle.textContent = text;
  }

  function setSubContainerTitleClassName(className) {
    subContainerTitle.className = className;
  }

  function renderSubContainerHeader() {
    createSubContainerHeader();
    createSubContainerTitle();
  }

  return {
    renderSubContainerHeader,
    setSubContainerTitle,
    setSubContainerTitleClassName,
  };
})();

const subContainerList = (function () {
  function renderListItem(listName, item) {
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
    components.push(checkbox);
    //item title
    let itemTitle = document.createElement("p");
    itemTitle.id = "itemTitle" + item.index;
    itemTitle.textContent = item.title;
    components.push(itemTitle);
    //edit button
    let editBtn = document.createElement("p");
    editBtn.id = "editBtn" + item.index;
    components.push(editBtn);
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
    //delete button
    let deleteBtn = document.createElement("p");
    deleteBtn.id = "deleteBtn" + item.index;
    components.push(deleteBtn);

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
  }

  function renderNewTodoButton() {
    const subContainerTitle = document.querySelector("#subContainerTitle");
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
    subContainerTitle.appendChild(newTodoDiv);
  }

  function removeNewTodoButton() {
    const newTodoDiv = document.querySelector("#newTodoDiv");
    newTodoDiv.remove();
  }

  return {
    renderListItem,
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
    let listName = document.querySelector("#subContainerTitle").className;
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
    getItemIndex
  }
})();

export { subContainerHeader, subContainerList, subContainerEvents, dataDOM };
