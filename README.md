# Organization Chart App

## Setup Backend

1. Create and activate the virtual environment:
```bash
python -m venv venv
venv/Scripts/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

## Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Instale dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## Endpoints

**GET `/employees`**
Returns list of employees

**PUT `/employees/updatemanager`**
Updates an employee's manager

*Request Body:*
```json
{
    "employee_id": 1,
    "new_manager_id": 2
}
```

*Answers:*
| Status      | Message               |
|------------|------------------------|
| 200        | Manager updated successfully |
| 400        | Validation error |
| 404        | ID not found |
| 500        | Internal error |