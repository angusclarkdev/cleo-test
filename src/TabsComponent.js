import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Content from './Content'
import Tabs from './Tabs'
import { BillsContext } from './BillsContext'
import { fetchBills, addBill, deleteBill } from './services/billsService'


const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  margin-top: 1rem;
`

const TabsComponent = () => {
  const [ activeTabIndex, toggleActiveTab ] = useState(0)
  const [ bills, updateBills ] = useState()
  

  useEffect(() => {
    fetchBillsAndUpdateState()
  },[])
  
  const fetchBillsAndUpdateState = async () => {
    updateBills( await fetchBills() )
  }

    return (
      <Container>
          <Tabs activeTab={activeTabIndex} toggleActiveTab={(activeTabIndex) => toggleActiveTab(activeTabIndex)} />
          <BillsContext.Provider value={{ bills, deleteBill, addBill, fetchBillsAndUpdateState }}>
            <Content activeTabIndex={activeTabIndex} />
          </BillsContext.Provider>
      </Container>
    );
  }

export default TabsComponent;
