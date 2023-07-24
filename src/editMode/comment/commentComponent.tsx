import { useState } from 'react'
import s from './comment.module.css'
import close from '../../assets/img/close-editing.png'
import { useAppDispatch } from '../../store/store'
import { removeComments } from '../../store/slice/todosSlice'
type propsType = {
    text: string
    index: number
}
export const CommentComponent: React.FC<propsType> = ({ text, index }) => {
    const dispatch = useAppDispatch();
    return (
        <div className={s.commentComponent}>
            <div className={s.comment}>{text}</div>
            <button onClick={() => dispatch(removeComments(index))} className={s.commentDelete}>Видалити</button>
        </div>
    )
}
export default CommentComponent