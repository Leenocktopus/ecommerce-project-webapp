import React from "react";

const PageControl = ({setCurrentLink, links}) => {
    return(
        <>
            <button className={"admin-prev-button right-bottom-grid"}
                    onClick={() => setCurrentLink(links.prev)} disabled={links.prev === null}>Previous
            </button>
            <button className={"admin-next-button left-bottom-grid"}
                    onClick={() => setCurrentLink(links.next)} disabled={links.next === null}>Next
            </button>
        </>
    )
}
export default PageControl