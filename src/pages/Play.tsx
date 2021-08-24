import '../styles/play.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useRoom } from '../hooks/useRoom'
import { Question } from '../components/Question'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

type RoomParams = {
  id: string;
}


export function Play() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id
  const { questions } = useRoom(roomId)

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
    }


    await database.ref(`question `).push(question)
    setNewQuestion('')
  }

  return (
    <>
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
            <div className="play">Pular</div>
          </div>
        </header>
        <main>
          <p> Brasil, Alemanha, Japão e Índia pedem reforma do Conselho de Segurança

            Os representantes do G4 (Brasil, Alemanha, Índia e Japão) reiteraram, em setembro  de 2018, a defesa pela ampliação do Conselho de Segurança da Organização das  Nações Unidas (ONU) durante reunião em Nova York (Estados Unidos). Em declaração conjunta, de dez itens, os chanceleres destacaram que o órgão, no formato em que está, com apenas cinco membros permanentes e dez rotativos, não reflete o século 21.   “A reforma do Conselho de Segurança é essencial para enfrentar os desafios complexos de hoje. Como aspirantes a novos membros permanentes de um conselho reformado, os ministros reiteraram seu compromisso de trabalhar para fortalecer o funcionamento da ONU e da ordem multilateral global, bem como seu apoio às respectivas candidaturas”, afirma a declaração conjunta.

            Os países mencionados no texto justificam sua pretensão com base na seguinte característica comum:</p>
          <div className="alt">
            <div className="a">
              <input type="radio" name="alt" id="a" />
              <label htmlFor="">Extensividade de área territorial.</label>
            </div>
            <div className="b">
              <input type="radio" name="alt" id="b" />
              <label htmlFor="">Protagonismo em escala regional.</label>
            </div>
            <div className="c">
              <input type="radio" name="alt" id="c" />
              <label htmlFor="">Investimento em tecnologia militar.</label>
            </div>
            <div className="d">
              <input type="radio" name="alt" id="d" />
              <label htmlFor=""> Desenvolvimento de energia nuclear.</label>
            </div>
            <div className="e">
              <input type="radio" name="alt" id="e" />
              <label htmlFor="">Disponibilidade de recursos minerais.</label>
            </div>
                <Button>Enviar</Button>
          </div>
        </main>
      </div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src='' alt="Letmeask" />
            <RoomCode code={roomId} />
          </div>
        </header>

        <main className="content">
          <div className="room-title">
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <div className="form-footer">
              <Button type="submit" disabled={!user}>Enviar pergunta</Button>
            </div>
          </form>
          <div className="question-list">
            {questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                </Question>
              )
            })}
          </div>
        </main>
      </div>
    </>
  );
}