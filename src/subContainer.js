const subContainerHeader = (function() {

    let subContainerHeader;

    function createSubContainerHeader() {
        subContainerHeader = document.createElement("div");
        subContainerHeader.id = "subContainerHeader";

        subContainer.appendChild(subContainerHeader);
    }

    function renderSubContainerHeader() {
        createSubContainerHeader();
    }

    return { renderSubContainerHeader };
})();

export default subContainerHeader;