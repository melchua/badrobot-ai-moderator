'use server'
import { revalidatePath } from 'next/cache'
import db from './db'

export const newTodo = async (formData) => {
  const todo = await db.todo.create({
    data: {
      content: formData.get('content'),
    },
  })

  revalidatePath('/experiment')
}

export const completeTodo = async (id) => {
  await db.todo.update({
    where: { id },
    data: { completed: true },
  })
  revalidatePath('/experiment')
}

export const toggleTodo = async (id, completed) => {
  await db.todo.update({
    where: { id },
    data: {
      completed,
    },
  })
  revalidatePath('/experiment')
}
