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

//retrieve data of previus session from localStorage
if (localStorage.length > 0) {
  storageManager.retrieveStorageData();
  //keep due today / due soon lists up to date
  todoListManager.fillTodayList();
  todoListManager.fillUpcomingList();
  console.table(todoListManager.getAllTodoLists());
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

//render default list items on load
if (localStorage.length > 0) {
  const defaultList = todoListManager.getTodoListByName("defaultList");
  defaultList.items.forEach((item) => {
    subContainerList.renderListItem(defaultList.nameDOM, item);
  });
}

//render stored projects on load
if (localStorage.length > 0) {
  const doNotRender = [
    "defaultList",
    "todayList",
    "upcomingList",
    "archiveList",
  ];
  const allTodoLists = todoListManager.getAllTodoLists();
  allTodoLists.forEach((list) => {
    if (doNotRender.includes(list.nameDOM) === false) {
      projectsSidebar.renderNewProject(list);
    }
  });
}
