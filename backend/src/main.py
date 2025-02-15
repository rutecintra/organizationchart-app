from fastapi import FastAPI
from core.database import engine, Base
from models.employee import EmployeeDB
from routers.employees import router as employees_router

app = FastAPI(
    title="Organization Chart API",
    description="API para gerenciamento de organograma corporativo",
    version="0.1.0",
    openapi_url="/openapi.json"
)

Base.metadata.create_all(bind=engine)

app.include_router(employees_router, prefix="/employees", tags=["employees"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)