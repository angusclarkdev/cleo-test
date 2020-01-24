import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
  li {
    list-style-type: square;
    padding: 1rem;

    span {
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`
const Transactions = ({ list }) => (
  <>
    <h3 style={{ paddingLeft: '1rem'}}> transactions </h3>
      <StyledUl>
        {list.map(i => (
          <li key={i.id}>
          <span>  {`£${i.amount }`}  </span>
          <span> { i.date } </span>
          </li>
        ))}
      </StyledUl>
  </>
)

export default Transactions
