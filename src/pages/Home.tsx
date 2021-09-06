import { useHistory } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import gif from '../assets/images/animation_500_kry1cpvo.gif'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const history = useHistory();
  const { user, signInWithGogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGogle()
    }
    await history.push('/main/')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={gif} alt="" />
        <h2>Plataforma <br /> Autodidata</h2>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <div className="separator">Login</div>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Entre com o Google
          </button>

        </div>
      </main>
    </div>
  )
}