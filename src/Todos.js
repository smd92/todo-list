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
    this.comparisonDate = todoData.comparisonDate;
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
    const todayDate = new Date();
    let rangeMax = new Date();
    rangeMax.setDate(new Date().getDate() + 3);

    allTodoLists.forEach((todoList) => {
      if (
        todoList.nameDOM != "upcomingList" &&
        todoList.nameDOM != "archiveList"
      ) {
        todoList.items.forEach((item) => {
          if (
            item.comparisonDate > todayDate &&
            item.comparisonDate <= rangeMax &&
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

  function getAllTodoLists() {
    return allTodoLists;
  }

  function getTodoList(listIndex) {
    return allTodoLists[listIndex];
  }

  function getListIndex(listName) {
    for (let i = 0; i < allTodoLists.length; i++) {
      if (allTodoLists[i].nameDOM === listName) {
        return i;
      }
    }
  }

  //get item data for prefilling edit modal form fields
  function getItemFromList(listName, itemIndex) {
    let item;
    allTodoLists.forEach((list) => {
      if (list.nameDOM === listName) item = list.items[itemIndex];
    });
    return item;
  }

  //edit todo item
  function editItem(listIndex, itemIndex, property, value) {
    allTodoLists[listIndex].items[itemIndex][property] = value;
  }

  return {
    addTodoList,
    pushTodoInCorrectList,
    fillTodayList,
    fillUpcomingList,
    removeFromUpcomingList,
    getAllTodoLists,
    getTodoList,
    getListIndex,
    getItemFromList,
    editItem,
  };
})();

export { Todo, TodoList, todoListManager };
