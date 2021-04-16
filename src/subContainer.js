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
        subContainerTitle.textContent = "Eingang";

        subContainerHeader.appendChild(subContainerTitle);
    }

    function setSubContainerTitle(text) {
        subContainerTitle.textContent = text;
    }

    function renderSubContainerHeader() {
        createSubContainerHeader();
        createSubContainerTitle();
    }

    return {
        renderSubContainerHeader,
        setSubContainerTitle
    };
})();

const subContainerList = (function () {

    let list;

    function renderSubContainerList() {
        list = document.createElement("div");
        list.id = "subContainerList";

        subContainer.appendChild(list);
    }

    function renderAddTodo() {
        const addTodoDiv = document.createElement("div");
        addTodoDiv.id = "addTodoDiv";

        const plusSymbol = document.createElement("p");
        plusSymbol.id = "plusSymbol";
        plusSymbol.textContent = "+";

        const addTodo = document.createElement("p");
        addTodo.id = "addTodo";
        addTodo.textContent = "Aufgabe hinzufügen";

        addTodoDiv.appendChild(plusSymbol);
        addTodoDiv.appendChild(addTodo);
        list.appendChild(addTodoDiv);
    }

    return {
        renderSubContainerList,
        renderAddTodo
    }
})();

export { subContainerHeader, subContainerList };