import React from "react";

function Header({Search, togglePrompt, TogglePrompt, DeleteNote}) {
    // TODO : Header logo | utilities
    // * bold - text decoration
    // * font size

    return (
        <div className="header--container">
            <h1 className="header--logo header-content">Notes</h1>
            <form className="header--search header-content">
                <input type="search" name="saerch" id="search" placeholder="Typing..." onChange={(e)=>Search(e.target.value)}/>
            </form>
            {
                togglePrompt && 
            <div className="prompt-box-container">
                <div className="header--prompt-box">
                    <span className="prompt-box--msg">Do you want to remove note?</span>
                    <div className="prompt-box--buttons">
                        <button className="button-yes" onClick={()=>DeleteNote(togglePrompt)}>Yes</button>
                        <button className="button-no" onClick={()=>TogglePrompt(null)}>No</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Header;
