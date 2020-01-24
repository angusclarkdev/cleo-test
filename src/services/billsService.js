const BASE_URL = 'http://localhost:3002/bills'

export const fetchBills = async () => {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) {
      throw Error(`${res.status}: ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error(error)
    }
  }

  export const deleteBill = async (billId) => {
    try {
      const res = await fetch(`${BASE_URL}/${billId}`,
      { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isBill: false
          })
      })
      if (!res.ok) {
        throw Error(`${res.status}: ${res.statusText}`)
      }
    } catch (error) {
      console.error(error)
      }
  }

  export const addBill = async (billId) => {
    try {
      const res = await fetch(`${BASE_URL}/${billId}`,
      { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isBill: true })
      })
      if (!res.ok) {
        throw Error(`${res.status}: ${res.statusText}`)
      }
    } catch (error) {
      console.error(error)
      }
  }