import ToDo from "/src/createToDo.js";

let testData = {
    title: "Test Title",
    description: "this is a test",
    dueDate: "01-01-1970",
    priority: "high",
    notes: "this is a test note"
}

let testItem = new ToDo(testData);
testItem.logTest();
console.log(testItem);