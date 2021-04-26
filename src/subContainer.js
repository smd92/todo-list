import modalDOM from "/src/modal.js";

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
        subContainerTitle.classList.add(className);
    }

    function renderSubContainerHeader() {
        createSubContainerHeader();
        createSubContainerTitle();
    }

    return {
        renderSubContainerHeader,
        setSubContainerTitle,
        setSubContainerTitleClassName
    };
})();

const subContainerList = (function () {

    let list;

    function renderSubContainerList() {
        list = document.createElement("div");
        list.id = "subContainerList";

        subContainer.appendChild(list);
    }

    function renderNewTodo() {
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
        list.appendChild(newTodoDiv);
    }

    return {
        renderSubContainerList,
        renderNewTodo
    }
})();

const subContainerEvents = (function () {

    function newTodoButtonEvents() {
        const newTodoDiv = document.querySelector("#newTodoDiv");
        newTodoDiv.addEventListener("click", () => {
            const modal = document.querySelector("#modal");
            //open modal
            modalDOM.openModal(modal);
            //render modal form
            modalDOM.renderNewTodoModal();
        })
    }

    return {
        newTodoButtonEvents
    }
})();

export { subContainerHeader, subContainerList, subContainerEvents };