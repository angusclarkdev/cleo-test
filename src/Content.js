import React, { useContext } from 'react'
import { BillsContext } from './BillsContext'
import Bill from './Bill'

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

export default Content
