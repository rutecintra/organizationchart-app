import { Droppable } from '@hello-pangea/dnd'

export const NoManagerArea = ({ hasTopLevel }: { hasTopLevel: boolean }) => {
  return (
    <Droppable 
      droppableId="no-manager" 
      direction="horizontal"
      isDropDisabled={hasTopLevel}
    >
      {(provided) => (
        <div
          className="no-manager-area"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="top-level-title">
            CHART<br />APP
          </h2>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}