import format from "date-fns/format";

//create todo lists
class TodoList {
  constructor({ visibleName, nameDOM }) {
    this.visibleName = visibleName;
    this.nameDOM = nameDOM;
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
    if (this.nameDOM != "todayList" && this.nameDOM != "upcomingList") {
      this.items.forEach((item) => {
        item.listName = this.nameDOM;
      });
    }
  }
}

//create todo items
class Todo {
  constructor({ title, description, dueDate, ISODate, priority, listName }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.ISODate = ISODate;
    this.comparisonDate = new Date(`${new Date(ISODate).getFullYear()}-${new Date(ISODate).getMonth()}-${new Date(ISODate).getDate()}`);
    this.priority = priority;
    this.index;
    this.listName = listName;
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
      list.setItemsListName();
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
            const itemData = {
              title: item.title,
              description: item.description,
              dueDate: item.dueDate,
              ISODate: item.ISODate,
              priority: item.priority,
              listName: "todayList",
            };
            const todayItem = new Todo(itemData);
            todayItem.inTodayList = true;
            pushTodoInCorrectList("todayList", todayItem);
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
            const itemData = {
              title: item.title,
              description: item.description,
              dueDate: item.dueDate,
              ISODate: item.ISODate,
              priority: item.priority,
              listName: "upcomingList",
            };
            const upcomingItem = new Todo(itemData);
            upcomingItem.inUpcomingList = true;
            pushTodoInCorrectList("upcomingList", upcomingItem);
            item.inUpcomingList = true;
          }
        });
      }
    });
  }

  function getAllTodoLists() {
    return allTodoLists;
  }

  function getAllItems() {
    const allItems = [];
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        allItems.push(item);
      })
    })
  }

  //return an array consisting of all todo items, that are due today
  function getAllTodayItems() {
    const newDate = new Date();
    const todayDate = new Date(`${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`);
    const allTodayItems = [];
    allTodoLists.forEach((list) => {
      if (list.nameDOM != "archiveList") {
        list.items.forEach((item) => {
          if (JSON.stringify(item.comparisonDate) === JSON.stringify(todayDate)) {
            allTodayItems.push(item);
          }
        });
      }
    });
    return allTodayItems;
  }

  function getTodoListByIndex(listIndex) {
    return allTodoLists[listIndex];
  }

  function getTodoListByName(listName) {
    for (let i = 0; i < allTodoLists.length; i++) {
      if (allTodoLists[i].nameDOM === listName) {
        return allTodoLists[i];
      }
    }
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

  function removeItemFromList(listIndex, itemIndex) {
    allTodoLists[listIndex].items.splice(itemIndex, 1);
    allTodoLists[listIndex].enumerateItems();
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
    getAllTodoLists,
    getAllItems,
    getAllTodayItems,
    getTodoListByIndex,
    getTodoListByName,
    getListIndex,
    getItemFromList,
    removeItemFromList,
    editItem,
  };
})();

class storageData {
  constructor({ visibleName, nameDOM, items, listName }) {
    this.visibleName = visibleName;
    this.nameDOM = nameDOM;
    this.items = items;
    this.listName = listName;
  }
}

//handle localStorage
const storageManager = (function () {
  //array to be stored in localStorage
  let storage = [];
  //array to be filled with todo items created from storage data
  let retrievedItems = [];

  //collect data from all todo-lists
  function collectData() {
    const allTodoLists = todoListManager.getAllTodoLists();
    allTodoLists.forEach((list) => {
      if (list.nameDOM != "todayList" && list.nameDOM != "upcomingList") {
        const listData = new storageData(list);
        storage.push(listData);
      }
    });
  }

  //save data to localStorage
  function saveData() {
    localStorage.setItem("storage", JSON.stringify(storage));
  }

  //get data from localStorage
  function getAllData() {
    storage = JSON.parse(localStorage.getItem("storage"));
    console.log("storage array:");
    console.table(storage);
  }

  //store all data
  function storeAllData() {
    //empty storage array and localStorage to prevent redundancy
    storage.length = 0;
    localStorage.clear();
    //store all data
    collectData();
    saveData();
  }

  //create todo-list objects from localStorage data
  function createListsFromStorage() {
    storage.forEach((listData) => {
      let list = new TodoList(listData);
      //push lists in lists array
      todoListManager.addTodoList(list);
    });
  }

  //create todo items from localStorage data
  function createTodoItemsFromStorage() {
    storage.forEach((listData) => {
      const items = listData.items;
      items.forEach((item) => {
        const itemData = {
          title: item.title,
          description: item.description,
          dueDate: item.dueDate,
          ISODate: item.ISODate,
          listName: item.listName,
          priority: item.priority,
        };
        const todoItem = new Todo(itemData);
        retrievedItems.push(todoItem);
      });
    });
    console.log("retrieved items array:");
    console.table(retrievedItems);
  }

  function pushItemsInLists() {
    retrievedItems.forEach((item) => {
      todoListManager.pushTodoInCorrectList(item.listName, item);
    });
  }

  //render/reactivate all data
  function retrieveStorageData() {
    getAllData();
    createListsFromStorage();
    createTodoItemsFromStorage();
    pushItemsInLists();
    console.log("all todo-lists");
    console.table(todoListManager.getAllTodoLists());
  }

  return {
    storeAllData,
    retrieveStorageData,
  };
})();

export { Todo, TodoList, todoListManager, storageManager };
