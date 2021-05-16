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

    const builtBy = document.createElement("div");
    builtBy.id = "builtBy";

    const gitHubLink = document.createElement("a");
    gitHubLink.id = "gitHubLink";
    gitHubLink.setAttribute("href", "https://github.com/smd92");
    gitHubLink.setAttribute("target", "_blank");

    const gitHubLogo = document.createElement("img");
    gitHubLogo.id = "gitHubLogo";
    gitHubLogo.setAttribute("src", "./img/GitHub-Mark-Light-32px.png");

    header.appendChild(pageTitle);
    builtBy.appendChild(gitHubLink);
    gitHubLink.appendChild(gitHubLogo);
    header.appendChild(builtBy);
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
