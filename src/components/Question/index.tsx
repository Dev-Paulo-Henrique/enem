import './styles.scss' 
import { ReactNode } from 'react'
import cx from 'classnames'

type QuestionProps = {
  content:  string;
  title: string;
  type: string;
  children?: ReactNode;
}
export function Question({
  content ,
  type ,
  title,
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
          </li>
        </ul>
  );
}