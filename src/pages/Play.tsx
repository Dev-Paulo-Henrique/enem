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
      <main>
        <p>questao</p>
        <div className="alt">
        <div className="a">
        <input type="checkbox" name="a" id="a" />
        <label htmlFor="">oi</label>
        </div>
        <div className="b">
        <input type="checkbox" name="b" id="b" />
        <label htmlFor="">oi</label>
        </div>
        <div className="c">
        <input type="checkbox" name="c" id="c" />
        <label htmlFor="">oi</label>
        </div>
        <div className="d">
        <input type="checkbox" name="d" id="d" />
        <label htmlFor="">oi</label>
        </div>
        <div className="e">
        <input type="checkbox" name="e" id="e" />
        <label htmlFor="">oi</label>
        </div>
        
        </div>
        </main>
    </div>

  );
}