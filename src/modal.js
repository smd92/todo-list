const modalDOM = (function () {

    let modal;
    let modalHeader;
    let modalBody;

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
    function renderaddTodoModal() {
        const addTodoModal = document.createElement("div");

        modalBody.appendChild(addTodoModal);
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
        renderaddTodoModal,
        openModal,
        closeModal
    }
})();

export default modalDOM;