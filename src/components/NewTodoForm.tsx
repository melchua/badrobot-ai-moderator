import { newTodo } from '@/utils/actions'

const NewTodoForm = ({}) => {
  return (
    <div>
      <h1>New Todo Form</h1>
      <div>
        <form action={newTodo}>
          <input
            name="content"
            type="text"
            className="border border-black/25"
          />
          <button type="submit">new todo</button>
        </form>
      </div>
    </div>
  )
}

export default NewTodoForm
