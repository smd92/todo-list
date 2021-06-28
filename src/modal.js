import { Todo, TodoList, todoListManager } from "/src/Todos.js";
import {
  subContainerList,
  subContainerEvents,
  dataDOM,
} from "/src/subContainer.js";
import { projectsSidebar } from "/src/sidebar.js";
import format from "date-fns/format";

const modalDOM = (function () {
  let main = document.querySelector("#main");
  let modal;
  let modalHeader;
  let modalBody;
  //define the form fields
  let formFieldsArray = ["title", "description", "dueDate", "priority"];
  let labelTextArray = ["Titel", "Beschreibung", "Timing", "Priorität"];

  //create the core elements of the modal
  function renderModalFrame() {
    modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");

    let overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal.active");
      modals.forEach((modal) => {
        closeModal(modal);
      });
    });

    modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const modalTitle = document.createElement("div");
    modalTitle.classList.add("modal-title");

    const closeButton = document.createElement("button");
    closeButton.id = "closeButton";
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      //close the modal
      const modal = closeButton.closest(".modal");
      closeModal(modal);
    });

    main.appendChild(modal);
    main.appendChild(overlay);
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  }

  //render modal for adding a new todo item
  function renderNewTodoModal() {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = "Neue Aufgabe";

    const newTodoModal = document.createElement("div");
    newTodoModal.id = "newTodoModal";

    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";

    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");

    const formFields = document.createElement("div");
    formFields.id = "formFields";
    renderNewTodoFormFields(form, formFieldsArray, labelTextArray);

    const formButton = document.createElement("p");
    formButton.id = "formButton";
    formButton.classList.add("button");
    formButton.textContent = "+";
    //submit event
    modalEvents.submitFormButtonEvent(formButton);

    form.appendChild(formFields);
    formContainer.appendChild(form);
    newTodoModal.appendChild(formContainer);
    newTodoModal.appendChild(formButton);
    modalBody.appendChild(newTodoModal);
  }

  //modal for editing todo items
  function renderEditTodoModal() {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = "Aufgabe bearbeiten";

    const editTodoModal = document.createElement("div");
    editTodoModal.id = "editTodoModal";

    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";

    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");

    const formFields = document.createElement("div");
    formFields.id = "formFields";
    renderNewTodoFormFields(form, formFieldsArray, labelTextArray);

    const formButton = document.createElement("p");
    formButton.id = "formButton";
    formButton.classList.add("button");
    formButton.textContent = "+";
    //submit event
    modalEvents.submitEditsEvent(formButton);

    form.appendChild(formFields);
    formContainer.appendChild(form);
    editTodoModal.appendChild(formContainer);
    editTodoModal.appendChild(formButton);
    modalBody.appendChild(editTodoModal);
  }

  //pre-set the values of the fields with the values of the to-be-edited item
  function fillEditFormFields(item) {
    const formFields = document.querySelectorAll(".input-field");
    let inputArr = [];
    //format date
    for (let key in item) {
      if (typeof item[key] === "string") inputArr.push(item[key]);
    }
    //format item.dueDate for Chrome's datepicker
    let formatDatePicker = (dateString) => {
      let arr = dateString.split("");
      let year = arr[6] + arr[7] + arr[8] + arr[9];
      let month = arr[3] + arr[4];
      let day = arr[0] + arr[1];
      return year + "-" + month + "-" + day;
    };
    inputArr[2] = formatDatePicker(inputArr[2]);
    for (let i = 0; i < formFields.length; i++) {
      formFields[i].value = inputArr[i];
    }
  }

  //render the label and input elements
  function renderNewTodoFormFields(form, formFieldsArray, labelTextArray) {
    for (let i = 0; i < formFieldsArray.length; i++) {
      let fieldDiv = document.createElement("div");
      fieldDiv.classList.add("form-field-container");

      let label = document.createElement("label");
      label.setAttribute("for", formFieldsArray[i]);
      label.textContent = labelTextArray[i];
      fieldDiv.appendChild(label);

      let input = document.createElement("input");
      formFieldsArray[i] === "dueDate"
        ? (input.type = "date")
        : (input.type = "text");
      input.id = `todo_${formFieldsArray[i]}`;
      input.name = `todo_${formFieldsArray[i]}`;
      input.classList.add("input-field");
      fieldDiv.appendChild(input);
      //append the field container
      form.appendChild(fieldDiv);
    }
  }

  function renderNewProjectModal() {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = "Neues Projekt";

    const newProjectModal = document.createElement("div");
    newProjectModal.id = "newProjectModal";

    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";

    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");

    //render project modal form fields
    const formFields = document.createElement("div");
    formFields.id = "formFields";
    const projectModalNameDiv = document.createElement("div");
    projectModalNameDiv.classList.add("form-field-container");
    //label
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Projektname";
    projectModalNameDiv.appendChild(nameLabel);
    //input
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "project_name";
    nameInput.name = "project_name";
    nameInput.classList.add("input-field");
    projectModalNameDiv.appendChild(nameInput);
    //append the field container
    form.appendChild(projectModalNameDiv);

    const formButton = document.createElement("p");
    formButton.id = "formButton";
    formButton.classList.add("button");
    formButton.textContent = "+";
    //submit event
    modalEvents.projectFormButtonEvent(formButton);

    form.appendChild(formFields);
    formContainer.appendChild(form);
    newProjectModal.appendChild(formContainer);
    newProjectModal.appendChild(formButton);
    modalBody.appendChild(newProjectModal);
  }

  //open the modal
  function openModal(modal) {
    if (modal === null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  //close the modal
  function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
    //clean up modal on close
    const modalBodyChildren = modalBody.childNodes;
    for (let i = 0; i < modalBodyChildren.length; i++) {
      modalBodyChildren[i].remove();
    }
  }

  return {
    renderModalFrame,
    renderNewTodoModal,
    renderEditTodoModal,
    fillEditFormFields,
    renderNewProjectModal,
    openModal,
    closeModal,
  };
})();

const modalEvents = (function () {
  //event of the form button for creating a new todo item
  function submitFormButtonEvent(formButton) {
    formButton.addEventListener("click", () => {
      //grab form input
      let formData = formHandler.grabTodoData();
      let todoData = formHandler.processTodoData(formData);
      //create new todo item
      let listName = document.querySelector("#subContainerTitle").className;
      let todo = new Todo(todoData);
      todoListManager.pushTodoInCorrectList(listName, todo);
      //update todayList and upcomingList
      todoListManager.fillTodayList();
      todoListManager.fillUpcomingList();
      //render new todo item
      subContainerList.renderListItem(listName, todo);
      //add eventlistener for editing modal
      subContainerEvents.editTodoItemEvent();
      //close and clean modal after submitting form
      const modal = document.querySelector(".modal");
      modalDOM.closeModal(modal);
    });
  }

  function submitEditsEvent(formButton) {
    formButton.addEventListener("click", () => {
      //grab form input
      const formData = formHandler.grabTodoData();
      const todoData = formHandler.processTodoData(formData);
      //collect information for editing item
      const listName = dataDOM.getListName();
      const listIndex = todoListManager.getListIndex(listName);
      const itemIndex = dataDOM.getItemIndex();
      //call function that edits the item
      for (let key in todoData) {
        todoListManager.editItem(listIndex, itemIndex, key, todoData[key]);
      }
      //update DOM
      subContainerList.clearSubcontainerList();
      const todoList = todoListManager.getTodoList(listIndex).items;
      todoList.forEach((item) => {
        subContainerList.renderListItem(listName, item);
      });
      subContainerEvents.editTodoItemEvent();
      //close modal
      const modal = document.querySelector(".modal");
      modalDOM.closeModal(modal);
    });
  }

  //event of the form button for creating a new project item/todo list
  function projectFormButtonEvent(projectFormButton) {
    projectFormButton.addEventListener("click", () => {
      //grab form input
      let projectData = formHandler.processProjectData();
      //create new project
      let project = new TodoList(projectData);
      todoListManager.addTodoList(project);
      //render new project in sidebar
      projectsSidebar.renderNewProject(project);
      //close and clean modal after submitting form
      const modal = document.querySelector(".modal");
      modalDOM.closeModal(modal);
    });
  }

  return {
    submitFormButtonEvent,
    submitEditsEvent,
    projectFormButtonEvent,
  };
})();

const formHandler = (function () {
  //grab form input
  function grabTodoData() {
    //grab form input
    const formFields = document.getElementsByClassName("input-field");
    let formData = [];
    for (let i = 0; i < formFields.length; i++) {
      formData.push(formFields[i].value);
    }
    return formData;
  }

  //create data for todo constructor function
  function processTodoData(formData) {
    let todoData = {
      title: formData[0],
      description: formData[1],
      dueDate: format(new Date(formData[2]), "dd.MM.yyyy"),
      priority: formData[3],
    };
    return todoData;
  }

  //create data for project constructor function
  function processProjectData() {
    const formFields = document.getElementsByClassName("input-field");
    let formData = [];
    let projectData = {};
    for (let i = 0; i < formFields.length; i++) {
      formData.push(formFields[i].value);
      projectData[i] = formData[i];
    }
    return projectData;
  }

  return {
    grabTodoData,
    processTodoData,
    processProjectData,
  };
})();

export default modalDOM;
