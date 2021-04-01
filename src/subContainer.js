const subContainerHeader = (function() {

    let subContainerHeader;

    function createSubContainerHeader() {
        subContainerHeader = document.createElement("div");
        subContainerHeader.id = "subContainerHeader";

        subContainer.appendChild(subContainerHeader);
    }

    function setSubContainerTitle(text) {
        const subContainerTitle = document.createElement("p");
        subContainerTitle.id = "subContainerTitle";
        subContainerTitle.textContent = text;

        subContainerHeader.appendChild(subContainerTitle);
    }

    function renderSubContainerHeader() {
        createSubContainerHeader();
    }

    return {
        renderSubContainerHeader,
        setSubContainerTitle
    };
})();

export default subContainerHeader;