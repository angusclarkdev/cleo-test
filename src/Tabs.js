import React, { useState } from 'react';
import styled from 'styled-components'
import receipt from './assets/receipt.svg'
import money from './assets/money.svg'

const StyledUl = styled.ul`
  display: inline-block;
  text-decoration: none;
  margin: 0;
  padding: 0;
`
const StyledSpan = styled.span`
  font-size: 1.6rem;
  display: block;
  color: rgba(0, 0, 0, 0.8);
`

const StyledLi = styled.li`
  border: 1px solid rgb(220,220,220, 0.1);
  border-top-color: ${props => props.isActive ? 'rgb(0,250,154)' : ''};
  border-top-width: 2px;
  padding: 1rem 4rem;
  margin-left: -1px;
  border-bottom: none;
  list-style: none;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.isActive ? 'white': 'rgb(220,220,220, 0.5)'};
  `

const Tab = ({ label, isActive, onClick }) => {
  const icon = label === 'Bills' ? receipt : money
  return (
    <>
      <StyledUl>
      <StyledLi isActive={isActive} onClick={onClick}>
        <img src={icon} alt='icon representing label' />
        <StyledSpan>
          { label }
        </StyledSpan>
      </StyledLi>
      </StyledUl>
    </>
  )
}

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
