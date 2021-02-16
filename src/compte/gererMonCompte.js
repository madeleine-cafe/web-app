import * as React from 'react';
import * as ReactDOM from 'react-dom';
import API_HOSTNAME from '../participer/hostname.js'
import { Checkbox, Form, Button, Select, Header, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { NIL } from 'uuid';

'use strict';
const e = React.createElement;

class GererMonCompteElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.loadSettingsForToken = this.loadSettingsForToken.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   
    let token = urlParams.get("token")
    if (token != null) {
      this.state = { authToken: token};
      let action = urlParams.get("action")
      if (action == "activer") {
        this.handleActivation(token)
      } else {
        this.loadSettingsForToken(token);
      }
    } else {
      this.state = {}
    } 
  }

  handleChanges(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name
      })
    }

    fetch(API_HOSTNAME + "/account/update/"+ this.state.authToken, requestOptions)
      .then(response => {
        if (response.status == 200) {
          alert("Le compte a bien été mis à jour.")
        } else {
          alert("Une erreur est survenue lors de la mise à jour du compte.")
        }
      });
    event.preventDefault();  
  }

  handleDelete(event){    
    fetch(API_HOSTNAME + "/account/delete/"+ this.state.authToken)
      .then(response => {
        if (response.status == 200) {
          this.setState( { 
            accountDeleted: true,
            accountData: undefined
           })
        } else {
          alert("Une erreur est survenue lors de la suppression du compte. Veuillez nous contacter à contact@madeleine.cafe.")
        }
      });
    event.preventDefault();  
  }

  handleActivation(token) {
    fetch(API_HOSTNAME + "/account/activate/" + token)
    .then(async response => {
      if (!response.ok) {
        alert("Le compte n'a pas pu être activé.")
        return
      }
      this.setState({ accountActivated: true})
    }).catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  loadSettingsForToken(token) {
    fetch(API_HOSTNAME + "/account/" + token)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          console
          return Promise.reject(error);
        }
        this.setState({ 
          accountData: data,
          name: data.name
        });
      }).catch(error => {
        this.setState({ errorMessage: "Une erreur est survenue en essayant de charger les détails du compte. Celui-ci semble avoir été effacé." });
      });
  }

  handleAuth(event) {
    event.preventDefault()

    fetch(API_HOSTNAME + "/account/auth/" + this.state.email)
    .then(async response => {
      // check for error response
      if (!response.ok) {
        alert("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.")
        return
      }
      alert("Un email de confirmation va être envoyé si un compte existe sur madeleine.café avec celle-ci.")
    }).catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
    
  }
  
  render() {
    return (
      <div>
      {(!this.state.authToken) && 
        <div>
        <Header as='h2' content='Authentification Requise' />
        <form onSubmit={this.handleAuth}>
        <div class="ui form">
          <Form.Field required>
            <label>Addresse e-mail</label>
            <input autoComplete="off" disabled={this.state.isValidEmail} type="email" placeholder="E-mail" onChange={this.handleEmailChange} />
          </Form.Field>
          <Form.Button primary onClick={this.handleAuth}>Continuer</Form.Button>
          </div>
        </form>
        </div>
      }
      {(this.state.authToken) && 
        <div>
          {(this.state.errorMessage) &&
            <Header as='h3' content={this.state.errorMessage}/>
          }
          {(this.state.accountActivated) &&
            <div>
            <Header as='h2' content="Votre compte a bien été activé !"/>
            <Header as='h3' content="Nous vous enverrons un mail d'ici quelques jours pour programmer votre premier Madeleine Café." />
            </div>
          }
          {(this.state.accountDeleted) &&
            <Header as='h3' content="Votre compte a bien été supprimé !"/>
          }
          {!(this.state.accountData || this.state.errorMessage || this.state.accountActivated || this.state.accountDeleted) && 
            <div>
            <Header as='h2' content='Paramètres de Compte' />
            <Dimmer inverted active>
                <Loader inverted>Chargement des paramètres de compte</Loader>
            </Dimmer>
            </div>
          }
          {(this.state.accountData && this.state.accountDeleted != true) && 
            <div>
              <form onSubmit={this.handleAuth}>
                <div class="ui form">
                  <Form.Field required>
                    <label>Prénom ou Pseudo</label>
                    <input autoComplete="off" value={this.state.name} onChange={this.handleNameChange} />
                  </Form.Field>
                </div>
              </form>
              <Segment>
              <Button primary onClick={this.handleChanges}>Enregistrer les changements</Button>
              <Button negative onClick={this.handleDelete}>Effacer Mon Compte</Button>
              </Segment>
            </div>
          }
        </div>
      }
      </div>
    );
  }
}

export default e(GererMonCompteElement)