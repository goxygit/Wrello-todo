import { itemsType, setEditElement, setIsEditMode, todosType } from '../store/slice/todosSlice'
import s from './todo.module.css'
import pen from '../assets/img/pen.png'
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../store/store';
import eye from '../assets/img/eye.png';
import comment from '../assets/img/comments.png'
type propsType = {
    obj: itemsType
    index: number
    id: number
    boards: todosType
    dragStart: (e: any, boards: todosType, obj: itemsType, index: number) => void
    dragLeave: (e: any, boards: todosType) => void
    dragOver: (e: any, item: itemsType) => void
    dragEnd: (e: any) => void
    // drop: (e: any, boards: todosType, index: number, obj: itemsType | null) => void
    dragEnter: (e: any, board: todosType, item: itemsType,) => void
    num: number
}
const List: React.FC<propsType> = ({ num, obj, boards, dragStart, dragLeave, dragOver, dragEnd, dragEnter, index, }) => {
    const dispatch = useAppDispatch();
    const stopEventPropagation = (e: any) => {
        e.stopPropagation();
    };

    return (
        <div
            draggable={true}
            onDragStart={(e) => dragStart(e, boards, obj, index)}
            onDragOver={(e) => { dragOver(e, obj) }}
            onDragEnd={(e) => {
                dragEnd(e)
            }}
            onDragEnter={(e) => {
                stopEventPropagation(e)
                dragEnter(e, boards, obj);
            }}
            className={classNames(s.lists)}>
            <div>
                {obj.text}

            </div >
            <img draggable={false} onClick={() => {
                dispatch(setEditElement({ item: obj, itemIndex: num, boardIndex: index }))
                dispatch(setIsEditMode(true))
            }} className={s.penImg} src={pen} alt="" />
            <div className={s.imgBlock}>
                {obj.profile && <img draggable={false} className={s.profileImg} src={eye} alt="" />}
                {obj.comments.length > 0 &&
                    <div className={s.commentsBlock}>
                        <img draggable={false} className={s.commentImg} src={comment} alt="" />
                        <span>{obj.comments.length}</span>
                    </div>
                }

            </div>

        </div>



    )
}
export default List