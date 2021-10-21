import React from 'react'
import emailjs from 'emailjs-com'
import './index.css'
import { Input, TextArea, Form } from 'semantic-ui-react'
import { Button, Modal } from 'react-bootstrap'

var serviceId = process.env.REACT_APP_SERVICEID
var templateId = process.env.REACT_APP_TEMPLATEID
var userId = process.env.REACT_APP_USERID


export class ModalContact extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            valueNomPrenom: '',
            valueEmail: '',
            valueDemande: '',
            showError: false
        }
        this.handleEnvoyer = this.handleEnvoyer.bind(this)
        this.handleChangeNom = this.handleChangeNom.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeDemande = this.handleChangeDemande.bind(this)
    }

    handleEnvoyer() {
        const templateParams = {
            nom: this.state.valueNomPrenom,
            email: this.state.valueEmail,
            demande: this.state.valueDemande
        }
        if(this.state.showError) {
            this.props.onHide();
            emailjs.send(serviceId, templateId, templateParams, userId).then(response => {
                console.log('SUCCESS!', response.status, response.text);
                this.props.onNotif('success', 'Votre mail a bien été envoyé')
            }, error => {
                console.log('FAILED...', error);
                this.props.onNotif('error', 'Une erreur s\'est produite. Votre mail n\'a pas été envoyé')
            });
        }
    }

    handleChangeNom(event) {
        const calcShowError = this.chcekShowError('nom', event.target.value);
        this.setState({
            valueNomPrenom: event.target.value,
            showError: calcShowError
        });
    }

    handleChangeEmail(event) {
        const calcShowError = this.chcekShowError('email', event.target.value);
        this.setState({
            valueEmail: event.target.value,
            showError: calcShowError
        });
    }

    handleChangeDemande(event) {
        const calcShowError = this.chcekShowError('demande', event.target.value);
        this.setState({
            valueDemande: event.target.value,
            showError: calcShowError
        });
    }

    verifMail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    chcekShowError(origine, value) {
        switch(origine) {
            case 'nom':
                if(value && this.state.valueEmail && this.state.valueDemande) {
                    return true
                } else {
                    return false
                }
            case 'email':
                if(value && this.state.valueNomPrenom && this.state.valueDemande && this.verifMail(value)) {
                    return true
                } else {
                    return false
                }
            case 'demande':
                if(value && this.state.valueEmail && this.state.valueNomPrenom) {
                    return true
                } else {
                    return false
                }
            default:
                return false
        }
    }

    render() { 
        return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Input className="mr-2" placeholder='Nom Prénom' value={this.state.valueNomPrenom} onChange={this.handleChangeNom}/>
            <Input className="" placeholder='Email' value={this.state.valueEmail} onChange={this.handleChangeEmail}/>
            <Form>
                <TextArea className="mt-2" placeholder='Votre message' value={this.state.valueDemande} onChange={this.handleChangeDemande}/>
            </Form>
            <label className="labelError mt-1" hidden={this.state.showError}>Remplisser tous les champs</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Annuler
          </Button>
          <Button variant="primary" onClick={this.handleEnvoyer}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}