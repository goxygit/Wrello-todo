import plus from '../assets/img/plusInTodo.png';
import options from '../assets/img/options.png';
import close from '../assets/img/close-editing.png';
import s from './todo.module.css';
import { setTitle, addList, itemsType, todosType, removeListDrag, setDraggedEl, setItemBoard, setItemIndex, deleteTodo } from '../store/slice/todosSlice';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import List from './list';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
type PropsType = {
    title: string;
    id: number;
    items: itemsType[];
    boards: todosType;
    index: number
    isNewEl: boolean
    drop: (e: any, item: itemsType | null) => void
    isDragging: boolean
    setIsDragging: (f: boolean) => void
    dragLeave: (e: any) => void
};

const TodoBoard: React.FC<PropsType> = ({ dragLeave, setIsDragging, isDragging, boards, title, id, index, items, }) => {
    const { itemIndex, draggedEl, todos, itemBoard } = useSelector((state: RootState) => state.todos)
    const [todoNameValue, setTodoNameValue] = useState(title);
    const [isAddNewList, setIsAddNewList] = useState(false);
    const [addNewTodoValue, setAddNewTodoValue] = useState('');
    const [isDropDownMenu, setIsDropDownMenu] = useState(false)
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const dropDownRef = useRef<HTMLDivElement>(null);

    const dragOver = (e: any, item: itemsType) => {
        e.preventDefault()


    }
    const dragStart = (e: any, board: todosType, item: itemsType, indexId: number,) => {
        setIsDragging(true)

        if (draggedEl)
            dispatch(setDraggedEl(undefined))
        dispatch(setDraggedEl(item))
        setTimeout(() => {
            dispatch(removeListDrag({ id: indexId, index: board.items.indexOf(item) }))
        }, 0)
    }
    const dragEnter = (e: any, board: todosType, item: itemsType | null) => {
        e.preventDefault()
        if (item) {
            dispatch(setItemIndex(boards.items.indexOf(item)))
        }
        else {
            dispatch(setItemIndex(null))
        }
        dispatch(setItemBoard(todos.indexOf(boards)))
        console.log(itemIndex)
    }
    const dragEnd = (e: any) => {
    }


    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {

                setIsAddNewList(false)
                setAddNewTodoValue('')
            }
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setTimeout(() => {
                    setIsDropDownMenu(false)

                }, 0)
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isAddNewList]);


    const adjustTextareaNameHeight = () => {
        let textarea = document.getElementById("myTextarea");
        let parent = document.getElementById("parent");
        if (textarea && parent) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            parent.style.height = textarea.scrollHeight + "px";
        }
    };

    const adjustTextareaAddTodoHeight = () => {
        let textarea = document.getElementById("myAddTodo");
        if (textarea) {
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    return (
        <div
            onDragEnter={(e) => {
                dragEnter(e, boards, null);
            }}
            className={s.back}>
            <div className={s.backgroundTodo}>
                <div id='parent' className={s.todoName}>
                    <textarea
                        onBlur={() => {
                            if (todoNameValue.length > 0) {
                                dispatch(setTitle({ id, title: todoNameValue }));
                            }
                        }}
                        onInput={adjustTextareaNameHeight}
                        id='myTextarea'
                        className={s.textareaTodoName}
                        onChange={(e) => {
                            setTodoNameValue(e.target.value);
                        }}
                        value={todoNameValue}
                    />
                    <img draggable={false} onClick={(e) => {
                        setIsDropDownMenu((prev) => !prev)
                    }} className={s.optionsImg} src={options} alt='' />

                </div>
                <div className={classNames(s.todoList, isDragging && itemBoard === todos.indexOf(boards) && s.enterBoard)}>
                    {items.map((obj: itemsType, i) => (

                        <div key={obj.itemsId + '_items'} className={s.dragEl}>
                            <List
                                dragStart={dragStart}
                                boards={boards}
                                dragEnd={dragEnd}
                                dragLeave={dragLeave}
                                dragEnter={dragEnter}
                                dragOver={dragOver}
                                obj={obj}
                                id={id}
                                index={index}
                                num={i}
                            />

                        </div>

                    ))}

                </div>
                {isAddNewList ? (
                    <div ref={containerRef} className={s.addNewTodoBlock}>
                        <textarea
                            onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                    if (addNewTodoValue.length > 0) {
                                        dispatch(addList({ id, text: addNewTodoValue }));
                                        setAddNewTodoValue('');
                                    }
                            }}
                            value={addNewTodoValue}
                            onChange={(e) => setAddNewTodoValue(e.target.value)}
                            autoFocus={true}
                            onInput={adjustTextareaAddTodoHeight}
                            id='myAddTodo'
                            placeholder='Увести назву цієї картки...'
                            className={s.addNewTodoTextarea}
                        />
                        <div className={s.buttonBlock}>
                            <button
                                onClick={() => {
                                    if (addNewTodoValue.length > 0) {
                                        dispatch(addList({ id, text: addNewTodoValue }));
                                        setAddNewTodoValue('');
                                    }
                                }}
                                className={s.button}
                            >
                                <span className={s.buttonText}>Додати картку</span>
                            </button>
                            <img
                                onClick={() => setIsAddNewList(false)}
                                className={s.buttonImg}
                                src={close}
                                alt=''
                                draggable={false}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={s.addBoardBlock}>
                        <div onClick={() => setIsAddNewList(true)} className={s.addBoard}>
                            <img draggable={false} className={s.plusImg} src={plus} alt='' />
                            Додати новий список
                        </div>
                    </div>
                )}
            </div>
            {isDropDownMenu &&
                <div ref={dropDownRef} className={s.backDrop}>
                    <div className={s.dropDownMenu}>
                        <div className={s.dropDownMenuHeader}>
                            Дії над списком
                            <img draggable={false} className={s.closeImgDropDown} onClick={() => setIsDropDownMenu(false)} src={close} alt="" />
                        </div>
                        <div className={s.dropDownMenuContent}>
                            <div onClick={() => dispatch(deleteTodo({ index }))} className={s.actions}>
                                Видалити цей список
                            </div>
                        </div>
                    </div>
                </div>

            }

        </div >
    );
};

export default TodoBoard;