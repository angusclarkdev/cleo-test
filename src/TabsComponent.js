import React from 'react';
import styled from 'styled-components'
import Tabs from './Tabs'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  margin-top: 1rem;
`

const TabsComponent = () => {
    return (
      <Container>
          <Tabs />  
      </Container>
    );
  }

export default TabsComponent;
