import db from '@/utils/db'
import TodoList from '@/components/TodoList'

const getData = async () => {
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(0)
    }, 100)
  )
  const todos = await db.todo.findMany({})
  return todos
}

const ExperimentPage = async () => {
  const todos = await getData()
  console.log('todos', todos)
  return (
    <div>
      Experiment: TODOs
      <TodoList todos={todos} />
    </div>
  )
}

export default ExperimentPage
