import './styles.scss'

type UserProps = {
  Name: string;
  authorId: string;
  Email: string;
  Photo: string;
}

export function User({
  Name,
  authorId,
  Email,
  Photo,
}: UserProps) {
  const pathname = window.location.pathname.substring(6).valueOf()
  const mail = `mailto:${Email}`
  //const url = `${window.location.host}/user/${authorId}`
  if(authorId === pathname) {
    console.log(pathname)
  }
  //const { user } = useAuth()

  return (
    <>
    <div className="profile">
    <img src={Photo} alt="Foto" />
    <div className="info">
    <p className="name">Nome: {Name}</p>
    <p className="id">ID: {authorId}</p>
    <span>Enviar e-mail?
      <a href={mail}>{Email}</a>
    </span>
    </div>
    </div>
    </>
  )
}