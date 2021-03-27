const todoLists = (function() {

    let listsContainer;

    function createListsContainer() {
        listsContainer = document.createElement("p");
        listsContainer.id = "listsContainer";
        
        sidebar.appendChild(listsContainer);
    }

    function createGlobalList() {
        const globalList = document.createElement("p");
        globalList.id = "globalList";
        globalList.classList.add("sidebarItem");
        globalList.textContent = "Eingang";

        listsContainer.appendChild(globalList);
    }

    function createTodayList() {
        const todayList = document.createElement("p");
        todayList.id = "todayList";
        todayList.classList.add("sidebarItem");
        todayList.textContent = "Heute";

        listsContainer.appendChild(todayList);
    }

    function renderTodoLists() {
        createListsContainer();
        createGlobalList();
        createTodayList();
    }

    return { renderTodoLists };
})();

export default todoLists;