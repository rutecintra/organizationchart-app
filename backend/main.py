from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import engine, SessionLocal, EmployeeDB

EmployeeDB.metadata.create_all(bind=engine)

app = FastAPI()

class Employee(BaseModel):
    id: int
    name: str
    title: str
    manager_id: int | None = None

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def statup_event():
    db = SessionLocal()
    if db.query(EmployeeDB).count() == 0:
        initial_data = [
            EmployeeDB(id = 1, name = "Leticya Maria", title = "CEO", manager_id = None),
            EmployeeDB(id = 2, name = "Ronald Oliveira", title = "CTO", manager_id = 1),
            EmployeeDB(id = 3, name = "Sarah Silva", title = "Software Engineer", manager_id = 2),
            EmployeeDB(id = 4, name = "Mariana Barbosa", title = "Intern", manager_id = 3)
        ]
        db.add_all(initial_data)
        db.commit()
    db.close()

@app.get("/")
async def home():
    return {"status": "available"}

@app.get("/employees", response_model = list[Employee])
def get_employees(db: Session = Depends(get_db)):
    return db.query(EmployeeDB).all()