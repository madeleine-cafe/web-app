import * as React from 'react';
import * as ReactDOM from 'react-dom';
import API_HOSTNAME from './hostname.js'
import { Checkbox, Form, Button, Select, Header } from 'semantic-ui-react'

'use strict';
const e = React.createElement;

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContinuer = this.handleContinuer.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleToggleInterest = this.handleToggleInterest.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleDisciplineChange = this.handleDisciplineChange.bind(this);

    this.state = {signupDone: false}

    fetch(API_HOSTNAME + '/allow_listed_email_suffixes')
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        //console.log("Allowed subdomains are:" + data)
        this.setState({ allowedSuffixes: data })
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  handleYearChange(event, result) {
    console.log("Set year to: " + result.value)
    this.setState({ year: result.value});
  }

  handleDisciplineChange(event, result) {
    console.log("Set discipline to: " + result.value)
    this.setState({ discipline: result.value});
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleToggleInterest(event, data){
    const interest = data.label.key
    var currentList = this.state.interests

    if (data.checked) {
      // We need to add it to the interest list
      currentList.push(interest)
      this.setState({ interests: currentList });
    } else {
      // We need to remove it from the interest list
      const index = currentList.indexOf(interest);
      if (index > -1) {
        currentList.splice(index, 1);
      }
      this.setState({ interests: currentList });
    }

    console.log("Updated Interest List to: " + currentList)
  }

  handleSignup(event) {
    var bodyJSON = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      interests: this.state.interests,
      year: this.state.year,
      discipline: this.state.discipline
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyJSON
    }
    const suffix = this.state.email.substring(this.state.email.lastIndexOf("@") + 1);

    fetch(API_HOSTNAME + "/signup", requestOptions)
      .then(response => {
        if (response.status == 200) {
          this.setState( {signupDone: true })
        } else if (response.status == 409) {
          alert("Un compte existe déjà pour cette addresse email.")
        } else {
          alert("L'inscription a échoué, vérifiez que tous les champs requis ont été saisis.")
        }
      });
  
    event.preventDefault();  
  }

  handleContinuer(event) {
    var suffix = this.state.email.substring(this.state.email.lastIndexOf("@") + 1);
    if (this.state.allowedSuffixes.includes(suffix)) {
      this.setState({ isValidEmail: true });
      
      fetch(API_HOSTNAME + "/signup_options/" + suffix)
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
            discipline_options: data.disciplines.map(x => ({ "key": x, "text": x, "value": x })),
            school_years_options: data.school_years.map(x => ({ "key": x, "text": x, "value": x })),
            interests_options: data.interests.map(x => ({ "key": x, "text": x, "value": x }))
          })

          if (this.state.discipline_options.length == 1) {
            this.setState({discipline:this.state.discipline_options[0].key})
          }
          
          if (this.state.school_years_options.length == 1) {
            this.setState({year: this.state.school_years_options[0].key})
          }
          this.setState({interests: []});
        }).catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
        });
    } else {
      alert("Veuillez vérifier que vous avez inscrit votre adresse email universitaire (cela permet d'éviter à des tiers de s'inscrire). Il est également possible que Madeleine Café ne soit pas encore disponible pour votre fac. N'hésitez pas à encourager vos enseignants à nous contacter.");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
      {(this.state.signupDone) && 
        <Header as='h3' content="L'enregistrement à Madeleine Café a bien été reçu. Cliquez sur le mail de confirmation pour finaliser l'inscription."/>
      }

      {!this.state.signupDone &&
        <form onSubmit={this.handleSignup}>
        <div class="ui form">
          <Form.Field required>
            <label>Addresse e-mail de la faculté</label>
            <input autoComplete="off" disabled={!this.state.allowedSuffixes || this.state.isValidEmail} type="email" placeholder="E-mail" onChange={this.handleEmailChange} />
          </Form.Field>
          {(!this.state.isValidEmail && this.state.allowedSuffixes) &&
            <Form.Button primary onClick={this.handleContinuer}>Continuer</Form.Button>
          }
          {(this.state.discipline_options) &&
            <div>
              {this.state.discipline_options &&
              <div>
                <Form.Field required>
                <label>Discipline. Si votre domaine d'étude n'est pas listé, écrivez à <a href="mailto:contact@madeleine.cafe">contact@madeleine.cafe</a></label>
                <Select value={this.state.discipline} placeholder='Sélectionnez votre Discipline' onChange={this.handleDisciplineChange} options={this.state.discipline_options} />
              </Form.Field>
              <Form.Field required>
                <label>Année d'étude</label>
                <Select value={this.state.year} placeholder='Sélectionnez votre année' onChange={this.handleYearChange} options={this.state.school_years_options} />
              </Form.Field>
              </div>
              }
              <Form.Field required>
                <label>Prénom ou Pseudo</label>
                <input type="text" placeholder="Prénom" value={this.state.name} onChange={this.handleNameChange} />
              </Form.Field>
              <Form.Field>
                <label>Intérêts (optionnels). Cette liste nous aide à proposer des madeleines cafés aux personnes ayant des intérêts communs</label>
                <Form.Group grouped>
                  {this.state.interests_options.map((value) => {
                    return (
                      <Form.Field key={value.key}>
                        <Checkbox onChange={this.handleToggleInterest} key={value.key} label={<label key={value.key}>{value.text}</label>} />
                      </Form.Field>
                    )
                  })}
                </Form.Group>
              </Form.Field>
              <Form.Button primary onClick={this.handleSignup} >S'enregistrer</Form.Button>
            </div>
          }
        </div>
      </form>
      }
      </div>
    );
  }
}

export default e(NameForm)