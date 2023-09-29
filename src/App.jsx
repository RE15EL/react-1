import './App.css'
import {TwitterFollowCard} from './shared/components/TwitterFollowCard/TwitterFollowCard.jsx'

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

export function App() {
  const format = (username)=>`@${username}`; //funcion que se pasa como una props
  
  return (
    <section className='twitterFollowCard-container'>
      { /* para cade usuario se renderizar el componenete TwitterFollowCard 
      la key={ username } debe ser el id del user en la BD o un campo unico*/}
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
  );
}
