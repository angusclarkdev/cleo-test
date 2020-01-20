import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import Tabs from './Tabs'
import { BillsContext } from './BillsContext'
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  margin-top: 1rem;
`

const StyledUl = styled.ul`
  li {
    list-style: none;
  }
`
const Bill = ({ data }) => {
  return (
    <div>
      <h2> { data.name }  </h2>
      <StyledUl>
      {data.transactions.map(i => (
        <>
          <li>
            <h3> Transaction </h3>
            <span> <h4> Amount: </h4> { i.amount }  </span>
          </li> 
          <li>
            <span> <h4> Date: </h4> { i.date } </span>
          </li>
        </>
      ))}
      </StyledUl>
    </div>
  )
}

const Content = ({ activeTabIndex }) => {
  const billsContext = useContext(BillsContext)
  const renderContent = (contentToRender) => contentToRender.map(i => ( <Bill data={i} key={i.id} />))

  if (activeTabIndex === 0) {
    const bills = billsContext.bills.filter(i => i.isBill)
      return renderContent(bills)
    }
    const potentialBills = billsContext.bills.filter(i => !i.isBill)
    return renderContent(potentialBills)
}

const TabsComponent = () => {
  // useEffect method to fetch data on page load
  // useState method to toggle between panels on Tab click

  // Content will be provided with a bills context
  const [ activeTabIndex, toggleActiveTab ] = useState(0)
  const [ bills, updateBills ] = useState([])

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

    return (
      <Container>
          <Tabs activeTab={activeTabIndex} toggleActiveTab={(activeTabIndex) => toggleActiveTab(activeTabIndex)} />
          <BillsContext.Provider value={{ bills, updateBills }}>
            <Content activeTabIndex={activeTabIndex} />
          </BillsContext.Provider>
      </Container>
    );
  }

export default TabsComponent;
