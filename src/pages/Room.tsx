import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth'
//import { useRoom } from '../hooks/useRoom'
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom'
import { auth, database } from '../services/firebase'
import { useEffect, useState } from 'react';
import { Question } from '../components/Question';
import { List } from '../components/List';

type FirebaseQuestions = Record<string, {
  Id: string;
  Photo: string;
  type: string;
  title: string;
  createdAt: string;
  content: string;
  author: string;
  authorId: string;
}>

type QuestionType = {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  author: string;
  authorId: string;
}


export function Room() {
  const history = useHistory()
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`all`)//criar outra camada
    //console.log(roomRef.key)
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom ?? {}


      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          content: value.content,
          type: value.type,
          author: value.author,
          createdAt: value.createdAt,
          authorId: value.authorId,
        }
      })
      setQuestions(parsedQuestion)
    })

    return () => {
      roomRef.off('value')
    }
  }, [user?.name])

  async function play() {
    await history.push(`/play/`)
  }

  async function admin() {
    await database.ref(`users/${user?.id}`).update({
      admin: {
        Name: user?.name,
        Photo: user?.avatar,
        Email: auth.currentUser?.email
      }
    })
    await history.push(`/admin/`)
  }

  async function exit() {
    auth.signOut().then(() => {
      console.log('Usuário desconectado')
    })
    await history.push('/')
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
        <List />
        <div className="xp">
          <aside>
            <div className="background"></div>
            <a href="/fav">Favoritos</a>
          </aside>
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
              author={question.author}
              createdAt={question.createdAt}
              authorId={question.authorId}
            />
          )
        })}
      </fieldset>
    </div>

  );

}