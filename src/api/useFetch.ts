import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useFetch() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [error, setError] = useState<any>(false)

    useEffect(() => {
      async function getData () {
        axios.get('https://market-data-api-ibjf.onrender.com')
        .then((response) => {
          setLoading(false)
          setData(response.data)
        })
      }
      getData()
    }, [])

    return {data, error, loading}
}

export default useFetch