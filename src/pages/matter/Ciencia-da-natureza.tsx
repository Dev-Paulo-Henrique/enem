import '../../styles/room.scss'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { useEffect, useState } from 'react';
import { Question } from '../../components/Question';

type FirebaseQuestions = Record<string, {
  type: string;
  title: string;
  content: string;
  author: string;
}>

type QuestionType = {
  id: string;
  title: string;
  content: string;
  type: string;
  author: string;
}


export function CN() {
  const { user } = useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const name = "Ciências da Natureza"

  useEffect(() => {
    const roomRef = database.ref(`${user?.name}/matter/${name}`)//criar outra camada
    if(roomRef.key === name){
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      
      const firebaseQuestions: FirebaseQuestions = databaseRoom  ??  {}

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          content: value.content,
          type: value.type,
          author: value.author,
        }
      })
      setQuestions(parsedQuestion)
    })}
    return () => {
      roomRef.off('value')
    }
  }, [ user?.name])

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
        <nav>
        <div className="together">
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
            author={question.author}
            />
              )
            })}
      </fieldset>
    </div>

  );

}