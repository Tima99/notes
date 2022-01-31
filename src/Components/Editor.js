import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { v4 as uuidv4 } from "uuid";

function Editor({
    ToggleEditor,
    AddCard,
    content: [titleHtml, describeHtml, uuid],
}) {
    const [fontSize, setFontSize]   = useState(18);
    const setFontInput              = useRef();
    const editNote                  = useRef();
    const editNoteTitle             = useRef();

    function SetFont(e) {
        e.preventDefault();
        setFontSize(setFontInput.current.value);
    }

    let activeFontSizeBtn;
    let activeAlignBtn;

    useEffect(() => {
        activeFontSizeBtn   = document.querySelector(".defaultFont");
        activeAlignBtn      = document.querySelector("#justifyLeft");

        if(uuid) HideEditorMenu(document.querySelector('.arrow-btn'))
    }, []);

    function StyleText(e) {
        document.execCommand(e.target.id, false, e.target.value);
    }

    function FontSize(e) {
        e.target.classList.add("active-btn");
        activeFontSizeBtn != e.target &&
            activeFontSizeBtn.classList.remove("active-btn");
        activeFontSizeBtn = e.target;

        document.execCommand(e.target.name, false, e.target.value);
    }

    function AlignText(e) {
        if (!e.target) return;
        e.target.classList.toggle("active-btn");
        activeAlignBtn != e.target &&
            activeAlignBtn.classList.remove("active-btn");
        activeAlignBtn = e.target;

        document.execCommand(e.target.id);
    }

    function SaveNote() {
        if( !(editNote.current.innerText && editNoteTitle.current.innerText) ) return;

        const card = {
            id: uuid || uuidv4(),
            date: new Date().toDateString(),
            titleHtml: editNoteTitle.current.innerHTML,
            describeHtml: editNote.current.innerHTML,
            title: editNoteTitle.current.innerText,
            describe: editNote.current.innerText,
        };


        AddCard(card);
        ToggleEditor();
    }

    function HideEditorMenu(e){
        document.querySelector('.editor--utilities').classList.toggle('hide')
        e.target ?
        e.target.classList.toggle('arrow-btn-rotate')
        : e && e.classList.toggle('arrow-btn-rotate')
    }
    

    return (
        <div className="editor--container">
            <div className="editor--utilities">
                <div className="utilities--font-size">
                    <input
                        type="number"
                        name="fontSize"
                        value={fontSize}
                        onChange={SetFont}
                        id="fontSize"
                        ref={setFontInput}
                    />
                </div>
                <div className="utilities--decoration">
                    <button onClick={StyleText} id="bold">
                        B
                    </button>
                    <button onClick={StyleText} id="italic">
                        I
                    </button>
                    <button onClick={StyleText} id="underline">
                        U
                    </button>
                    <input
                        type="color"
                        name="color"
                        id="foreColor"
                        onClick={StyleText}
                    />
                    <button value={7} name="fontSize" onClick={FontSize}>
                        H1
                    </button>
                    <button value={5} name="fontSize" onClick={FontSize}>
                        H2
                    </button>
                    <button value={4} name="fontSize" onClick={FontSize}>
                        H3
                    </button>
                    <button
                        value={3}
                        name="fontSize"
                        onClick={FontSize}
                        className="active-btn defaultFont"
                    >
                        H4
                    </button>
                </div>
                <div className="utilities--alignment">
                    <button
                        onClick={AlignText}
                        id="justifyLeft"
                        className="active-btn"
                    >
                        L &nbsp;
                    </button>
                    <button onClick={AlignText} id="justifyCenter">
                        C&nbsp;
                    </button>
                    <button onClick={AlignText} id="justifyRight">
                        R&nbsp;
                    </button>
                </div>
                <div className="utilities--save">
                    <button type="Save" onClick={SaveNote}>
                        Save
                    </button>
                    <button type="cancel" onClick={ToggleEditor}>❌</button>
                </div>
            </div>

            <div className="editor--edit">
                <div
                    name="editNote"
                    id="editNoteTitle"
                    style={{ fontSize: `${22}px` }}
                    contentEditable="true"
                    key="2"
                    spellCheck="false"
                    suppressContentEditableWarning={true}
                    ref={editNoteTitle}
                >
                    {(typeof titleHtml == "string" && ReactHtmlParser(titleHtml)) || 'Title...'}
                </div>

                <div
                    name="editNote"
                    id="editNote"
                    style={{ fontSize: `${fontSize}px` }}
                    contentEditable="true"
                    key="1"
                    suppressContentEditableWarning={true}
                    spellCheck="false"
                    ref={editNote}
                >
                    {typeof describeHtml == "string" &&
                        ReactHtmlParser(describeHtml)}
                </div>
            </div>

            <div className="arrow-btn" onClick={HideEditorMenu}>🔻</div>
        </div>
    );
}

export default Editor;
