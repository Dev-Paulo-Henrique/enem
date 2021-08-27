import { useState, useEffect } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<string, {
  title: string;
  content: string;
}>

type QuestionType = {
  id: string;
  title: string;
  content: string;
}


export function useRoom() {
  const { user } =  useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [ title, setTitle ] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`${user?.id}`)//criar outra camada
    console.log(roomRef.key)
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ??  {}

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          content: value.content,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestion)
      console.log(databaseRoom)
    })
    return () => {
      roomRef.off('value')
    }
  }, [ user?.id])

  return { questions, title }
}