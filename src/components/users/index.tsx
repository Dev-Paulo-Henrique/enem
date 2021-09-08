import { ReactNode } from "react"
import { useAuth } from "../../hooks/useAuth"

type UserProps = {
  content: string;
  title: string;
  type: string;
  id: string;
  author: string;
  authorId: string;
  createdAt: string;
  children?: ReactNode;
}

export function User({
  content,
  title,
  type,
  id,
  author,
  authorId,
  createdAt,
  children,
}: UserProps) {
  const { user } = useAuth()

  return (
    <>
    <div className="profile">oi {user?.name}</div>
    <p>{content}</p>
    <p>{title}</p>
    <p>{type}</p>
    <p>{id}</p>
    <p>{author}</p>
    <p>{authorId}</p>
    <p>{createdAt}</p>
    <p>{children}</p>
    </>
  )
}