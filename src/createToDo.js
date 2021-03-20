//create todo items
class ToDo {
    constructor(data) {
        for (let prop in data) {
            this.prop = prop;
        }
        this.test = "hi";
    }

    logTest() {
        console.log(this.test);
    }
}

export default ToDo;