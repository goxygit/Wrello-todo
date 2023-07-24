import s from './editMode.module.css'
import close from '../assets/img/close-editing.png'
import string from '../assets/img/string.png'
import comm from '../assets/img/comments.png'
import kartName from '../assets/img/kartName.png'
import { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch } from '../store/store'
import { addComments, editList, editNameTodo, setEditElement, setEditProfile, setIsEditMode, setIsProfile } from '../store/slice/todosSlice'
import { useSelector } from 'react-redux'
import CommentComponent from './comment/commentComponent'
const EditModeComponent = () => {
    const [isEditName, setIsEditName] = useState(false)
    const { editElement, todos, isProfile } = useSelector((state: RootState) => state.todos)
    const [nameValue, setNameValue] = useState(editElement?.item.text)
    const [profileValue, setProfileValue] = useState(editElement?.item.profile)

    const [commentValue, setCommentValue] = useState('')
    const dispatch = useAppDispatch();
    const profileRef = useRef<HTMLDivElement>(null);
    const commentRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const adjustTextareaAddProfileHeight = () => {
        let textarea = document.getElementById("profile");
        if (textarea) {
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };
    const adjustTextareaAddCommentHeight = () => {
        let textarea = document.getElementById("comment");
        if (textarea) {
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };
    const adjustTextareaEditNameHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    useEffect(() => {
        adjustTextareaEditNameHeight();
    }, [nameValue]);
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileValue('')
            }
            if (commentRef.current && !commentRef.current.contains(e.target)) {
                setCommentValue('')
            }
            if (textareaRef.current && !textareaRef.current.contains(e.target)) {
                if (nameValue && nameValue.length > 0) {
                    dispatch(editNameTodo({ text: nameValue }))
                    dispatch(editList())
                    setIsEditName(false)
                }
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [profileValue, commentValue, nameValue]);
    console.log(nameValue)

    return (
        <div className={s.editModBackground}>
            <div className={s.editBackground}>
                <div className={s.editWindow}>
                    <img draggable={false} onClick={() => {
                        dispatch(editList())
                        dispatch(setIsEditMode(false))
                        dispatch(setEditElement(null))
                    }} className={s.closeImg} src={close} alt="" />
                    {/* header */}
                    <div className={s.header}>
                        <img draggable={false} className={s.cartNameImg} src={kartName} alt="" />
                        {
                            isEditName
                                ? <textarea autoFocus={true} ref={textareaRef} onFocus={adjustTextareaEditNameHeight} value={nameValue} onChange={(e) => setNameValue(e.currentTarget.value)} className={s.nameTextArea}></textarea>
                                : <div onClick={() => setIsEditName(true)} className={s.cartName}>{editElement && editElement.item.text}</div>

                        }
                        <div className={s.cartList}>у списку: {editElement && todos[editElement.boardIndex].title}</div>
                    </div>
                    {/* content */}
                    <div className={s.cartContent}>
                        <div className={s.cartProfile}>
                            <img draggable={false} className={s.stringImg} src={string} alt="" />
                            <div className={s.cartProfileName}>
                                Опис
                            </div>
                            <div >
                                {editElement && editElement.item.profile.length > 0 && isProfile
                                    ? <div onClick={() => dispatch(setIsProfile(false))} className={s.profile}>{profileValue}</div>

                                    : <div>
                                        <div ref={profileRef}>
                                            < textarea onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    if (profileValue && profileValue.length > 0) {
                                                        dispatch(setEditProfile(profileValue))
                                                        dispatch(setIsProfile(true))
                                                    }
                                                }
                                            }} value={profileValue} onChange={(e) => setProfileValue(e.currentTarget.value)} onInput={adjustTextareaAddProfileHeight} id='profile' placeholder='Додати детальний опис...' className={s.cartProfileTextarea}></textarea>
                                            {profileValue && profileValue.length > 0 &&
                                                <div className={s.buttonBlock}>
                                                    <button onClick={() => {
                                                        if (profileValue.length > 0) {
                                                            dispatch(setEditProfile(profileValue))
                                                            dispatch(setIsProfile(true))
                                                        }
                                                    }} className={s.buttonAdd}>Зберегти</button>
                                                    <button onClick={() => setProfileValue('')} className={s.buttonNoAdd}>Відмінити</button>
                                                </div>}
                                        </div>

                                    </div>
                                }
                            </div>

                        </div>
                        <div className={s.cartComment}>
                            <img draggable={false} className={s.commImg} src={comm} alt="" />
                            <div className={s.cartCommName}>
                                Активність
                            </div>
                            <div ref={commentRef}>
                                <textarea onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(addComments(commentValue))
                                        setCommentValue('')
                                    }
                                }} value={commentValue} onChange={(e) => setCommentValue(e.currentTarget.value)} onInput={adjustTextareaAddCommentHeight} id='comment' placeholder='Написати коментар...' className={s.cartCommTextarea}></textarea>
                                {commentValue.length > 0 &&
                                    <div className={s.buttonBlock}>
                                        <button

                                            onClick={() => {
                                                dispatch(addComments(commentValue))
                                                setCommentValue('')
                                            }} className={s.buttonAdd}>Зберегти</button>
                                        <button onClick={() => setCommentValue('')} className={s.buttonNoAdd}>Відмінити</button>
                                    </div>
                                }
                            </div>
                            <div className={s.comments}>
                                {editElement?.item.comments.map((text, i) =>
                                    <CommentComponent text={text} index={i} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default EditModeComponent