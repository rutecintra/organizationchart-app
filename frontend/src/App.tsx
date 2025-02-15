import { useEmployees } from './hooks/useEmployees'

function App() {
  const { employees, loading, error } = useEmployees()

  if (loading) {
    return <div>Loading employess...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='App'>
      <h1>Organization Chart</h1>
      <div className="employees-list">
        {employees.map((employee) => (
          <div key={employee.id} className='employee-card'>
            <h3>{employee.name}</h3>
            <h3>{employee.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
