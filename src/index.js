import pageFrame from "/src/pageFrame.js";
import { TodoList, todoListManager, storageManager } from "/src/Todos.js";
import {
  todoListsSidebar,
  projectsSidebar,
  sideBarEvents,
} from "/src/sidebar.js";
import {
  subContainerHeader,
  subContainerList,
  subContainerEvents,
} from "/src/subContainer.js";
import modalDOM from "/src/modal.js";

pageFrame.renderPageFrame();
todoListsSidebar.renderSideBar();
projectsSidebar.renderProjectsSidebar();
subContainerHeader.renderSubContainer();
subContainerList.renderNewTodoButton();
sideBarEvents.addSidebarEvents();
subContainerEvents.newTodoButtonEvents();
modalDOM.renderModalFrame();

//retrieve data of previus session from localStorage
if (localStorage.length > 0) {
  storageManager.retrieveStorageData();
  console.table(todoListManager.getAllTodoLists());
}

//create the basic set of lists
if (localStorage.length === 0) {
  const defaultListData = {
    visibleName: "Eingang",
    nameDOM: "defaultList",
  };

  const defaultList = new TodoList(defaultListData);
  todoListManager.addTodoList(defaultList);
}

//render default list items on load
if (localStorage.length > 0) {
  const defaultList = todoListManager.getTodoListByName("defaultList");
  defaultList.items.forEach((item) => {
    subContainerList.renderListItem(defaultList.nameDOM, item);
  });
  //add events for editing/deleting items
  subContainerEvents.editTodoItemEvent();
  subContainerEvents.deleteButtonEvent();
}

//render stored projects on load
if (localStorage.length > 0) {
  const doNotRender = ["defaultList"];
  const allTodoLists = todoListManager.getAllTodoLists();
  allTodoLists.forEach((list) => {
    if (doNotRender.includes(list.nameDOM) === false) {
      projectsSidebar.renderNewProject(list);
    }
  });
}
