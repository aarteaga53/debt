import React, { useEffect, useState } from 'react'
import '../styles/Finance.css'

interface Debt {
  amount: number,
  date: Date
}

const Finance = () => {
  let [debts, setDebts] = useState([])

  useEffect(() => {
    let getDebts = async () => {
      let response = await fetch(`http://127.0.0.1:8000/debts`)
      let data = await response.json()
      
      setDebts(data.reverse())
    }

    getDebts()
  }, [])

  /**
     * Gets a date in milliseconds and converts it to the month and day,
     * adds year to the end if it is not the same as the current year
     * 
     * @param {*} date 
     * @returns the date in mm/dd or mm/dd/yyyy format
     */
  let formatDate = (date: Date) => {
    let newDate = `${date.getMonth() + 1}/${date.getDate()}`

    if(new Date().getFullYear() !== date.getFullYear()) {
        newDate += `/${date.getFullYear()}`
    }

    return newDate
}

  return (
    <div className='page-body'>
      <div className='table-container'>
        <div className='table-title'>Debt</div>
        <div className='table-header'>
          <div className='col-1'>Amount</div>
          <div className='col-2'>Date</div>
        </div>
        <div className='table-scroll'>
          <ul className='table'>
            {debts.map((debt: Debt, index) => (
              <li className='table-row' key={index}>
                <div className='col-1'>{debt.amount}</div>
                <div className='col-2'>{formatDate(debt.date)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Finance