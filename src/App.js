import React from "react"

import "./style/style.css"
import "./style/editor.css"

import Header  from "./Components/Header"
import Card    from "./Components/Card"
import Add     from "./Components/Add"
import Editor  from "./Components/Editor"

function App() {
    const [toggleEditor , setToggleEditor]    = React.useState(false)
    const [cards , setCards ]                 = React.useState(JSON.parse(localStorage.getItem("NoteCards")) || [] )
    const [searchCards , setSearchCards]      = React.useState([...cards])
    const [openCard , setOpenCard]            = React.useState([])
    const [togglePrompt , setTogglePrompt]    = React.useState(false)


    const cardArr = [...searchCards] 
    const cardComponents = cardArr.map(card => {
      return <Card card={{...card}} key={card.id} ToggleEditor={ToggleEditor} TogglePrompt={TogglePrompt} />
    })

    
    function ToggleEditor(title='' , describe='', uuid=null){
      setOpenCard([title , describe, uuid])
      setToggleEditor(!toggleEditor)
    }

    function TogglePrompt(bool){
      setTogglePrompt(bool)  // null is false and id is true
    }

    function AddCard(card){
      if(!card) return;
      let newCard = true
      let cardsFilter = cards.map(_card => {
        if(_card.id === card.id){
          newCard = false
          return card
        }
        return _card;
      })

      if(newCard) cardsFilter.push(card)

      localStorage.setItem("NoteCards", JSON.stringify(cardsFilter))
      
      setSearchCards( [...cardsFilter] )
      
      setCards( [...cardsFilter] )
    }

    function SearchNote(search){
      let searchCard = cards.filter(card => (card.title.includes(search) || card.describe.includes(search) || card.date.toString().includes(search)) )
      setSearchCards(cards =>{
        return [...searchCard]
      })
    }

    function DeleteNote(card_id){
      const newCards = cards.filter(card => {
        if(card.id !== card_id) return card;
      })

      localStorage.setItem("NoteCards", JSON.stringify(newCards))
      setSearchCards([...newCards])
      setCards([...newCards])
      setTogglePrompt(false)
    }

       

    return (
      <div className="root-container">
        <Header Search={SearchNote} togglePrompt={togglePrompt} TogglePrompt={TogglePrompt} DeleteNote={DeleteNote}/>
        <div className="card--main--container">
          {cardComponents}
        </div>
        <Add ToggleEditor={ToggleEditor}/>    
        {toggleEditor && <Editor  ToggleEditor={ToggleEditor} AddCard={AddCard} content={openCard} /> }   
      </div>
    );
}

export default App;
