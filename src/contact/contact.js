import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const ContactLayout = () => (
      <Container text style={{ marginTop: '7em' }}>
            <Header as='h1' style={{ fontSize: '2em' }}> Contact </Header>
            <p> Pour toute questions, remarques, suggestions, envoyez un mail à <a href="mailto:contact@madeleine.cafe">contact@madeleine.cafe</a> </p>
        </Container>
  )
  
  const e = React.createElement;
  export default e(ContactLayout)
