import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import '../styles/admin.scss'
//import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const {user} = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [newType, setNewType] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const params = useParams<RoomParams>()
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
      type: newType,
      title: newTitle,
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
    }


    await database.ref(`question`).push(question)
    setNewQuestion('')
  }
  
  return (
    <div id="page-room">
    <header>
      <div className="content">
      {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : ('')}
      </div>
    </header>

    <main className="content">
      <div className="room-title">
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>
      <form onSubmit={handleSendQuestion}>
        <select name={newType} id="" onChange={event => setNewType(event.target.value)} value={newType}>
          <option value="Ciências da Natureza">Ciências da Natureza</option>
          <option value="Ciências Humanas">Ciências Humanas</option>
          <option value="Liguagens, Códigos e suas Tecnologias">Liguagens, Códigos e suas Tecnologias</option>
          <option value="Matemática e suas tecnologias">Matemática e suas tecnologias</option>
          <option value="Redação">Redação</option>
        </select>
        <input type="text" placeholder="Dê um título" onChange={event => setNewTitle(event.target.value)} value={newTitle}/>
        <textarea
          placeholder="O que você quer publicar?"
          onChange={event => setNewQuestion(event.target.value)}
          value={newQuestion}
        />
        <div className="form-footer">
          <Button type="submit" disabled={!user}>Enviar pergunta</Button>
        </div>
      </form>
    </main>
  </div>
  );
}