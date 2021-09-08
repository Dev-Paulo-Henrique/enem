import { ReactNode } from "react"
//import { useAuth } from "../../hooks/useAuth"

type UserProps = {
  author: string;
  authorId: string;
  children?: ReactNode;
}

export function User({
  author,
  authorId,
  children,
}: UserProps) {
  //const { user } = useAuth()

  return (
    <>
    <p>{author}</p>
    <p>{authorId}</p>
    <p>{children}</p>
    <br />
    </>
  )
}