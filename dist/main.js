(()=>{"use strict";const e=function(){const e=document.querySelector("#main");let t,n,d,o;return{renderPageFrame:function(){t=document.createElement("div"),t.id="header",e.appendChild(t),function(){const e=document.createElement("p");e.id="pageTitle",e.classList.add("headerItem"),e.textContent="ToDo-List by smd92",t.appendChild(e)}(),n=document.createElement("div"),n.id="container",e.appendChild(n),d=document.createElement("div"),d.id="sidebar",n.appendChild(d),o=document.createElement("div"),o.id="subContainer",n.appendChild(o)},sidebar:d}}();class t{constructor(e){this.visibleName=e[0],this.nameDOM=this.visibleName.split(" ").join("-")+"List",this.items=[]}addItem(e){this.items.push(e)}removeItem(e){this.items.splice(e.index,1)}enumerateItems(){for(let e=0;e<this.items.length;e++)this.items[e].index=e}setItemsListName(){this.items.forEach((e=>{e.listName=this.name}))}}class n{constructor(e){this.title=e.title,this.description=e.description,this.dueDate=e.dueDate,this.priority=e.priority,this.index,this.listName}}const d=function(){let e=[];return{addTodoList:function(t){e.push(t)},pushTodoInCorrectList:function(t,n){e.forEach((e=>{e.nameDOM===t&&e.items.push(n)}))},getTodoLists:function(){return e},printLists:function(){console.log(e)}}}(),o=function(){let e,t,n,d=document.querySelector("#main"),o=["title","description","dueDate","priority"],c=["Titel","Beschreibung","Timing","Priorität"];function a(e){null!==e&&(e.classList.remove("active"),overlay.classList.remove("active"),n.firstChild.remove())}return{renderModalFrame:function(){e=document.createElement("div"),e.id="modal",e.classList.add("modal");let o=document.createElement("div");o.id="overlay",o.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{a(e)}))})),t=document.createElement("div"),t.classList.add("modal-header"),n=document.createElement("div"),n.classList.add("modal-body");const i=document.createElement("div");i.classList.add("modal-title");const c=document.createElement("button");c.id="closeButton",c.classList.add("close-button"),c.innerHTML="&times;",c.addEventListener("click",(()=>{a(c.closest(".modal"))})),d.appendChild(e),d.appendChild(o),e.appendChild(t),e.appendChild(n),t.appendChild(i),t.appendChild(c)},renderNewTodoModal:function(){document.querySelector(".modal-title").textContent="Neue Aufgabe";const e=document.createElement("div");e.id="newTodoModal";const t=document.createElement("div");t.id="formContainer";const d=document.createElement("form");d.setAttribute("action","#"),d.setAttribute("method","post");const a=document.createElement("div");a.id="formFields",function(e,t,n){for(let d=0;d<t.length;d++){let o=document.createElement("div");o.classList.add("form-field-container");let i=document.createElement("label");i.setAttribute("for",t[d]),i.textContent=n[d],o.appendChild(i);let c=document.createElement("input");c.type="dueDate"===t[d]?"date":"text",c.id=`todo_${t[d]}`,c.name=`todo_${t[d]}`,c.classList.add("input-field"),o.appendChild(c),e.appendChild(o)}}(d,o,c);const r=document.createElement("p");r.id="formButton",r.classList.add("button"),r.textContent="+",i.submitFormButtonEvent(r),d.appendChild(a),t.appendChild(d),e.appendChild(t),e.appendChild(r),n.appendChild(e)},renderNewProjectModal:function(){document.querySelector(".modal-title").textContent="Neues Projekt";const e=document.createElement("div");e.id="newProjectModal";const t=document.createElement("div");t.id="formContainer";const d=document.createElement("form");d.setAttribute("action","#"),d.setAttribute("method","post");const o=document.createElement("div");o.id="formFields";const c=document.createElement("div");c.classList.add("form-field-container");const a=document.createElement("label");a.setAttribute("for","name"),a.textContent="Projektname",c.appendChild(a);const r=document.createElement("input");r.type="text",r.id="project_name",r.name="project_name",r.classList.add("input-field"),c.appendChild(r),d.appendChild(c);const l=document.createElement("p");l.id="formButton",l.classList.add("button"),l.textContent="+",i.projectFormButtonEvent(l),d.appendChild(o),t.appendChild(d),e.appendChild(t),e.appendChild(l),n.appendChild(e)},openModal:function(e){null!==e&&(e.classList.add("active"),overlay.classList.add("active"))},closeModal:a}}(),i={submitFormButtonEvent:function(e){e.addEventListener("click",(()=>{const e=document.getElementsByClassName("input-field");let t=[];for(let n=0;n<e.length;n++)t.push(e[n].value);let i={title:t[0],description:t[1],dueDate:t[2],priority:t[3]},c=document.querySelector("#subContainerTitle").className,a=new n(i);d.pushTodoInCorrectList(c,a),r.renderListItem(c,a);const l=document.querySelector(".modal");o.closeModal(l)}))},projectFormButtonEvent:function(e){e.addEventListener("click",(()=>{const e=document.getElementsByClassName("input-field");let n=[],i={};for(let t=0;t<e.length;t++)n.push(e[t].value),i[t]=n[t];let c=new t(i);d.addTodoList(c),m.renderNewProject(c);const a=document.querySelector(".modal");o.closeModal(a)}))}},c=o,a=function(){let e,t;return{renderSubContainerHeader:function(){e=document.createElement("div"),e.id="subContainerHeader",subContainer.appendChild(e),t=document.createElement("p"),t.id="subContainerTitle",t.className="defaultList",t.textContent="Eingang",e.appendChild(t)},setSubContainerTitle:function(e){t.textContent=e},setSubContainerTitleClassName:function(e){t.className=e}}}(),r={renderListItem:function(e,t){let n=document.querySelector(`.${e}`),d=document.createElement("div");d.id=e+t.index;let o=[],i=document.createElement("p");i.id="checkbox"+t.index,o.push(i);let c=document.createElement("p");c.id="itemTitle"+t.index,c.textContent=t.title,o.push(c);let a=document.createElement("p");a.id="editBtn"+t.index,o.push(a);let r=document.createElement("p");r.id="timingBtn"+t.index,o.push(r);let l=document.createElement("p");l.id="notesBtn"+t.index,o.push(l);let s=document.createElement("p");s.id="moveListBtn"+t.index,o.push(s);let m=document.createElement("p");m.id="deleteBtn"+t.index,o.push(m),o.forEach((e=>{d.appendChild(e)}));const u=document.querySelector("#newTodoDiv");null!=u?n.insertBefore(d,u):n.appendChild(d)},renderNewTodoButton:function(){const e=document.querySelector("#subContainerTitle"),t=document.createElement("div");t.id="newTodoDiv";const n=document.createElement("p");n.id="plusSymbol",n.textContent="+";const d=document.createElement("p");d.id="newTodo",d.textContent="Aufgabe hinzufügen",t.appendChild(n),t.appendChild(d),e.appendChild(t)},removeNewTodoButton:function(){document.querySelector("#newTodoDiv").remove()}},l=function(){document.querySelector("#newTodoDiv").addEventListener("click",(()=>{const e=document.querySelector("#modal");c.openModal(e),c.renderNewTodoModal()}))},s=function(){let e;function t(t,n,d){(t=document.createElement("p")).id=n,t.classList.add("todoList"),t.textContent=d,e.appendChild(t)}return{renderSideBar:function(){e=document.createElement("div"),e.id="listsContainer",sidebar.appendChild(e),t(void 0,"defaultList","Eingang"),t(void 0,"todayList","Heute"),t(void 0,"upcomingList","Demnächst")},createSidebarItem:t}}(),m=function(){let e,t;return{renderProjectsSidebar:function(){e=document.createElement("div"),e.id="projectsContainer",sidebar.appendChild(e),function(){const t=document.createElement("p");t.id="projectsTitle",t.textContent="Projekte",e.appendChild(t)}(),t=document.createElement("div"),t.id="projectsList",e.appendChild(t),function(){const e=document.createElement("div");e.id="newProjectDiv";const n=document.createElement("p");n.id="plusProject",n.textContent="+";const d=document.createElement("p");d.id="newProject",d.textContent="neues Projekt",e.appendChild(n),e.appendChild(d),t.appendChild(e)}()},renderNewProject:function(e){let n=document.createElement("p");n.id=e.nameDOM,n.classList.add("todoList"),n.textContent=e.visibleName,t.appendChild(n),u.renderListTitleEvent(),u.renderListItemsEvent(),u.manageNewTodoButtonEvent()}}}(),u=function(){let e=document.getElementsByClassName("todoList");function t(){e=document.getElementsByClassName("todoList");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{a.setSubContainerTitle(e.target.textContent),a.setSubContainerTitleClassName(e.target.id)}))}function n(){document.querySelector("#newProjectDiv").addEventListener("click",(()=>{const e=document.querySelector("#modal");c.openModal(e),c.renderNewProjectModal()}))}function o(){for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{const t=document.querySelector("#newTodoDiv");"defaultList"!=e.target.id&&null!=t&&r.removeNewTodoButton(),"todayList"!=e.target.id&&"upcomingList"!=e.target.id&&null===t&&(r.renderNewTodoButton(),l())}))}function i(){for(let t=0;t<e.length;t++)e[t].addEventListener("click",(e=>{d.getTodoLists().forEach((t=>{t.nameDOM===e.target.id&&t.items.forEach((t=>{r.renderListItem(e.target.id,t)}))}))}))}return{renderListTitleEvent:t,newProjectButtonEvents:n,manageNewTodoButtonEvent:o,renderListItemsEvent:i,addSidebarEvents:function(){t(),n(),o(),i()}}}();e.renderPageFrame(),s.renderSideBar(),m.renderProjectsSidebar(),a.renderSubContainerHeader(),r.renderNewTodoButton(),u.addSidebarEvents(),l(),c.renderModalFrame(),function(){let e=new t({0:"Eingang"});e.nameDOM="defaultList";let n=new t({0:"Heute"});n.nameDOM="todayList";let o=new t({0:"Demnächst"});o.nameDOM="upcomingList",d.addTodoList(e),d.addTodoList(n),d.addTodoList(o)}()})();