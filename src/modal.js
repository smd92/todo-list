import { Todo, todoListManager } from "/src/Todos.js";

const modalDOM = (function () {

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

        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.addEventListener(("click"), () => {
            const modals = document.querySelectorAll(".modal.active");
            modals.forEach(modal => {
                closeModal(modal);
            })
        })

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
        })

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
            formFieldsArray[i] === "dueDate" ? input.type = "date" : input.type = "text";
            input.id = `todo_${formFieldsArray[i]}`;
            input.name = `todo_${formFieldsArray[i]}`;
            input.classList.add("input-field");
            fieldDiv.appendChild(input);

            form.appendChild(fieldDiv);
        }
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
        modalBody.firstChild.remove();
    }

    return {
        renderModalFrame,
        renderNewTodoModal,
        openModal,
        closeModal
    }
})();

const modalEvents = (function () {

    //event of the form button for creating a new todo
    function submitFormButtonEvent(formButton) {
        
        formButton.addEventListener("click", () => {
            //grab form input
            const formFields = document.getElementsByClassName("input-field");
            let formData = [];
            for (let i = 0; i < formFields.length; i++) {
                formData.push(formFields[i].value);
            }
            let todoData = {
                title: formData[0],
                description: formData[1],
                dueDate: formData[2],
                priority: formData[3]
            }
            //create new todo
            let listName = document.querySelector("#subContainerTitle").className;
            let todo = new Todo(todoData);
            todoListManager.pushInCorrectList(listName, todo);
            todoListManager.printLists();
            //close and clean modal after submitting form
            const modal = document.querySelector(".modal");
            modalDOM.closeModal(modal);
        })
    }

    return {
        submitFormButtonEvent
    }
})();

export default modalDOM;