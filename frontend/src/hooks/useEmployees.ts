import { useEffect, useState } from 'react'
import api from '../services/api'

interface Employee {
  id: number
  name: string
  title: string
  manager_id: number | null
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

  return { employees, loading, error }
}