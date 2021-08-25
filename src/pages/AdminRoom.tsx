import { Button } from '../components/Button'
import '../styles/admin.scss'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { Question } from '../components/Question'
import {  useHistory } from 'react-router-dom'

export function AdminRoom() {
  const {user} = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [newType, setNewType] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const { questions } = useRoom()
  const history = useHistory()

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
    const roomRef = database.ref( 'new')
    const firebaseRoom = await roomRef.push({
      question
    })
    //history.push(`${firebaseRoom.key}`)
    console.log(firebaseRoom.key)

    //await database.ref('news').push(question)
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
      <form onSubmit={handleSendQuestion}>
        <select name={newType} id="" onChange={event => setNewType(event.target.value)} value={newType}>
          <option value="" disabled={!user}></option>
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
          <span>{questions.map(question => {
            return(
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              type={question.type}
              title={question.title}
              />
            )
          })}oi</span>
          <Button type="submit" disabled={!user}>Enviar pergunta</Button>
        </div>
      </form>
    </main>
  </div>
  );
}