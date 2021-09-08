//import { useAuth } from "../../hooks/useAuth"

type UserProps = {
  author: string;
  authorId: string;
}

export function User({
  author,
  authorId,
}: UserProps) {
  //const { user } = useAuth()

  return (
    <>
    <p>{author}</p>
    <p>{authorId}</p>
    <br />
    </>
  )
}