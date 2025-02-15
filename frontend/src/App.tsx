import { useEffect, useRef } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { useEmployees, Employee } from './hooks/useEmployees'
import { EmployeeNode } from './components/EmployeeNode'
import { NoManagerArea } from './components/NoManagerArea'
import './App.css'

function App() {
  const { employees, loading, error, updateEmployeeManager } = useEmployees()
  const hasTopLevel = employees.some(e => e.manager_id === null)

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === 'no-manager') {
      if (hasTopLevel) {
        return
      }
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    try {
      const newManagerId = destination.droppableId === 'no-manager' ? 
        null : 
        parseInt(destination.droppableId)

      if (newManagerId === parseInt(draggableId)) {
        return
      }

      await updateEmployeeManager(parseInt(draggableId), newManagerId)
      
    } catch (error) {
      // toast.error('Error updating manager')
    }
  }

  const buildHierarchy = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a.manager_id === null) return -1
      if (b.manager_id === null) return 1
      return 0
    })

    const topLevel = sortedEmployees.filter(e => e.manager_id === null)
    
    return (
      <>
        {topLevel.map((employee, index) => (
          <EmployeeNode
            key={employee.id}
            employee={employee}
            allEmployees={sortedEmployees}
            index={index}
          />
        ))}
      </>
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Carregando organograma...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Erro</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    )
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="app-container">
          <NoManagerArea hasTopLevel={hasTopLevel} />
          <div className="org-chart">
            {buildHierarchy()}
          </div>
        </div>
      </DragDropContext>
    </>
  )
}


export default App