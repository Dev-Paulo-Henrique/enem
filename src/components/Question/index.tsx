import './styles.scss' 
import { ReactNode } from 'react'
import cx from 'classnames'

type QuestionProps = {
  content:  string;
  title: string;
  children?: ReactNode;
}
export function Question({
  content ,
  title,
}: QuestionProps) {
  return (
    <div 
      className={cx(
        'question',
      )}
      >
      <p>{content}</p>
      <footer>
        <div className="user-info">
        </div>
        <div>
          { title }
        </div>
      </footer>
    </div>
  );
}