import { Button } from '../components/Button'
import '../styles/admin.scss'
//import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import Public from '../assets/images/public.gif'
//import {  useHistory, useParams } from 'react-router-dom'


export function AdminRoom() {
  const {user} = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [newType, setNewType] = useState('')
  const [newTitle, setNewTitle] = useState('')
  //const { questions } = useRoom()
  //const history = useHistory()

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '' || newType.trim() === '' || newTitle.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const roomRef = database.ref(`${user?.name}/matter/${newType}/`)
    await roomRef.push({
      title: newTitle,
      content: newQuestion
    })
    //history.push(`/admin/${firebaseRoom.key}`)

    //await database.ref('news').push(question)
    setNewQuestion('')
    setNewTitle('')
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
        <select name={newType} id="select" onChange={event => setNewType(event.target.value)} value={newType}>
          <option value="" disabled selected>Selecione...</option>
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
          <span>{`Deseja publicar isso ${user?.name.split(" ").shift()}?`}</span>
          <Button type="submit" disabled={!user}>Publicar</Button>
        </div>
      </form>
      <img src={Public} alt="Publication" />
    </main>
  </div>
  );
}