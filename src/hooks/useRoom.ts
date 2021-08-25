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
  likes: Record<string, {
    authorId: string;
  }>
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


export function useRoom() {
  const { user } =  useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])

  useEffect(() => {
    const roomRef = database.ref('new')//`rooms/`${roomId}
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
      setQuestions(parsedQuestion)
    })
    return () => {
      roomRef.off('value')
    }
  }, [ user?.id])

  return { questions }
}