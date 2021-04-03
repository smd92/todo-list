const subContainerHeader = (function() {

    let subContainerHeader;
    let subContainerTitle;

    function createSubContainerHeader() {
        subContainerHeader = document.createElement("div");
        subContainerHeader.id = "subContainerHeader";

        subContainer.appendChild(subContainerHeader);
    }

    function createSubContainerTitle() {
        subContainerTitle = document.createElement("p");
        subContainerTitle.id = "subContainerTitle";
        subContainerTitle.textContent = "Eingang";

        subContainerHeader.appendChild(subContainerTitle);
    }

    function setSubContainerTitle(text) {
        subContainerTitle.textContent = text;
    }

    function renderSubContainerHeader() {
        createSubContainerHeader();
        createSubContainerTitle();
    }

    return {
        renderSubContainerHeader,
        setSubContainerTitle
    };
})();

export default subContainerHeader;