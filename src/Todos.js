import format from "date-fns/format";

//create todo lists
class TodoList {
  constructor(projectData) {
    this.visibleName = projectData[0];
    this.nameDOM = this.visibleName.split(" ").join("-") + "List";
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items.splice(item.index, 1);
  }

  editItem()

  enumerateItems() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].index = i;
    }
  }

  setItemsListName() {
    this.items.forEach((item) => {
      item.listName = this.name;
    });
  }
}

//create todo items
class Todo {
  constructor(todoData) {
    this.title = todoData.title;
    this.description = todoData.description;
    this.dueDate = todoData.dueDate;
    this.priority = todoData.priority;
    this.index;
    this.listName;
    this.inTodayList = false;
    this.inUpcomingList = false;
  }
}

const todoListManager = (function () {
  let allTodoLists = [];

  function addTodoList(todoList) {
    allTodoLists.push(todoList);
  }

  function pushTodoInCorrectList(listName, item) {
    allTodoLists.forEach((list) => {
      if (list.nameDOM === listName) {
        list.items.push(item);
      }
      //set index property of items
      list.enumerateItems();
    });
  }

  //populate todayList
  function fillTodayList() {
    let todayDate = format(new Date(), "dd.MM.yyyy");

    allTodoLists.forEach((todoList) => {
      if (
        todoList.nameDOM != "todayList" &&
        todoList.nameDOM != "archiveList"
      ) {
        todoList.items.forEach((item) => {
          if (item.dueDate === todayDate && item.inTodayList === false) {
            pushTodoInCorrectList("todayList", item);
            item.inTodayList = true;
          }
        });
      }
    });
  }

  //populate upcomingList
  function fillUpcomingList() {
    let todayDate = format(new Date(), "dd.MM.yyyy");
    let maxBase = new Date();
    maxBase.setDate(new Date().getDate() + 3);
    let rangeMax = format(maxBase, "dd.MM.yyyy");

    allTodoLists.forEach((todoList) => {
      if (
        todoList.nameDOM != "upcomingList" &&
        todoList.nameDOM != "archiveList"
      ) {
        todoList.items.forEach((item) => {
          if (
            item.dueDate > todayDate &&
            item.dueDate <= rangeMax &&
            item.inUpcomingList === false
          ) {
            pushTodoInCorrectList("upcomingList", item);
            item.inUpcomingList = true;
          }
        });
      }
    });
  }

  function removeFromUpcomingList() {}

  function getTodoLists() {
    return allTodoLists;
  }

  //get item data for prefilling edit modal form fields
  function getItemFromList(listName, itemIndex) {
    let item;
    allTodoLists.forEach((list) => {
      if (list.nameDOM === listName) item = list.items[itemIndex];
    });
    return item;
  }

  return {
    addTodoList,
    pushTodoInCorrectList,
    fillTodayList,
    fillUpcomingList,
    removeFromUpcomingList,
    getItemFromList,
    getTodoLists,
  };
})();

const todoManager = (function () {
  return {};
})();

export { Todo, TodoList, todoListManager };
