import { NextResponse } from 'next/server'
import db from '@/utils/db'

export const GET = async () => {
  return NextResponse.json({ message: 'yoooo' })
}

export const POST = async (request: Request) => {
  const data = await request.json()
  const todo = await db.todo.create({
    data,
  })
  console.log('TODO', todo)
  return NextResponse.json({ message: todo })
}
