(()=>{"use strict";const e=function(){const e=document.querySelector("#main");let t,n,d,i;return{renderPageFrame:function(){t=document.createElement("div"),t.id="header",e.appendChild(t),function(){const e=document.createElement("p");e.id="pageTitle",e.classList.add("headerItem"),e.textContent="ToDo-List by smd92",t.appendChild(e)}(),n=document.createElement("div"),n.id="container",e.appendChild(n),d=document.createElement("div"),d.id="sidebar",n.appendChild(d),i=document.createElement("div"),i.id="subContainer",n.appendChild(i)}}}(),t=function(){let e;function t(t,n,d){(t=document.createElement("p")).id=n,t.classList.add("todoList"),t.textContent=d,e.appendChild(t)}return{renderTodoLists:function(){e=document.createElement("div"),e.id="listsContainer",sidebar.appendChild(e),t(void 0,"globalList","Eingang"),t(void 0,"todayList","Heute"),t(void 0,"upcomingList","Demnächst")}}}(),n=function(){let e;return{renderProjectsSidebar:function(){e=document.createElement("div"),e.id="projectsContainer",sidebar.appendChild(e),function(){const t=document.createElement("p");t.id="projectsTitle",t.textContent="Projekte",e.appendChild(t)}()}}}(),d=function(){let e,t;return{renderSubContainerHeader:function(){e=document.createElement("div"),e.id="subContainerHeader",subContainer.appendChild(e),t=document.createElement("p"),t.id="subContainerTitle",t.textContent="Eingang",e.appendChild(t)},setSubContainerTitle:function(e){t.textContent=e}}}(),i=function(){let e;return{renderSubContainerList:function(){e=document.createElement("div"),e.id="subContainerList",subContainer.appendChild(e)},renderAddTodo:function(){const t=document.createElement("div");t.id="addTodoDiv";const n=document.createElement("p");n.id="plusSymbol",n.textContent="+";const d=document.createElement("p");d.id="addTodo",d.textContent="Aufgabe hinzufügen",t.appendChild(n),t.appendChild(d),e.appendChild(t)}}}(),o=function(){let e,t,n,d=["title","description","dueDate","priority","list"],i=["Titel","Beschreibung","Timing","Priorität","Liste"];function o(e){null!==e&&(e.classList.remove("active"),overlay.classList.remove("active"))}return{renderModalFrame:function(d){e=document.createElement("div"),e.id="modal",e.classList.add("modal");const i=document.createElement("div");i.id="overlay",i.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{o(e)}))})),t=document.createElement("div"),t.classList.add("modal-header"),n=document.createElement("div"),n.classList.add("modal-body");const a=document.createElement("div");a.classList.add("modal-title"),a.textContent=d;const r=document.createElement("button");r.id="closeButton",r.classList.add("close-button"),r.innerHTML="&times;",r.addEventListener("click",(()=>{o(r.closest(".modal")),null!=n.firstChild&&n.firstChild.remove()})),main.appendChild(e),main.appendChild(i),e.appendChild(t),e.appendChild(n),t.appendChild(a),t.appendChild(r)},renderAddTodoModal:function(){const e=document.createElement("div");e.id="addTodoModal";const t=document.createElement("div");t.id="formContainer";const o=document.createElement("form");o.setAttribute("action","#"),o.setAttribute("method","post");const a=document.createElement("div");a.id="formFields",function(e,t,n){for(let d=0;d<t.length;d++){let i=document.createElement("div");i.classList.add("form-field");let o=document.createElement("label");o.setAttribute("for",t[d]),o.textContent=n[d],i.appendChild(o);let a=document.createElement("input");a.type="dueDate"===t[d]?"date":"text",a.id=`todo_${t[d]}`,a.name=`todo_${t[d]}`,i.appendChild(a),e.appendChild(i)}}(o,d,i);const r=document.createElement("p");r.id="formButton",r.classList.add("button"),r.textContent="+",o.appendChild(a),t.appendChild(o),e.appendChild(t),e.appendChild(r),n.appendChild(e)},openModal:function(e){null!==e&&(e.classList.add("active"),overlay.classList.add("active"))},closeModal:o}}(),a=function(){let e=document.getElementsByClassName("todoList");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{d.setSubContainerTitle(e.target.textContent)}))},r=function(){document.querySelector("#addTodoDiv").addEventListener("click",(()=>{const e=document.querySelector("#modal");o.openModal(e),o.renderAddTodoModal()}))};e.renderPageFrame(),t.renderTodoLists(),n.renderProjectsSidebar(),d.renderSubContainerHeader(),i.renderSubContainerList(),i.renderAddTodo(),a(),r(),o.renderModalFrame();let c=new class{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.index}}({title:"Test Title",description:"this is a test",dueDate:"01-01-1970",priority:"high"});console.log(c);let l=new class{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.notes=e.notes,this.todoList=[]}addTodo(e){this.todoList.push(e)}removeTodo(e){let t=e.index;this.todoList.splice(t,1)}indexTodos(){let e=0;this.todoList.forEach((t=>{t.index=e,e++}))}}({title:"Test Project",description:"this is a project",dueDate:"01-01-1970",priority:"medium"});console.log(l)})();