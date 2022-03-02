import React from "react";

export default function DetailedPaste({ shownPaste }) {
    return (
        <div>
            <h1>{shownPaste?.title}</h1>{shownPaste?.labels?.map((l) => <h4>{l}</h4>)}
            <br />
            <p>{shownPaste?.content}</p>
            <br />
            <b>{shownPaste?.date}</b>, by <b>{shownPaste?.author}</b>
            <br />
            <br />
            santimate:{Number(shownPaste?.santimate).toFixed(2)}
            <br />
        </div>
    );
}
