import './TwitterFollowCard.css'
import { useState } from 'react';

export function TwitterFollowCard({name="Unknow", username="unknow", initialIsFollowing, formatUsername}) {  
  
    //crear estado isFollowing tomando como valor inicial la props initialIsFollowing
    const [ isFollowing, setIsFollowing] = useState(initialIsFollowing);
    
    //funcion que actualiza el estado
    const handleClick = ()=>{
      setIsFollowing(!isFollowing)
    }

    //modificar texto y estilos dinamicamente
    const followText = isFollowing ? 'Siguiendo':'Seguir';
    const btnClasName = isFollowing 
      ? 'tw-followCard-actionBtn is-following'
      : 'tw-followCard-actionBtn';

    return (
      <article className='tw-followCard'>
        <header className='tw-followCard-header'> 
          <img 
            className='tw-followCard-avatar'
            src={`https://unavatar.io/${username}`} 
            alt="avatar midu" 
          />
          <div className='tw-followCard-info'>
            <strong> {name} </strong>
            <span className='tw-followCard-info-username'> 
              { formatUsername(username) } 
            </span>
          </div>
        </header>
        <aside>
          <button 
            className={ btnClasName }
            onClick={ handleClick }
          > 
            <span className="tw-followCard-followText"> {followText} </span> 
            <span className="tw-followCard-stopFollow" > Dejar de seguir </span> 
          </button>
        </aside>
      </article>
    );
  }