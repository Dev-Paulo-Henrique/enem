import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button';

export function Room() {
  const {user} = useAuth()

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : ('') }
          </div>
          <Button>Play</Button>
        </div>
      </header>
      <fieldset className="fieldset">
      <ul>
      <li className="main">
        <h1>TIPO</h1>
        <strong>TÍTULO</strong>
        <div className="fav">❤</div>
        <p>Texto</p>
        {user?.name}
        
      </li>
      <li className="main">
        <h1>TIPO</h1>
        <strong>TÍTULO</strong>
        <div className="fav">❤</div>
        <p>Texto</p>
        {user?.name}
        
      </li>
      <li className="main">
        <h1>TIPO</h1>
        <strong>TÍTULO</strong>
        <div className="fav">❤</div>
        <p>Texto</p>
        {user?.name}
        
      </li>
      <li className="main">
        <h1>TIPO</h1>
        <strong>TÍTULO</strong>
        <div className="fav">❤</div>
        <p>Texto</p>
        {user?.name}
        
      </li>
      </ul>
      
      </fieldset>
      <div className="aside">oi</div>
      </div>
    
  );
}