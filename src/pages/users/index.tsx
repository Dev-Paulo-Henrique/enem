import { useEffect, useState } from "react"
import { Question } from "../../components/Question"
import { useAuth } from "../../hooks/useAuth"
import { database } from "../../services/firebase"

type FirebaseQuestions = Record<string, {
  Id: string;
  Photo: string;
  type: string;
  title: string;
  authorId: string;
  createdAt: string;
  content: string;
  author: string;
}>

type UsersType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  type: string;
  createdAt: string;
  author: string;
}

export function User() {
  const { user } = useAuth()
  const [users, setUsers] = useState<UsersType[]>([])

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
      console.log(parsedQuestion)
      setUsers(parsedQuestion)
      //console.log(databaseRoom.admin)
      //return console.log(JSON.stringify({databaseRoom}))
    })

    return () => {
      roomRef.off('value')
      //console.log(roomRef)
    }
  }, [user?.name])
  return (
    <>
    {users.map(user => {
      return (
        <Question
          key={user.id}
          content={user.content}
          title={user.title}
          type={user.type}
          id={user.id}
          author={user.author}
          createdAt={user.createdAt}
          authorId={user.authorId}
        />
      )
    })}
    </>
  )
}