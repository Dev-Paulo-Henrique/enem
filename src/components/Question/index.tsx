import './styles.scss' 
import { ReactNode } from 'react'
import Swal from 'sweetalert2'

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
  const fav = document.getElementById('heart')
  async function double() {
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
            <div className="heart" id="heart" onClick={double}></div>
            </div>
            <strong className="title">{title}</strong>
            <p className="text">{content}</p>
            <span className="id">ID da pergunta: 
            <span>{id}</span>
            </span>
          </li>
        </ul>
  );
}