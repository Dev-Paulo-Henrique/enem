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
      <div className="main-content">
      <main className="main">
        <h1>TIPO</h1>
      <strong>TÍTULO</strong>

        {user?.name}
        
      </main>
      <aside>o</aside>
      </div>
    </div>
    
  );
}