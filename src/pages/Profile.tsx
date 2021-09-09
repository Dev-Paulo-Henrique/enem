import { useEffect, useState } from 'react'
import { User } from '../components/users/index'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type FirebaseQuestions = Record<string, {
  Name: string;
  authorId: string;
  Email: string;
  Photo: string;
}>

type UsersType = {
  Name: string;
  authorId: string;
  Email: string;
  Photo: string;
  id: string;
}

export function Profile(){
  const { user } = useAuth()
  const [users, setUsers] = useState<UsersType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`users`)//criar outra camada
    //console.log(roomRef.key)
    roomRef.on('child_added', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom ?? {}


      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          Name: value.Name,
          authorId: databaseRoom.key,
          Email: value.Email,
          Photo: value.Photo,
        }
      })
      //console.log(parsedQuestion)
      setUsers(parsedQuestion)
      console.log(databaseRoom.admin)
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
          Name={user.Name}
          authorId={user.authorId}
          Email={user.Email}
          Photo={user.Photo}
        />
      )
    })}
    </>
  )
}