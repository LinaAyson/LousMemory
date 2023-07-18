import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// Matched property
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]


function App() {
  const [cards, setCards] = useState([]) // Tom array
  const [turns, setTurns] = useState(0)
  const [valEtt, setValEtt] = useState(null)
  const [valTva, setValTva] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Blanda korten, dubbla korten, random id
  const shuffleCards = () => {
    // Array av blandade kort med ID property
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setValEtt(null)
    setValTva(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  // Funktion handleChoice
  const handleChoice = (card) => {
    valEtt ? setValTva(card) : setValEtt(card)
  }

  // Jämför 2 valda kort
  useEffect(() => {
    if (valEtt && valTva) {
      setDisabled(true)

      if (valEtt.src === valTva.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === valEtt.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [valEtt, valTva])
  console.log(cards)


  // Reset choices and increase turn
  const resetTurn = () => {
    setValEtt(null)
    setValTva(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Starta nytt spel automatiskt
  useEffect(() => {
    shuffleCards()

  }, [])

  return (
    <div className="App">
      <h1>Lous Memory</h1>
      <button onClick={shuffleCards}>Nytt spel</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === valEtt || card === valTva || card.matched}
            disabled={disabled}
          />

        ))}
      </div>
      <p>Omgångar: {turns} </p>
      <p className="p-score">Högsta poäng är 6 omgångar</p>
    </div>
  );
}

export default App;

