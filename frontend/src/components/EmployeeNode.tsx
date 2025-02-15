import { Employee } from '../hooks/useEmployees'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface Props {
  employee: Employee
  allEmployees: Employee[]
  level?: number
  index: number
}

export const EmployeeNode = ({ employee, allEmployees, level = 0, index }: Props) => {
  const subordinates = allEmployees.filter(e => e.manager_id === employee.id)

  return (
    <Droppable droppableId={employee.id.toString()} type="employee">
      {(provided) => (
        <div 
          className="node-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Draggable 
            draggableId={employee.id.toString()} 
            index={index}
          >
            {(provided) => (
              <div
                className="node"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="node-content">
                  <h3>{employee.name}</h3>
                  <p>{employee.title}</p>
                </div>
              </div>
            )}
          </Draggable>

          {subordinates.length > 0 && (
            <div className="children">
              {subordinates.map((subordinate, index) => (
                <EmployeeNode
                  key={subordinate.id}
                  employee={subordinate}
                  allEmployees={allEmployees}
                  level={level + 1}
                  index={index}
                />
              ))}
            </div>
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}