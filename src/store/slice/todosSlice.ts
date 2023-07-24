import { createSlice } from '@reduxjs/toolkit'
export type itemsType = {
    itemsId: number
    text: string
    profile: string
    comments: string[]
    markers: string[]
}
export type todosType = {
    id: number
    title: string
    items: itemsType[]

}
export type editElentType = {
    item: itemsType
    itemIndex: number
    boardIndex: number
}
interface CounterState {
    todos: todosType[]
    todoId: number
    listId: number
    draggedEl: itemsType | null
    itemBoard: number | null
    itemIndex: number | null
    boardId: number | null
    editMode: boolean
    editElement: editElentType | null
    isProfile: boolean
}

const initialState: CounterState = {
    todos: [],
    todoId: 0,
    listId: 0,
    draggedEl: null,
    itemBoard: null,
    itemIndex: null,
    boardId: null,
    editMode: false,
    editElement: null,
    isProfile: false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setLists(state, action) {
            const id = action.payload.id - 1;
            const index = action.payload.index;
            state.todos[id].items.splice(index, 1);
        },


        addTodos(state, action) {
            state.todoId++
            const obj = {
                id: state.todoId,
                title: action.payload.title,
                items: []
            }
            state.todos.push(obj)
        },
        setTitle(state, action) {
            const id = action.payload.id - 1
            const title = action.payload.title
            state.todos[id].title = title
        },
        deleteTodo(state, action) {
            debugger
            state.todos.splice(action.payload.index, 1)
        },
        addList(state, action) {
            const id = action.payload.id - 1
            state.listId++
            const obj = {
                itemsId: state.listId,
                text: action.payload.text,
                profile: '',
                comments: [],
                markers: []
            }
            state.todos[id].items.push(obj)
        },
        removeListDrag(state, action) {
            state.todos[action.payload.id].items.splice(action.payload.index, 1)
        },
        addListDrag(state, action) {
            state.todos[action.payload.id].items.splice(action.payload.index, 0, action.payload.el)
        },
        setDraggedEl(state, action) {
            state.draggedEl = action.payload
        },
        setItemBoard(state, action) {
            state.itemBoard = action.payload
        },
        setItemIndex(state, action) {
            state.itemIndex = action.payload
        },
        setBoardId(state, action) {
            state.boardId = action.payload
        },
        setIsEditMode(state, action) {
            state.editMode = action.payload
        },
        editList(state) {
            if (state.editElement) {
                const id = state.editElement.boardIndex
                const index = state.editElement.itemIndex
                state.todos[id].items[index] = state.editElement.item
            }
        },
        setEditElement(state, actions) {
            state.editElement = actions.payload
        },
        setEditProfile(state, actions) {
            if (state.editElement)
                state.editElement.item.profile = actions.payload
        },
        addComments(state, actions) {
            if (state.editElement)
                state.editElement.item.comments.push(actions.payload)
        },
        removeComments(state, actions) {
            if (state.editElement)
                state.editElement.item.comments.splice(actions.payload, 1)
        },
        editNameTodo(state, actions) {
            debugger
            if (state.editElement !== null)
                state.editElement.item.text = actions.payload.text
        },
        setIsProfile(state, action) {
            state.isProfile = action.payload
        }
    }
})

export const { deleteTodo, removeComments, setIsProfile, editNameTodo, addComments, setEditProfile, setEditElement, addTodos, setTitle, addList, setLists, removeListDrag, addListDrag, setDraggedEl, setItemBoard, setItemIndex, setBoardId, setIsEditMode, editList } = todoSlice.actions

export default todoSlice.reducer