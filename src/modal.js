const modalDOM = (function () {

    let modal;
    let modalHeader;
    let modalBody;
    //define the form fields
    let formFieldsArray = ["title", "description", "dueDate", "priority", "list"];
    let labelTextArray = ["Titel", "Beschreibung", "Timing", "Priorität", "Liste"];

    //create the core elements of the modal
    function renderModalFrame(titleText) {
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
        modalTitle.textContent = titleText;

        const closeButton = document.createElement("button");
        closeButton.id = "closeButton";
        closeButton.classList.add("close-button");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => {
            //close the modal
            const modal = closeButton.closest(".modal");
            closeModal(modal);
            //remove modal content
            if (modalBody.firstChild != null) modalBody.firstChild.remove();
        })

        main.appendChild(modal);
        main.appendChild(overlay);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
    }

    //render modal for adding a new todo item
    function renderAddTodoModal() {
        const addTodoModal = document.createElement("div");
        addTodoModal.id = "addTodoModal";

        const formContainer = document.createElement("div");
        formContainer.id = "formContainer";

        const form = document.createElement("form");
        form.setAttribute("action", "#");
        form.setAttribute("method", "post");

        const formFields = document.createElement("div");
        formFields.id = "formFields";
        renderAddTodoFormFields(form, formFieldsArray, labelTextArray);

        const formButton = document.createElement("p");
        formButton.id = "formButton";
        formButton.classList.add("button");
        formButton.textContent = "+";

        form.appendChild(formFields);
        formContainer.appendChild(form);
        addTodoModal.appendChild(formContainer);
        addTodoModal.appendChild(formButton);
        modalBody.appendChild(addTodoModal);
    }

    //render the label and input elements
    function renderAddTodoFormFields(form, formFieldsArray, labelTextArray) {
        for (let i = 0; i < formFieldsArray.length; i++) {
            let fieldDiv = document.createElement("div");
            fieldDiv.classList.add("form-field");

            let label = document.createElement("label");
            label.setAttribute("for", formFieldsArray[i]);
            label.textContent = labelTextArray[i];
            fieldDiv.appendChild(label);

            let input = document.createElement("input");
            formFieldsArray[i] === "dueDate" ? input.type = "date" : input.type = "text";
            input.id = `todo_${formFieldsArray[i]}`;
            input.name = `todo_${formFieldsArray[i]}`;
            fieldDiv.appendChild(input);

            form.appendChild(fieldDiv);
        }
    }

    function addFormButtonEvent() {

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
    }

    return {
        renderModalFrame,
        renderAddTodoModal,
        openModal,
        closeModal
    }
})();

export default modalDOM;