import React from "react";

export default function DetailedPaste({ shownPaste }) {
    return (
        <div>
            <h1>{shownPaste?.title}</h1>
            {shownPaste?.labels?.map((l) => (
                <h4>{l}</h4>
            ))}
            <br />
            <span>{shownPaste?.content}</span>
            <br />
            <b>{shownPaste?.date}</b>, by <b>{shownPaste?.author}</b>
            <br />
            <br />
            {Number(shownPaste?.santimate).toFixed(2) == 2.0
                ? "no santimate"
                : "santimate:" + Number(shownPaste?.santimate).toFixed(1)}
            <br />
        </div>
    );
}
