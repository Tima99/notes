import React from 'react';
import "../style/card.css"
import ReactHtmlParser from "html-react-parser";


function Card({card, ToggleEditor, TogglePrompt}) {
    
  return (
      <div className="card--container" onClick={(e)=>{ ToggleEditor(card.titleHtml , card.describeHtml, card.id); } }>
          <div className="card--head">
              <h2 className="card--title">{ReactHtmlParser(card.titleHtml)}</h2>
              <span className="card--date-time">{card.date}
              <button className='card--delete' onClick={(e)=>{TogglePrompt(card.id); e.stopPropagation();}}>❌</button>
              </span>
          </div>

          <div className='card--description'>
              {ReactHtmlParser(card.describeHtml)}
          </div>
      </div>
  );
}

export default Card;
