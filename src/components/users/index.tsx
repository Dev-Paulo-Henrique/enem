import './styles.scss'

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
  const pathname = window.location.pathname.substring(6).valueOf()
  const mail = `mailto:${email}`
  //const url = `${window.location.host}/user/${authorId}`
  if(authorId === pathname) {
    console.log(pathname)
  }
  //const { user } = useAuth()

  return (
    <>
    <div className="profile">
    <img src={photoURL} alt="Foto" />
    <div className="info">
    <p className="name">Nome: {author}</p>
    <p className="id">ID: {authorId}</p>
    <span>Enviar email?
      <a href={mail}>{email}</a>
    </span>
    </div>
    </div>
    </>
  )
}