const pageFrame = (function () {
  const main = document.querySelector("#main");
  let header;
  let container;
  let sidebar;
  let subContainer;

  function createHeader() {
    header = document.createElement("div");
    header.id = "header";

    main.appendChild(header);
  }

  function populateHeader() {
    const pageTitle = document.createElement("p");
    pageTitle.id = "pageTitle";
    pageTitle.classList.add("headerItem");
    pageTitle.textContent = "ToDo-List by smd92";

    header.appendChild(pageTitle);
  }

  function createContainer() {
    container = document.createElement("div");
    container.id = "container";

    main.appendChild(container);
  }

  function createSidebar() {
    sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    container.appendChild(sidebar);
  }

  function createSubContainer() {
    subContainer = document.createElement("div");
    subContainer.id = "subContainer";

    container.appendChild(subContainer);
  }

  function renderPageFrame() {
    createHeader();
    populateHeader();
    createContainer();
    createSidebar();
    createSubContainer();
  }

  return {
    renderPageFrame,
    sidebar,
  };
})();

export default pageFrame;
