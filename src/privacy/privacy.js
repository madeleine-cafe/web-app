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

const PrivacyPolicyLayout = () => (
      <Container text style={{ marginTop: '7em' }}>

            <Header as='h1' style={{ fontSize: '2em' }}> Politique de Confidentialité </Header>

            <p>Ce site est géré par Suzanne Vergnolle, à titre individuel, sans impliquer l’université à laquelle elle appartient. Les données collectées ainsi que les traitements dont elles sont susceptibles de faire l’objet sont décrits ci-dessous. Ce site ne se livre à aucune publicité ciblée. Il ne propose pas les boutons de partage des grands réseaux sociaux, car ils permettent à ces acteurs un suivi détaillé des utilisateurs tout au long de leur navigation.</p>
            <p><b>Données collectées. </b>
            Pour permettre l'organisation des réunions Madeleine Café, un formulaire collectant des données personnelles a été mis en place. Ce formulaire invite l'utilisateur a fournir des données de contact ainsi que des données liées à ses centres d'intérêt. Ces données sont traitées dans le seul objectif de proposer aux utilisateurs la mise en place d'une réunion.
            </p>

            <List as='ul'>
                <List.Item as='li'>Les données de contact collectées par le formulaire se limitent à une adresse email de l'université de l'étudiant, la discipline, l'année d'étude, et un prénom ou un pseudo.
                    <List.List as='ul'>
                    <List.Item as='li'>Pour éviter des inscriptions abusives de personnes extérieures, nous avons décidé de limiter la possibilité d'inscription aux personnes ayant une adresse email liée à une université.</List.Item>
                    </List.List>
                </List.Item>

                <List.Item as='li'>Les données liées aux centres d'intérêt sont collectées à partir d'une liste de centres d'intérêts pré-établie et à cocher. L'utilisateur est libre de la compléter. Cette collecte de données vise uniquement à essayer de mettre en place un madeleine café entre des personnes qui ont des centres d'intérêts communs.</List.Item>
            </List>

            <p><b>Base légale du traitement des données. </b>
            Nous traitons vos données sur la base du contrat. Nous vous proposons un service vous permettant de participer aux moments de convivialité de madeleine café. Pour cela, vous devez nous fournir quelques informations personnelles qui sont essentielles à la fourniture de ce service. Si vous souhaitez mettre fin à madeleine café, il vous suffit de vous désinscrire soit via le bouton « Gérer mon compte » sur le site, soit en écrivant à l'adresse < a href="mailto:contact@madeleine.cafe">contact@madeleine.cafe</a>.
            </p>
            <p><b>Utilisation des données. </b>
            Les données collectées sont traitées dans le seul objectif de mettre en place les réunions des madeleine café. Ces données permettent notamment de vous pairez avec une autres personne afin que vous partagiez un madeleine café. Cela passe notamment par un algorithme de jumelage permettant de déterminer quelles personnes seront invitées à se parler une certaine semaine et par l'envoi d'un email pour une première mise en contact. Elles ne sont pas traitées pour d'autres finalités, notamment publicitaire. 
            </p>

            <p><b>Envoi des mails. </b>
            L'envoi des mails est géré par l'entreprise <a href="https://www.mailgun.com/"> Mailgun Europe</a>. La politique de confidentialité de ce prestataire est disponible <a href="https://www.mailgun.com/privacy-policy/"> ici </a>. 
            </p>

            <p><b>Stockage des données. </b>
            Les données que vous nous avez confié sont stockées sur les serveurs de l'entreprise <a href="https://www.scaleway.com/fr/"> Scaleway</a>, en France. 
            </p>

            <p><b>Conservation des données. </b>
            Nous conservons les données pour la durée de l'année universitaire. Les données sont donc effacées chaque année au mois d'août. 
            </p>

            <p><b>Exercice des droits. </b>
            Les droits que vous tirez des articles 12 et suivants du règlement européen sur la protection des données (notamment le droit d’accéder à vos données, d’en obtenir la rectification ou l’effacement) peuvent être exercés directement sur le site via le bouton « Gérer mon compte » ou auprès de l'adresse < a href="mailto:contact@madeleine.cafe">contact@madeleine.cafe</a>.
            </p>

            <p><b>Autorité de contrôle. </b>
            Si vous estimez que vos droits ont été méconnus, je vous invite <a href="/contact>">à me contacter</a> avant toute autre démarche. Vous disposez également du droit de déposer une réclamation auprès de la CNIL.
            </p>

            <Segment>
                <p>
            Si vous souhaitez en savoir plus sur la nature des droits qui vous sont reconnus sur vos données, vous pouvez consulter <a href="http://enetter.fr/la-personne/chapitre-1-lidentite-numerique/section-2-la-protection-de-lidentite-numerique/ii-la-gestion-personnalisee-accessible-aux-individus/b-en-aval-de-la-collecte-des-donnees/">cette page du site de Monsieur Emmanuel Netter</a>, consacrée à cette question.
                </p>
            </Segment>
        </Container>
  )
  
  const e = React.createElement;
  export default e(PrivacyPolicyLayout)
