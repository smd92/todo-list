(()=>{"use strict";const e=function(){const e=document.querySelector("#main");let t,n,i,d;return{renderPageFrame:function(){t=document.createElement("div"),t.id="header",e.appendChild(t),function(){const e=document.createElement("p");e.id="pageTitle",e.classList.add("headerItem"),e.textContent="ToDo-List by smd92",t.appendChild(e)}(),n=document.createElement("div"),n.id="container",e.appendChild(n),i=document.createElement("div"),i.id="sidebar",n.appendChild(i),d=document.createElement("div"),d.id="subContainer",n.appendChild(d)}}}();class t{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.index}}const n=function(){let e=[],n={defaultList:[],todayList:[],upcomingList:[]};return{addNewTodo:function(i,d){let o={title:i[0],description:i[1],dueDate:i[2],priority:i[3]},a=new t(o);e.push(a),function(e,t){switch(e){case"defaultList":n.defaultList.push(t);break;case"todayList":n.todayList.push(t);break;case"upcomingList":n.upcomingList.push(t)}}(d,a),function(){for(let t=0;t<e.length;t++)e[t].index=t}(),console.log(e)},setNewTodoList:function(e){todoLists.newList=[]}}}(),i=function(){let e,t,n,i=["title","description","dueDate","priority","list"],o=["Titel","Beschreibung","Timing","Priorität","Liste"];function a(e){null!==e&&(e.classList.remove("active"),overlay.classList.remove("active"),n.firstChild.remove())}return{renderModalFrame:function(){e=document.createElement("div"),e.id="modal",e.classList.add("modal");const i=document.createElement("div");i.id="overlay",i.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{a(e)}))})),t=document.createElement("div"),t.classList.add("modal-header"),n=document.createElement("div"),n.classList.add("modal-body");const d=document.createElement("div");d.classList.add("modal-title");const o=document.createElement("button");o.id="closeButton",o.classList.add("close-button"),o.innerHTML="&times;",o.addEventListener("click",(()=>{a(o.closest(".modal"))})),main.appendChild(e),main.appendChild(i),e.appendChild(t),e.appendChild(n),t.appendChild(d),t.appendChild(o)},renderNewTodoModal:function(){document.querySelector(".modal-title").textContent="Neue Aufgabe";const e=document.createElement("div");e.id="newTodoModal";const t=document.createElement("div");t.id="formContainer";const a=document.createElement("form");a.setAttribute("action","#"),a.setAttribute("method","post");const s=document.createElement("div");s.id="formFields",function(e,t,n){for(let i=0;i<t.length;i++){let d=document.createElement("div");d.classList.add("form-field-container");let o=document.createElement("label");o.setAttribute("for",t[i]),o.textContent=n[i],d.appendChild(o);let a=document.createElement("input");a.type="dueDate"===t[i]?"date":"text",a.id=`todo_${t[i]}`,a.name=`todo_${t[i]}`,a.classList.add("input-field"),d.appendChild(a),e.appendChild(d)}}(a,i,o);const c=document.createElement("p");c.id="formButton",c.classList.add("button"),c.textContent="+",d.submitFormButtonEvent(c),a.appendChild(s),t.appendChild(a),e.appendChild(t),e.appendChild(c),n.appendChild(e)},openModal:function(e){null!==e&&(e.classList.add("active"),overlay.classList.add("active"))},closeModal:a}}(),d={submitFormButtonEvent:function(e){e.addEventListener("click",(()=>{let e=document.querySelector("#subContainerTitle").className;const t=document.getElementsByClassName("input-field");let d=[];for(let e=0;e<t.length;e++)d.push(t[e].value);n.addNewTodo(d,e);const o=document.querySelector(".modal");i.closeModal(o)}))}},o=i,a=function(){let e,t;return{renderSubContainerHeader:function(){e=document.createElement("div"),e.id="subContainerHeader",subContainer.appendChild(e),t=document.createElement("p"),t.id="subContainerTitle",t.className="defaultList",t.textContent="Eingang",e.appendChild(t)},setSubContainerTitle:function(e){t.textContent=e},setSubContainerTitleClassName:function(e){t.classList.add(e)}}}(),s=function(){let e;return{renderSubContainerList:function(){e=document.createElement("div"),e.id="subContainerList",subContainer.appendChild(e)},renderNewTodo:function(){const t=document.createElement("div");t.id="newTodoDiv";const n=document.createElement("p");n.id="plusSymbol",n.textContent="+";const i=document.createElement("p");i.id="newTodo",i.textContent="Aufgabe hinzufügen",t.appendChild(n),t.appendChild(i),e.appendChild(t)}}}(),c=function(){document.querySelector("#newTodoDiv").addEventListener("click",(()=>{const e=document.querySelector("#modal");o.openModal(e),o.renderNewTodoModal()}))},l=function(){let e;function t(t,n,i){(t=document.createElement("p")).id=n,t.classList.add("todoList"),t.textContent=i,e.appendChild(t)}return{renderTodoLists:function(){e=document.createElement("div"),e.id="listsContainer",sidebar.appendChild(e),t(void 0,"defaultList","Eingang"),t(void 0,"todayList","Heute"),t(void 0,"upcomingList","Demnächst")}}}(),r=function(){let e;return{renderProjectsSidebar:function(){e=document.createElement("div"),e.id="projectsContainer",sidebar.appendChild(e),function(){const t=document.createElement("p");t.id="projectsTitle",t.textContent="Projekte",e.appendChild(t)}()}}}(),u=function(){const e=document.querySelector("#subContainerTitle");let t=document.getElementsByClassName("todoList");for(let n=0;n<t.length;n++)t[n].addEventListener("click",(t=>{a.setSubContainerTitle(t.target.textContent),t.target.id!=e.className&&e.classList.remove(e.className),a.setSubContainerTitleClassName(t.target.id)}))};e.renderPageFrame(),l.renderTodoLists(),r.renderProjectsSidebar(),a.renderSubContainerHeader(),s.renderSubContainerList(),s.renderNewTodo(),u(),c(),o.renderModalFrame();let m=new t({title:"Test Title",description:"this is a test",dueDate:"01-01-1970",priority:"high"});console.log(m);let p=new class{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.notes=e.notes,this.todoList=[]}addTodo(e){this.todoList.push(e)}removeTodo(e){let t=e.index;this.todoList.splice(t,1)}indexTodos(){let e=0;this.todoList.forEach((t=>{t.index=e,e++}))}}({title:"Test Project",description:"this is a project",dueDate:"01-01-1970",priority:"medium"});console.log(p)})();