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
            <h1 className="type">{type}Tipo</h1>
              </div>
            <div className="heart" id="heart"></div>
            </div>
            <strong className="title">{title}Título</strong>
            <p className="text">{content}Texto</p>
            <span>ID da pergunta: <a href={id}>{id}</a></span>
          </li>
        </ul>
  );
}