import { useState, useEffect } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
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
  content: string;
  likeCount: number;
  likeId: string | undefined;
}


export function useRoom(roomId: string) {
  const { user } =  useAuth()
  const [ questions, setQuestions ] = useState<QuestionType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`questions`)//`rooms/`${roomId}
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ??  {}

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
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
  }, [roomId, user?.id])

  return { questions }
}