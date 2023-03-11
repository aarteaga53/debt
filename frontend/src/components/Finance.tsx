import React, { useEffect, useState } from 'react'
import '../styles/Finance.css'
import DeleteOutline from '@mui/icons-material/DeleteOutline'

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

interface Debt {
  _id: string,
  amount: number,
  note: string,
  date: Date,
  username: string
}

const Finance = ({ user }: { user: User}) => {
  let [debts, setDebts] = useState<Debt[]>([])

  useEffect(() => {
    let getDebts = async () => {
      let response = await fetch(`http://127.0.0.1:8000/debts/${user.username}`)
      let data = await response.json()
      
      setDebts(data.reverse())
    }
    
    if(user) {
      getDebts()
    }
  }, [user])

  let insert = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newDebt = {
        amount: form.get('amount'), 
        note: form.get('note'), 
        date: new Date(),
        username: user.username
    }

    let response = await fetch(`http://127.0.0.1:8000/debts/insert`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newDebt)
    })

    let data = await response.json()

    if('_id' in data) {
      setDebts(debts => [data, ...debts])
      clearInput('amount')
      clearInput('note')
    }
  }

  /**
     * Gets a date in milliseconds and converts it to the month and day,
     * adds year to the end if it is not the same as the current year
     * 
     * @param {*} date 
     * @returns the date in mm/dd or mm/dd/yyyy format
     */
  let formatDate = (date: Date): string => {
    let newDate = `${date.getMonth() + 1}/${date.getDate()}`

    if(new Date().getFullYear() !== date.getFullYear()) {
        newDate += `/${date.getFullYear()}`
    }

    return newDate
  }

  let clearInput = (id: string) => {
    const input = (document.getElementById(id) as HTMLInputElement)
    input.value = ''
  }

  return (
    <div className='page-body'>
      <div className='table-container'>
        <div className='table-title'>Debt</div>
        <div className='table-header'>
          <div className='col-1'>Amount</div>
          <div className='col-2'>Note</div>
          <div className='col-3'>Date</div>
          <div className='col-4'></div>
        </div>
        <div className='table-scroll'>
          <ul className='table'>
            {debts.map((debt: Debt, index) => (
              <li className='table-row' key={index}>
                <div className='col-1'>{debt.amount}</div>
                <div className='col-2'>{debt.note}</div>
                <div className='col-3'>{formatDate(new Date(debt.date))}</div>
                <div className='col-4'><DeleteOutline className='debt-icon' /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form className='insert' onSubmit={insert}>
        <div className='col-1'>
          <input className='insert-input' id='amount' name='amount' type='number' required></input>
        </div>
        <div className='col-2'>
          <input className='insert-input' id='note' name='note' type='text' autoComplete='off' required></input>
        </div>
        <div className='col-3'>
          <div>
            {formatDate(new Date())}
          </div>
        </div>
        <div className='col-4'>
          <button type='submit'>+</button>
        </div>
      </form>
    </div>
  )
}

export default Finance