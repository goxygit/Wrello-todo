import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todos from './slice/todosSlice'
export const store = configureStore({
    reducer: {
        todos,
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch