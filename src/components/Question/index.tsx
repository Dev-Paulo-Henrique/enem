import './styles.scss' 
import { ReactNode } from 'react'
import cx from 'classnames'

type QuestionProps = {
  type: string;
  title: string;
  content:  string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
}
export function Question({
  content ,
  author,
  title,
  type,
  children
}: QuestionProps) {
  return (
    <div 
      className={cx(
        'new'
      )}
      >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
          <span>{title}</span>
          <span>{type}</span>
        </div>
        <div>
          { children }
        </div>
      </footer>
    </div>
  );
}