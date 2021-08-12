import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom'

export function Room() {
  const history = useHistory()
  const { user } = useAuth()

  async function play() {
    await  history.push(`/play/`)
  }

  return (
    <div id="page-room">
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
          <Button onClick={play}>Play</Button>
        </div>
      </header>
      <div className="matter">
        <nav>
            <a href="https://">Ciências da Natureza</a>
            <a href="https://">Ciências Humanas</a>
            <a href="https://">Liguagens, Códigos e suas Tecnologias</a>
            <a href="https://">Matemática e suas tecnologias</a>
            <a href="https://">Redação</a>
        </nav>
        <aside>Experience</aside>
      </div>
      <fieldset>
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

    </div>

  );
}