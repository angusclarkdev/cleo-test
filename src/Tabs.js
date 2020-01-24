import React from 'react';
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
  color: ${props => props.theme.colours.darkGrey};
`

const StyledLi = styled.li`
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colours.borderGrey};
  border-top-color: ${props => props.isActive ? props.theme.colours.blue : ''};
  border-top-width: 3px;
  border-bottom: none;
  padding: 1rem 4rem;
  margin-left: -1px;
  list-style: none;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.isActive ? 'white': props.theme.colours.lightBlue};
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
