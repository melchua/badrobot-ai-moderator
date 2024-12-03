'use client'
import { toggleTodo } from '@/utils/actions'
import { useTransition } from 'react'

const Todo = ({ todo }) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      toggleTodo(todo.id, !todo.completed)
    })
  }

  return (
    <div
      className={`border border-black/20 cursor-pointer ${
        todo.completed ? 'line-through text-gray-900' : ''
      }`}
      onClick={handleClick}
    >
      {todo.content}
    </div>
  )
}
export default Todo
