import { useParams, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
//import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const {user} = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions } = useRoom(roomId)
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <div>
          <RoomCode code={roomId}/>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          { questions.length > 0 &&  <span>{questions.length} pergunta(s)</span> }
        </div>
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
  );
}