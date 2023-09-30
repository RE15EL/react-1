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



export function App() {
  const format = (username)=>`@${username}`; //funcion que se pasa como una props
  const turns = { x:"X", o:"O"};
  // const board= Array(9).fill(null);

  //estados
  const [turn, setTurn] = useState(turns.x);
  const [board, setBoard] = useState(Array(9).fill(null));

  //updateBoard
  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === turns.x? turns.o : turns.x);
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);
  }

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
