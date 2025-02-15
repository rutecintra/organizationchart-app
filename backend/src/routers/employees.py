from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.employee import EmployeeDB
from schemas.employee import Employee, UpdateManagerRequest

router = APIRouter()

@router.get("/", response_model=list[Employee])
def get_employees(db: Session = Depends(get_db)):
    return db.query(EmployeeDB).all()

@router.put("/{employee_id}/manager", response_model=dict)
def update_manager(
    employee_id: int,
    request: UpdateManagerRequest,
    db: Session = Depends(get_db)
):
    employee = db.query(EmployeeDB).filter(EmployeeDB.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    if request.new_manager_id:
        manager = db.query(EmployeeDB).filter(EmployeeDB.id == request.new_manager_id).first()
        if not manager:
            raise HTTPException(status_code=400, detail="Invalid manager ID")
    
    employee.manager_id = request.new_manager_id
    db.commit()
    return {"message": "Manager updated successfully"}