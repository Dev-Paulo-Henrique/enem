//import { useAuth } from "../../hooks/useAuth"

type UserProps = {
  author: string;
  authorId: string;
  email: string;
  photoURL: string;
}

export function User({
  author,
  authorId,
  email,
  photoURL,
}: UserProps) {
  const mail = `mailto:${email}`
  //const { user } = useAuth()

  return (
    <>
    <img src={photoURL} alt="Foto" />
    <p>{author}</p>
    <p>{authorId}</p>
    <a href={mail}>{email}</a>
    <br />
    </>
  )
}