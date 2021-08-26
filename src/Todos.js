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
    this.comparisonDate = new Date(
      `${new Date(ISODate).getFullYear()}-${
        new Date(ISODate).getMonth() + 1
      }-${new Date(ISODate).getDate()}`
    );
    this.priority = priority;
    this.index;
    this.listName = listName;
  }

  updateComparisonDate() {
    this.comparisonDate = new Date(
      `${new Date(this.ISODate).getFullYear()}-${
        new Date(this.ISODate).getMonth() + 1
      }-${new Date(this.ISODate).getDate()}`
    );
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

  function getAllTodoLists() {
    return allTodoLists;
  }

  function getAllItems() {
    const allItems = [];
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        allItems.push(item);
      });
    });
  }

  //return an array consisting of all todo items, that are due today
  function getAllTodayItems() {
    const newDate = new Date();
    const todayDate = new Date(
      `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    );
    const allTodayItems = [];
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        if (JSON.stringify(item.comparisonDate) === JSON.stringify(todayDate)) {
          allTodayItems.push(item);
        }
      });
    });
    return allTodayItems;
  }

  //return an array consisting of all todo items, that are due soon
  function getAllUpcomingItems() {
    const todayDate = new Date();
    const rangeTop = new Date();
    rangeTop.setDate(new Date().getDate() + 3);

    const allUpcomingItems = [];
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        if (
          item.comparisonDate > todayDate &&
          item.comparisonDate <= rangeTop
        ) {
          allUpcomingItems.push(item);
        }
      });
    });

    return allUpcomingItems;
  }

  function getAllOverdueItems() {
    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth() + 1;
    const todayDate = new Date().getDate();
    const allOverdueItems = [];
    allTodoLists.forEach((list) => {
      list.items.forEach((item) => {
        const itemYear = new Date(item.ISODate).getFullYear();
        const itemMonth = new Date(item.ISODate).getMonth() + 1;
        const itemDate = new Date(item.ISODate).getDate();
        if (
          (todayYear >= itemYear &&
            todayMonth === itemMonth &&
            todayDate > itemDate) ||
          (todayYear >= itemYear && todayMonth > itemMonth)
        ) {
          allOverdueItems.push(item);
        }
      });
    });

    return allOverdueItems;
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

  //delete todo item
  function deleteItemFromList(listIndex, itemIndex) {
    allTodoLists[listIndex].items.splice(itemIndex, 1);
    allTodoLists[listIndex].enumerateItems();
  }

  //delete project
  function deleteProject(listIndex) {
    allTodoLists.splice(listIndex, 1);
  }

  //edit todo item
  function editItem(listIndex, itemIndex, property, value) {
    allTodoLists[listIndex].items[itemIndex][property] = value;
    allTodoLists[listIndex].items[itemIndex].updateComparisonDate();
  }

  //edit project
  function editProject(listIndex, { visibleName, nameDOM }) {
    //edit properties
    allTodoLists[listIndex].visibleName = visibleName;
    allTodoLists[listIndex].nameDOM = nameDOM;
    //update listName of items
    allTodoLists[listIndex].setItemsListName();
  }

  return {
    addTodoList,
    pushTodoInCorrectList,
    getAllTodoLists,
    getAllItems,
    getAllTodayItems,
    getAllUpcomingItems,
    getAllOverdueItems,
    getTodoListByIndex,
    getTodoListByName,
    getListIndex,
    getItemFromList,
    deleteItemFromList,
    deleteProject,
    editItem,
    editProject,
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
