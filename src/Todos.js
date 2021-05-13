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
    this.priority = todoData.priority;
    this.index;
    this.listName;
    this.inTodayList = false;
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
    });
  }

  //populate todayList
  function fillTodayList() {
    let todayDate = format(new Date(), "dd.MM.yyyy");

    allTodoLists.forEach((todoList) => {
      if (todoList.nameDOM != "todayList") {
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
    
  }

  function getTodoLists() {
    return allTodoLists;
  }

  //TEST
  function printLists() {
    console.log(allTodoLists);
  }

  return {
    addTodoList,
    pushTodoInCorrectList,
    fillTodayList,
    getTodoLists,
    printLists,
  };
})();

const todoManager = (function () {
  return {};
})();

export { Todo, TodoList, todoListManager };
