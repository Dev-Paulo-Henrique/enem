import { useState, useEffect } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  type: string;
  title: string;
  content: string;
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  type: string;
  title: string;
  content: string;
}


export function useRoom(roomId: string) {
  const { user } =  useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [ title, setTitle ] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`${user?.id}`)//criar outra camada
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ??  {}

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          type: value.type,
          title: value.title,
          content: value.content,
          author: value.author,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestion)
    })
    return () => {
      roomRef.off('value')
    }
  }, [ roomId, user?.id])

  return { questions, title }
}