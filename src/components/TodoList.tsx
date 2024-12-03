import Todo from './Todo'

const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.key} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
