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

/* 29.07.
//always create todayList and upcomingList, because they are not stored
const todayListData = {
  visibleName: "Heute",
  nameDOM: "todayList",
};
const upcomingListData = {
  visibleName: "Demnächst",
  nameDOM: "upcomingList",
};

const todayList = new TodoList(todayListData);
const upcomingList = new TodoList(upcomingListData);
todoListManager.addTodoList(todayList);
todoListManager.addTodoList(upcomingList);
*/

//retrieve data of previus session from localStorage
if (localStorage.length > 0) {
  storageManager.retrieveStorageData();
  //keep due today / due soon lists up to date
  /* 29.07
  todoListManager.fillTodayList();
  todoListManager.fillUpcomingList();
  */
  console.table(todoListManager.getAllTodoLists());
}


//create the basic set of lists
if (localStorage.length === 0) {
  const defaultListData = {
    visibleName: "Eingang",
    nameDOM: "defaultList",
  };
  /* 29.07
  const archiveListData = {
    visibleName: "Archiv",
    nameDOM: "archiveList",
      
  };*/

  const defaultList = new TodoList(defaultListData);
  //const archiveList = new TodoList(archiveListData);
  todoListManager.addTodoList(defaultList);
  //todoListManager.addTodoList(archiveList);
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
    //"todayList",
    //"upcomingList",
    //"archiveList",
  ];
  const allTodoLists = todoListManager.getAllTodoLists();
  allTodoLists.forEach((list) => {
    if (doNotRender.includes(list.nameDOM) === false) {
      projectsSidebar.renderNewProject(list);
    }
  });
}