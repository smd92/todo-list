import pageFrame from "/src/pageFrame.js";
import { TodoList } from "/src/Todos.js";
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
import { todoListManager } from "./Todos";

const onLoadDOM = (function () {
  pageFrame.renderPageFrame();
  todoListsSidebar.renderSideBar();
  projectsSidebar.renderProjectsSidebar();
  subContainerHeader.renderSubContainerHeader();
  subContainerList.renderNewTodoButton();
  sideBarEvents.addSidebarEvents();
  subContainerEvents.newTodoButtonEvents();
  modalDOM.renderModalFrame();
})();

const onLoadFunctionality = (function () {
  let defaultListData = {
    0: "Eingang",
  };
  let todayListData = {
    0: "Heute",
  };
  let upcomingListData = {
    0: "Demnächst",
  };
  let archiveListData = {
    0: "Demnächst",
  };
  let defaultList = new TodoList(defaultListData);
  defaultList.nameDOM = "defaultList";
  let todayList = new TodoList(todayListData);
  todayList.nameDOM = "todayList";
  let upcomingList = new TodoList(upcomingListData);
  upcomingList.nameDOM = "upcomingList";
  let archiveList = new TodoList(archiveListData);
  archiveList.nameDOM = "archiveList";
  todoListManager.addTodoList(defaultList);
  todoListManager.addTodoList(todayList);
  todoListManager.addTodoList(upcomingList);
  todoListManager.addTodoList(archiveList);
})();
