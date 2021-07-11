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
subContainerHeader.renderSubContainerHeader();
subContainerList.renderNewTodoButton();
sideBarEvents.addSidebarEvents();
subContainerEvents.newTodoButtonEvents();
modalDOM.renderModalFrame();
//todoListManager.retrieveFromLocalStorage();
if (localStorage.length > 0) {
  storageManager.retrieveStorageData();
}

//create the basic set of lists
if (localStorage.length === 0) {
  let defaultListData = {
    0: "Eingang",
  };
  let archiveListData = {
    0: "Archiv",
  };
  let defaultList = new TodoList(defaultListData);
  defaultList.nameDOM = "defaultList";
  let archiveList = new TodoList(archiveListData);
  archiveList.nameDOM = "archiveList";
  todoListManager.addTodoList(defaultList);
  todoListManager.addTodoList(archiveList);
}

//always create todayList and upcomingList, because they are not stored
let todayListData = {
  0: "Heute",
};
let upcomingListData = {
  0: "Demnächst",
};

let todayList = new TodoList(todayListData);
todayList.nameDOM = "todayList";
let upcomingList = new TodoList(upcomingListData);
upcomingList.nameDOM = "upcomingList";
todoListManager.addTodoList(todayList);
todoListManager.addTodoList(upcomingList);
//keep due today / due soon lists up to date
todoListManager.fillTodayList();
todoListManager.fillUpcomingList();

/*
//render default list items on load
if (localStorage.length > 0) {
  const defaultList = todoListManager.getTodoList(0);
  defaultList.items.forEach((item) => {
    subContainerList.renderListItem(defaultList.nameDOM, item);
  });
}
*/
