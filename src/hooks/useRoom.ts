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
    const roomRef = database.ref(`question`)//`rooms/`${roomId}
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
          likeCount:Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
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