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
            <div className="content">
              <div className="together">
              <div className="background"></div>
            <h1 className="type">Linguagens, Códigos e suas Tecnologias</h1>
              </div>
            <div className="heart"></div>
            </div>
            <strong className="title">Inglês</strong>
            <p className="text">In ancient Rome, there was the habit of celebrating the birthday of a person. There weren’t parties like we know today, but cakes were prepared and offers were made. Then, the habits of wishing happy birthday, giving gifts and lighting candles became popular as a way to protect the birthday person from devils and ensure good things to the next year in the person’s life. The celebrations only became popular like we know today after fourteen centuries, in a collective festival performed in Germany.</p>
          </li>
        </ul>

      </fieldset>

    </div>

  );
}