import { ButtonHTMLAttributes } from 'react';
import '../styles/fav.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean
}


export function Fav({ isOutline = false, ...props }: ButtonProps) {
   return (
    <button
     className={`button ${isOutline ? 'outlined' : ''}`}
    {...props}
    />
  )
}