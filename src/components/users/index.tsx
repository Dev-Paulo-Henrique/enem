//import { useAuth } from "../../hooks/useAuth"

type UserProps = {
  author: string;
  authorId: string;
  email: string;
}

export function User({
  author,
  authorId,
  email
}: UserProps) {
  //const { user } = useAuth()

  return (
    <>
    <p>{author}</p>
    <p>{authorId}</p>
    <p>{email}</p>
    <br />
    </>
  )
}