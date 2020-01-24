import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { BillsContext } from './BillsContext'
import Transactions from './Transactions'
import removeIcon from './assets/remove.svg'
import addIcon from './assets/add.svg'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1rem;
  border-bottom: thin solid rgb(220,220,220, 0.8);
  position: relative;

  cursor: pointer;

  &:hover {
    background-color: rgb(0,50,255,0.1)
  }

  span {
    font-size: 1.5rem;
    font-weight: lighter;
  }
 `

const Bill = ({ data, isBill }) => {
  const [ showTransactions, toggleShowTransactions ] = useState(false)
  const { addBill, deleteBill, fetchBillsAndUpdateState } = useContext(BillsContext)

  const handleButtonClick = async (e) => {
    e.stopPropagation()
    if (isBill) {
      await deleteBill(data.id)
      fetchBillsAndUpdateState()
      
    } else {
      await addBill(data.id)
      fetchBillsAndUpdateState()
    }
  }

  return (
    <>
    <div>
      <StyledDiv onClick={() => toggleShowTransactions((prevState) => !prevState)} title={showTransactions ? 'close' : 'open'}>
        <div>
          <h2 style={{ display: 'inline-block'}}> { data.name }  </h2>
          <span> ({data.transactions.length}) </span>
        </div>
        <button onClick={handleButtonClick}>
          <img src={isBill ? removeIcon : addIcon} alt={isBill ? 'remove this bill' : 'add to bills'} /> 
        </button>
      </StyledDiv>
    </div>
    {showTransactions && <Transactions list={data.transactions} />}
  </>
  )
}

export default Bill