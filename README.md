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

## Available endpoints

GET `/employees` - Returns list of employees

```bash

**For test:**
1. Run the server
2. Access http://localhost:8000/employees
3. You should see the JSON with the 3 initial employees
```