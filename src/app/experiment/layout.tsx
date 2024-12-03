import NewTodoForm from '@/components/NewTodoForm'

const ExperimentalDashboardLayout = ({ children }) => {
  return (
    <div>
      <h1>dashboard</h1>
      <div>
        <NewTodoForm />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ExperimentalDashboardLayout
