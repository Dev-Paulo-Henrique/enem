import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button';
import { useParams, useHistory } from 'react-router-dom'

export function Play() {
  const history = useHistory()
  const { user } = useAuth()

  async function handleEndRoom() {
    await  history.push('/main/play')
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
          <Button onClick={handleEndRoom}>Play</Button>
        </div>
      </header>
      <div className="matter">
        <nav>
          <ul>
            <li>Ciências da Natureza</li>
            <li>Ciências Humanas</li>
            <li>Linguagens, Códigos e suas Tecnologias</li>
            <li>Matemática e suas tecnologias</li>
            <li>Redação</li>
          </ul>
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