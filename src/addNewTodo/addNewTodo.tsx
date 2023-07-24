import { useEffect, useRef, useState } from 'react';
import plus from '../assets/img/plus.png'
import s from './addTodoBoard.module.css'
import close from '../assets/img/close-editing.png'
import { addTodos } from '../store/slice/todosSlice';
import { useAppDispatch } from '../store/store';
const AddTodoBoard = () => {
    const [isCreate, setIsCreate] = useState(false)
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {

                setIsCreate(false)
                setValue('')
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isCreate]);

    return (
        <div className={s.back}>
            {isCreate
                ? <div ref={containerRef} className={s.addNewTodoBlock}>
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            debugger
                            if (value.length > 0)
                                dispatch(addTodos({ title: value }))
                            setValue('')
                            setIsCreate(false)
                        }
                    }} autoFocus={true} value={value} onChange={(e) => setValue(e.target.value)} className={s.input} />
                    <div className={s.buttonBlock}>
                        <button onClick={() => {
                            if (value.length > 0)
                                dispatch(addTodos({ title: value }))
                            setValue('')
                            setIsCreate(false)
                        }} className={s.button}> <span className={s.buttonText}>Додати картку</span></button>
                        <img onClick={() => setIsCreate(false)} className={s.buttonImg} src={close} alt="" />
                    </div>
                </div>
                : <div onClick={() => setIsCreate(true)} className={s.addBoard}>
                    <img className={s.plusImg} src={plus} alt="" />
                    Додати новий список
                </div>
            }

        </div>

    );
}
export default AddTodoBoard