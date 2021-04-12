const modalDOM = (function() {

    let modal;
    let modalHeader;
    let modalBody;

    function renderModalFrame(titleText) {
        modal = document.createElement("div");
        modal.id = "modal";
        modal.classList.add("modal");

        const overlay = document.createElement("div");
        overlay.id = "overlay";

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

        main.appendChild(modal);
        main.appendChild(overlay);
        modal.appendChild(modalHeader);
        modal.appendChild(modalBody);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
    }

    function renderaddTodoModal() {
        const addTodoModal = document.createElement("div");

        modalBody.appendChild(addTodoModal);
    }

    return {
        renderModalFrame,
        renderaddTodoModal,
        clearModalBody
    }
})();

const modalEvents = (function() {

    const closeButton = document.querySelector("#closeButton");
    const modalBody = document.querySelector("#modalBody");

    function clearModalOnClose() {
        closeButton.addEventListener("click", () => {
            modalBody.firstChild.remove();
        })
    }

    return {
        clearModalOnClose
    }
})();

export { modalDOM, modalEvents };