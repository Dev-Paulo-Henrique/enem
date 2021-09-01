import './styles.scss' 
import { ReactNode } from 'react'

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
  return (
    <ul>
          <li className="main fav">
            <div className="content">
              <div className="together">
              <div className="background"></div>
            <h1 className="type">{type}</h1>
              </div>
            <div className="heart" id="heart"></div>
            </div>
            <strong className="title">{title}</strong>
            <p className="text">{content}</p>
            <span className="id">ID da pergunta: <span>{id}</span></span>
          </li>
        </ul>
  );
}