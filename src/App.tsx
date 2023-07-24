import React, { useEffect, useState } from 'react';
import s from './App.module.css';
import Header from './header/header';
import AddTodoBoard from './addNewTodo/addNewTodo';
import TodoBoard from './todo/todo';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import { addListDrag, itemsType, } from './store/slice/todosSlice';
import EditModeComponent from './editMode/editMode';

type itemIdType = {
  item: itemsType | null
  id: number | null
}
const App = () => {
  const [draggedOverItem, setDraggedOverItem] = useState<itemIdType>({ item: null, id: null });
  const [isNewEl, setIsNewEl] = useState(false);
  const [isDragging, setIsDragging] = useState(false)
  const dispatch = useAppDispatch();
  const { draggedEl, todos, itemBoard, itemIndex, editMode } = useSelector((state: RootState) => state.todos)
  const [todo, setTodo] = useState(todos)
  const drop = (e: any, item: itemsType | null = null,) => {
    debugger
    if (itemIndex !== null) {
      dispatch(addListDrag({ id: itemBoard, index: itemIndex, el: draggedEl }));
    }
    else {
      if (itemBoard !== null)
        dispatch(addListDrag({ id: itemBoard, index: todos[itemBoard].items.length, el: draggedEl }));
    }
    setDraggedOverItem({ item: null, id: null });
  };
  const dragLeave = (e: any) => {
  }
  useEffect(() => {
    setTodo(todos)
  }, [todos])
  return (
    <div onDrop={(e) => {
      drop(e,)

      setIsDragging(false)
    }}
      onDragOver={(e) => { e.preventDefault() }} className={s.app}>
      {editMode &&
        <EditModeComponent />
      }
      <Header />
      <div className={s.content}>
        {todo.map((obj, i) =>
          <TodoBoard dragLeave={dragLeave} setIsDragging={setIsDragging} isDragging={isDragging} key={obj.id} drop={drop} isNewEl={isNewEl} index={i} boards={obj} {...obj} />
        )}
        <AddTodoBoard />
      </div>
    </div>
  );
}

export default App;
