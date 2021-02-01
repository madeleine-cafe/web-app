/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
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

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Madeleine Café'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Générateur de moments de convivialité virtuelle... parce que l’université ne peut se résumer à une suite de cours, venez rencontrer vos pairs et tissez des liens !'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge' href="participer">
        Participer
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em',
            backgroundImage: `url("assets/images/madeleine-cafe.jpg")`,
            backgroundPosition: `center`,
            backgroundSize: `cover`}}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Nous contacter</Menu.Item>
            <Menu.Item as='a'>Politique de confidentialité</Menu.Item>
            <Menu.Item as='a'>Qui sommes-nous ?</Menu.Item>
            <Menu.Item as='a'>Désinscription</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
          <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>
                Qu'est-ce que Madeleine Café?
            </Header>
            <div>
            
            <p style={{ fontSize: '1.33em' }}>Le projet <b>Madeleine Café</b> est une initiative personnelle visant à rétablir des moments de convivialité à l'université. Pour recréer les discussions spontanées, autour de la machine à café ou à la pause, nous proposons aux étudiants de prendre quelques minutes pour se connaître et se parler virtuellement.</p> 
            <p style={{ fontSize: '1.33em' }}>Pour cela, après une inscription validée, l'équipe Madeleine Café envoie un mail aux étudiants afin qu'ils programment leur réunion.</p>
            <p style={{ fontSize: '1.33em' }}>Les étudiants sont appairés par groupe de deux et un mail les invite à se mettre d'accord sur la date et l'heure de leur madeleine café. Les mails mettent en contact les étudiants sont envoyés le lundi, toutes les deux semaines. Chaque réunion permet de rencontrer une nouvelle personne de sa promotion.</p>

            </div>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image rounded size='large' src='/assets/images/madeleine-cool.png'/>
          </Grid.Column>
        </Grid.Row>            
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='Liens Utiles' />
              <List link inverted>
                <List.Item as='a' href="/contact">Nous contacter</List.Item>
                <List.Item as='a' href="/privacy">Politique de confidentialité</List.Item>
                <List.Item as='a' href="/compte">Gérer mon compte</List.Item>
                <List.Item as='a' href="/conduite">Code de Conduite</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                À propos
              </Header>
              <p>
              Initiative proposée par l'équipe du Madeleine Café, un ensemble d'universitaires voulant renforcer le lien social en période d'enseignement à distance.
              </p>
              <p>Logiciel <a href="https://github.com/madeleine-cafe">Open-Source</a> développé avec ❤️ et données hébergées en 🇫🇷</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

const e = React.createElement;
export default e(HomepageLayout)