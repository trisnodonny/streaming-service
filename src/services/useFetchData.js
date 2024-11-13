import { useEffect, useState } from "react";
import axios from 'axios'

export const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true)
      try {
        const response = await axios.get(url, options)
        const data = response?.data
        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        setError(`${err}`)
        setIsPending(false)
      }
    }
    fetchData()
  }, [url])

  return { data, isPending, error}
}