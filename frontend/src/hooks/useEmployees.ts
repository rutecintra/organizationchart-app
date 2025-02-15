import { useEffect, useState } from 'react'
import api from '../services/api'

export interface Employee {
  id: number;
  name: string;
  title: string;
  manager_id: number | null;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees')
        setEmployees(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch employees')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const updateEmployeeManager = async (employeeId: number, newManagerId: number | null) => {
    try {
      setLoading(true)
      
      await api.put('/employees/updatemanager', {
        employee_id: employeeId,
        new_manager_id: newManagerId
      })

      setEmployees(prev => prev.map(emp => 
        emp.id === employeeId ? { ...emp, manager_id: newManagerId } : emp
      ))

    } catch (err) {
      setError('Failed to update manager')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { 
    employees, 
    loading, 
    error,
    updateEmployeeManager
  }
}