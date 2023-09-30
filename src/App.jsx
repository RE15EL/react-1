import './App.css'
import {TwitterFollowCard} from './shared/components/TwitterFollowCard/TwitterFollowCard.jsx'
import { useState } from 'react';


//users API response
const users = [
  {
    name:'Reisel Valle',
    username:'RE15EL',
    isFollowing: false
  },
  {
    name:'Miguel Angel Duran',
    username:'midudev',
    isFollowing: true
  },
  {
    name:'Pedro Gonzalez',
    username:'pedri01',
    isFollowing: false
  },
  {
    name:'Laura Garcia',
    username:'lola',
    isFollowing: false
  }
];

//componente Square
const Square= ( {children, updateBoard, index, isSelected=false} ) => {
  const squareClassName = `square ${isSelected ? 'selected' : ''}`;
  
  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div className={squareClassName} onClick={handleClick}>
      {children}
    </div>
  )
} 

//winner combis
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

export function App() {
  const format = (username)=>`@${username}`; //funcion que se pasa como una props
  const turns = { x:"X", o:"O"};
  // const board= Array(9).fill(null);

  //estados
  const [turn, setTurn] = useState(turns.x);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  //CHECK WINNER  
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo;
      if(
          boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] && 
          boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a];
      }
    }
    //no winner
    return null;
  }

  //updateBoard
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === turns.x? turns.o : turns.x);
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
      setWinner(false);//empate
    }
  }

  //reset game
  const resetGame = () => {
    setWinner(null);
    setBoard(Array(9).fill(null));
    setTurn(turns.x);
  }

  //revisar si hay empate
  const checkEndGame = (boardToCheck) => boardToCheck.every(cell => cell !== null);

  return (
    <div className="container">
      <>
        <section className='card board'>
          <h1 className='title'>Tic-Tac-Toe 👌👌</h1>
          <div className="game">            
              {
                board.map((_, index)=>{
                  return (
                    <Square 
                      key={index} 
                      index={index}
                      updateBoard={updateBoard}  
                    >
                      {board[index]}
                    </Square>
                  )
                })
              }
            </div>  
          <div className="turn">
              <Square isSelected={turn === turns.x}> {turns.x} </Square>            
              <Square isSelected={turn === turns.o}> {turns.o} </Square>           
          </div>

          {
            winner !== null && (
              <section className='winner'>   
                <div className="text">
                  <h2>
                    {
                      winner === false
                      ? 'Empate'  
                      : `Ganador`
                    }
                  </h2>
                  <header className="win">
                    { winner && <Square> {winner} </Square>}
                  </header>
                  <footer>
                    <button className='reset' onClick={resetGame}> Reiniciar </button>
                  </footer>
                </div>
              </section>
            )
          }
        </section>

        <section className='card twitterFollowCard-container'>
          { /* para cade usuario se renderizar el componenete TwitterFollowCard 
          la key={ username } debe ser el id del user en la BD o un campo unico*/}
          <h1 className='title'> twitterFollowCard </h1>
          {
            users.map( ({ name, username, isFollowing }) => (
              <TwitterFollowCard 
                key={ username }
                formatUsername={ format } 
                name={name}
                username={username}
                initialIsFollowing={isFollowing}
              /> 
            ))
          }          
            
        </section>
      </>
    </div>
    
  );
}
