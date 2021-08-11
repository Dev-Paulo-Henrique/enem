import '../styles/play.scss'
import { useAuth } from '../hooks/useAuth'

export function Play() {
  const { user } = useAuth()

  return (
    <div id="page-play">
      <header>
        <div className="content">
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : ('')}
          </div>
          <div className="play">Play</div>
        </div>
      </header>
    
    </div>

  );
}