from pydantic import BaseModel

class EmployeeBase(BaseModel):
    name: str
    title: str
    manager_id: int | None = None

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True

class UpdateManagerRequest(BaseModel):
    new_manager_id: int | None