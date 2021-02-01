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
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const ConduiteLayout = () => (
      <Container text style={{ marginTop: '7em' }}>
            <Header as='h1' style={{ fontSize: '2em' }}> Code de Conduite </Header>
            
            <p>Ce projet vise à générer des moments de convivialité dans un contexte sanitaire particulier. Nous comptons sur vous pour en prendre soin... </p>
            <p> Aucune forme de violence ou de comportement inapproprié ne sera tolérée. Nous souhaitons faire de ces moments un instant de bonne humeur, de partage et de convivialité. </p>
            <p>En cas de problème, ou pour nous signaler tout comportement que vous jugez inapproprié, n'hésitez pas à nous avertir à <a href="mailto:contact@madeleine.cafe">contact@madeleine.cafe</a>.</p>
        </Container>
  )
  
  const e = React.createElement;
  export default e(ConduiteLayout)
