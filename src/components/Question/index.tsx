import './styles.scss' 
import { ReactNode } from 'react'
import Swal from 'sweetalert2'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

type QuestionProps = {
  content:  string;
  title: string;
  type: string;
  id: string;
  children?: ReactNode;
}
export function Question({
  content ,
  type ,
  title,
  id,
}: QuestionProps) {
  const {user} = useAuth()
  async function fav() {
    await database.ref(`${user?.name}/fav`).push({
      id,
      title,
      type,
      content
    })
    Swal.fire({
      title: 'Adicionado aos favoritos',
      showConfirmButton: false,
      icon: 'success',
      timer: 1000,
    })
  }
  return (
    <ul>
          <li className="main fav">
            <div className="content">
              <div className="together">
            <h1 className="type">{type}</h1>
              </div>
            <div className="heart" id="heart" onClick={fav}></div>
            </div>
            <strong className="title">{title}</strong>
            <p className="text">{content}</p>
            <span className="id">ID da postagem: 
            <span>{id}</span>
            </span>
          </li>
        </ul>
  );
}