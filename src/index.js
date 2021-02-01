import "./semantic-ui/semantic.min.css";
import NameFormElement from "./participer/sign_up_form.js"
import * as ReactDOM from 'react-dom';

var domContainer = document.querySelector('#sign_up_email_validation_container');
if (domContainer != null) {
    ReactDOM.render(NameFormElement, domContainer);
}

import HomepageLayout from "./index_page.js"
domContainer = document.querySelector('#index2_container');
if (domContainer != null) {
    ReactDOM.render(HomepageLayout, domContainer);
}

import PrivacyPolicyLayout from "./privacy/privacy.js"
domContainer = document.querySelector('#privacy_container');
if (domContainer != null) {
    ReactDOM.render(PrivacyPolicyLayout, domContainer);
}

import ContactLayout from "./contact/contact.js"
domContainer = document.querySelector('#contact_container');
if (domContainer != null) {
    ReactDOM.render(ContactLayout, domContainer);
}

import GererMonCompteElement from "./compte/gererMonCompte.js"
domContainer = document.querySelector('#gerer_mon_compte_container');
if (domContainer != null) {
    ReactDOM.render(GererMonCompteElement, domContainer);
}

import ConduiteLayout from "./conduite/conduite.js"
domContainer = document.querySelector('#conduite_container');
if (domContainer != null) {
    ReactDOM.render(ConduiteLayout, domContainer);
}