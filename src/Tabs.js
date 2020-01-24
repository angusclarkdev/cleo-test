import React from 'react'
import Tab from './Tab'

const Tabs = ({ activeTab, toggleActiveTab }) => {
    return (
      <>
      <Tab label='Bills' isActive={activeTab === 0} onClick={() => toggleActiveTab(0)}>
      </Tab>
      <Tab label='Spending' isActive={activeTab === 1} onClick={() => toggleActiveTab(1)}>
      </Tab>
      </>
    )
  }

export default Tabs;
