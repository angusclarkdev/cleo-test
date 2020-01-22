import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import Tabs from './Tabs'
import { BillsContext } from './BillsContext'
import removeIcon from './assets/remove.svg'
import addIcon from './assets/add.svg'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  margin-top: 1rem;
`

const StyledUl = styled.ul`
  /* display: flex; */
  li {
    list-style-type: square;
    padding: 1rem;

    span {
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`
// const Transactions = () => (
//   null
// )
const Bill = ({ data, isBill }) => {
  const [ showTransactions, toggleShowTransactions ] = useState(false)
  const billsContext = useContext(BillsContext)
  const handleClick = (e) => {
    toggleShowTransactions((prevState) => !prevState)
  }
const data1 = data.transactions.map(i => (
  <li>
     <span>  {`£${i.amount }`}  </span>
      <span> { i.date } </span>
  </li>
))

const handleButtonClick = (e) => {
  e.stopPropagation()
  if (isBill) {
    billsContext.deleteBill(data.id)
  } else {
    billsContext.addBill(data.id)
  }
}
  return (
    <>
    <div>
      <StyledDiv onClick={handleClick}>
        <h2 style={{ display: 'inline-block'}}> { data.name }  </h2>
        <p> {data.transactions.length} </p>
        <button onClick={handleButtonClick}>
          <img src={isBill ? removeIcon : addIcon} alt='remove this bill' /> 
        </button>
      </StyledDiv>
    </div>
    {showTransactions && (
      <>
        <h3 style={{ paddingLeft: '1rem'}}> transactions </h3>
        <StyledUl>
          {data1}
        </StyledUl>
      </>
    )}
    </>
  )
}
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
 `

const Content = ({ activeTabIndex }) => {
  const billsContext = useContext(BillsContext)
  const renderContent = (contentToRender, isBill) => contentToRender.map(i => ( <Bill data={i} key={i.id} isBill={isBill} /> ))

  if (billsContext.bills) {
    if (activeTabIndex === 0) {
      const bills = billsContext.bills.filter(i => i.isBill)
      return renderContent(bills, true)
    }
    const potentialBills = billsContext.bills.filter(i => !i.isBill)
    return renderContent(potentialBills)
  }

  return <h2>There are no bills to display. Please check your network connection </h2>
}

const TabsComponent = () => {

  // Content will be provided with a bills context
  const [ activeTabIndex, toggleActiveTab ] = useState(0)
  const [ bills, updateBills ] = useState()

  useEffect(() => {
      fetchBills()
    },[])

    // unit test this
  const fetchBills = async () => {
    try {
      const res = await fetch('http://localhost:3002/bills')
      if (!res.ok) {
        throw Error(`${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      updateBills(data)
    } catch (error) {
      console.error(error)
      }
    }

    const deleteBill = async (billId) => {
      try {
        const res = await fetch(`http://localhost:3002/bills/${billId}`,
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
        fetchBills()
      } catch (error) {
        console.error(error)
        }
    }

    const addBill = async (billId) => {
      try {
        const res = await fetch(`http://localhost:3002/bills/${billId}`,
        { 
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            isBill: true
            })
        })
        if (!res.ok) {
          throw Error(`${res.status}: ${res.statusText}`)
        }
        fetchBills()
      } catch (error) {
        console.error(error)
        }
    }
    return (
      <Container>
          <Tabs activeTab={activeTabIndex} toggleActiveTab={(activeTabIndex) => toggleActiveTab(activeTabIndex)} />
          <BillsContext.Provider value={{ bills, updateBills, deleteBill, addBill }}>
            <Content activeTabIndex={activeTabIndex} />
          </BillsContext.Provider>
      </Container>
    );
  }

export default TabsComponent;
