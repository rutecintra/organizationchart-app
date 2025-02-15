from sqlalchemy import Column, Integer, String, ForeignKey
from core.database import Base

class EmployeeDB(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    manager_id = Column(Integer, ForeignKey('employees.id'), nullable=True)