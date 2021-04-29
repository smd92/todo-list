(()=>{"use strict";const e=function(){const e=document.querySelector("#main");let t,n,d,o;return{renderPageFrame:function(){t=document.createElement("div"),t.id="header",e.appendChild(t),function(){const e=document.createElement("p");e.id="pageTitle",e.classList.add("headerItem"),e.textContent="ToDo-List by smd92",t.appendChild(e)}(),n=document.createElement("div"),n.id="container",e.appendChild(n),d=document.createElement("div"),d.id="sidebar",n.appendChild(d),o=document.createElement("div"),o.id="subContainer",n.appendChild(o)}}}();class t{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.index}}const n=function(){let e,t,n,o=["title","description","dueDate","priority"],i=["Titel","Beschreibung","Timing","Priorität"];function a(e){null!==e&&(e.classList.remove("active"),overlay.classList.remove("active"),n.firstChild.remove())}return{renderModalFrame:function(){e=document.createElement("div"),e.id="modal",e.classList.add("modal");const d=document.createElement("div");d.id="overlay",d.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{a(e)}))})),t=document.createElement("div"),t.classList.add("modal-header"),n=document.createElement("div"),n.classList.add("modal-body");const o=document.createElement("div");o.classList.add("modal-title");const i=document.createElement("button");i.id="closeButton",i.classList.add("close-button"),i.innerHTML="&times;",i.addEventListener("click",(()=>{a(i.closest(".modal"))})),main.appendChild(e),main.appendChild(d),e.appendChild(t),e.appendChild(n),t.appendChild(o),t.appendChild(i)},renderNewTodoModal:function(){document.querySelector(".modal-title").textContent="Neue Aufgabe";const e=document.createElement("div");e.id="newTodoModal";const t=document.createElement("div");t.id="formContainer";const a=document.createElement("form");a.setAttribute("action","#"),a.setAttribute("method","post");const r=document.createElement("div");r.id="formFields",function(e,t,n){for(let d=0;d<t.length;d++){let o=document.createElement("div");o.classList.add("form-field-container");let i=document.createElement("label");i.setAttribute("for",t[d]),i.textContent=n[d],o.appendChild(i);let a=document.createElement("input");a.type="dueDate"===t[d]?"date":"text",a.id=`todo_${t[d]}`,a.name=`todo_${t[d]}`,a.classList.add("input-field"),o.appendChild(a),e.appendChild(o)}}(a,o,i);const l=document.createElement("p");l.id="formButton",l.classList.add("button"),l.textContent="+",d.submitFormButtonEvent(l),a.appendChild(r),t.appendChild(a),e.appendChild(t),e.appendChild(l),n.appendChild(e)},openModal:function(e){null!==e&&(e.classList.add("active"),overlay.classList.add("active"))},closeModal:a}}(),d={submitFormButtonEvent:function(e){e.addEventListener("click",(()=>{const e=document.getElementsByClassName("input-field");let d=[];for(let t=0;t<e.length;t++)d.push(e[t].value);let o={title:d[0],description:d[1],dueDate:d[2],priority:d[3]},i=new t(o);console.log(i);const a=document.querySelector(".modal");n.closeModal(a)}))}},o=n,i=function(){let e,t;return{renderSubContainerHeader:function(){e=document.createElement("div"),e.id="subContainerHeader",subContainer.appendChild(e),t=document.createElement("p"),t.id="subContainerTitle",t.className="defaultList",t.textContent="Eingang",e.appendChild(t)},setSubContainerTitle:function(e){t.textContent=e},setSubContainerTitleClassName:function(e){t.classList.add(e)}}}(),a=function(){let e;return{renderSubContainerList:function(){e=document.createElement("div"),e.id="subContainerList",subContainer.appendChild(e)},renderNewTodoButton:function(){const t=document.createElement("div");t.id="newTodoDiv";const n=document.createElement("p");n.id="plusSymbol",n.textContent="+";const d=document.createElement("p");d.id="newTodo",d.textContent="Aufgabe hinzufügen",t.appendChild(n),t.appendChild(d),e.appendChild(t)},removeNewTodoButton:function(){document.querySelector("#newTodoDiv").remove()}}}(),r=function(){document.querySelector("#newTodoDiv").addEventListener("click",(()=>{const e=document.querySelector("#modal");o.openModal(e),o.renderNewTodoModal()}))},l=function(){let e;function t(t,n,d){(t=document.createElement("p")).id=n,t.classList.add("todoList"),t.textContent=d,e.appendChild(t)}return{renderTodoLists:function(){e=document.createElement("div"),e.id="listsContainer",sidebar.appendChild(e),t(void 0,"defaultList","Eingang"),t(void 0,"todayList","Heute"),t(void 0,"upcomingList","Demnächst")}}}(),c=function(){let e;return{renderProjectsSidebar:function(){e=document.createElement("div"),e.id="projectsContainer",sidebar.appendChild(e),function(){const t=document.createElement("p");t.id="projectsTitle",t.textContent="Projekte",e.appendChild(t)}()}}}(),s=function(){let e=document.getElementsByClassName("todoList");return{renderListTitleEvent:function(){for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{i.setSubContainerTitle(e.target.textContent)}))},manageNewTodoButtonEvent:function(){for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{const t=document.querySelector("#newTodoDiv");"defaultList"!=e.target.id&&null!=t&&a.removeNewTodoButton(),"defaultList"===e.target.id&&null===t&&a.renderNewTodoButton()}))}}}();e.renderPageFrame(),l.renderTodoLists(),c.renderProjectsSidebar(),i.renderSubContainerHeader(),a.renderSubContainerList(),a.renderNewTodoButton(),s.renderListTitleEvent(),s.manageNewTodoButtonEvent(),r(),o.renderModalFrame()})();