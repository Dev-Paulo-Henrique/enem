import { useEffect, useState } from 'react'
import { User } from '../components/users/index'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type FirebaseQuestions = Record<string, {
  author: string;
  authorId: string;
}>

type UsersType = {
  author: string;
  authorId: string;
  id: string;
}

export function Profile(){
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
          author: value.author,
          authorId: value.authorId,
        }
      })
      //console.log(parsedQuestion)
      setUsers(parsedQuestion)
      //console.log(databaseRoom.admin)
      //return console.log(JSON.stringify({databaseRoom}))
    })

    return () => {
      roomRef.off('value')
      //console.log(roomRef)
    }
  }, [user?.name])

  return(
    <>
    {users.map(user => {
      return (
        <User
          key={user.id}
          author={user.author}
          authorId={user.authorId}
        />
      )
    })}
    </>
  )
}