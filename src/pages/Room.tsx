import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
//import { useRoom } from '../hooks/useRoom'
import { Button } from '../components/Button';
import { useHistory} from 'react-router-dom'
import { auth, database } from '../services/firebase'
import { useEffect, useState } from 'react';
import { Question } from '../components/Question';

type FirebaseQuestions = Record<string, {
  Id: string;
  Photo: string;
  type: string;
  title: string;
  content: string;
}>

type QuestionType = {
  id: string;
  title: string;
  content: string;
  type: string;
}


export function Room() {
  const history = useHistory()
  const { user } = useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`all`)//criar outra camada
    //console.log(roomRef.key)
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom  ??  {}
      

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          content: value.content,
          type: value.type
        }
      })
      //console.log(parsedQuestion)
      setQuestions(parsedQuestion)
      //console.log(databaseRoom.admin)
     //return console.log(JSON.stringify({databaseRoom}))
    })
    
    return () => {
      roomRef.off('value')
      //console.log(roomRef)
    }
  }, [ user?.name])

  async function play() {
    await  history.push(`/play/`)
  }

  async function admin() {
    await database.ref(`${user?.name}`).update({
      //Name: user?.name,
      admin:{
        Id: user?.id,
        Photo: user?.avatar
      }
    })
    await  history.push(`/admin/`)
  }

  async function exit() {
    auth.signOut().then(() => {
     console.log('Usuário desconectado')
    })
   await  history.push('/')
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
          <div className="btn">
          <Button onClick={play} disabled={!user}>Play</Button>
          <Button onClick={admin} disabled={!user}>Publish</Button>
          <Button onClick={exit} disabled={!user}>Sair</Button>
          </div>
        </div>
      </header>
      <div className="matter">
        <nav>
        <div className="together">
        <h1>Meus envios</h1>
        <div className="content">
        <div className="background one"></div>
            <a href="/matter/ciencias-da-natureza">
              Ciências da Natureza
              </a>
              </div>
              <div className="content">
              <div className="background three"></div>
            <a href="/matter/liguagens-codigos-e-suas-tecnologias">
              Liguagens, Códigos e suas Tecnologias
              </a>
              </div>
              <div className="content">
              <div className="background two"></div>
            <a href="/matter/ciencias-humana">
              Ciências Humanas
              </a>
              </div>
              <div className="content">
              <div className="background four"></div>
            <a href="/matter/matematica-e-suas-tecnologias">
              Matemática e suas tecnologias
              </a>
              </div>
              <div className="content">
              <div className="background five"></div>
            <a href="/matter/redacao">
              Redação
              </a>
              </div>
              </div>
        </nav>
        <div className="xp">
        <aside>
        <div className="background"></div>
          Experience
          </aside>
          <div className="load">
          <div className="loading">
          <div className="indicator"></div>
          </div>
          
          </div>
         <div className="space">
         <span className="zero">0</span>
         <span className="hundred">100</span>
         </div>
        </div>
      </div>
      <fieldset>
      {questions.map(question => {
              return (
                <Question
            key={question.id}
            content={question.content}
            title={question.title}
            type={question.type}
            id={question.id}
            />
              )
            })}
      </fieldset>
    </div>

  );

}