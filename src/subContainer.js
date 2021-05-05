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
        subContainerTitle.className = className;
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
    function renderListItem(listName, item) {
        let taskList = document.querySelector(`.${listName}`);
        //container
        let newItem = document.createElement("div");
        newItem.id = listName + item.index;
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
        })
        
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
        removeNewTodoButton
    }
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
        })
    }

    return {
        newTodoButtonEvents
    }
})();

export { subContainerHeader, subContainerList, subContainerEvents };