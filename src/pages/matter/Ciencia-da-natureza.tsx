import '../../styles/room.scss'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { useEffect, useState } from 'react';
import { Question } from '../../components/Question';
import { List } from '../../components/List/index';

type FirebaseQuestions = Record<string, {
  type: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
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


export function CN() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const name = "Ciências da Natureza"

  useEffect(() => {
    const roomRef = database.ref(`users/${user?.name}/matter/${name}`)//criar outra camada
    if (roomRef.key === name) {
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
    }
    return () => {
      roomRef.off('value')
    }
  }, [user?.name])

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
        </div>
      </header>
      <div className="matter">
        <List />
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