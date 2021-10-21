import React from 'react';
import ReactDOM from 'react-dom';
import {Revision} from './Revision'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Accueil } from './Accueil';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ModalContact} from './ModalContact';
import { Button } from 'react-bootstrap';
import { ToastProvider, useToasts } from 'react-toast-notifications'

var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
}

var phantom = {
display: 'block',
padding: '20px',
height: '60px',
width: '100%',
}

function Footer() {
  const [modalShow, setModalShow] = React.useState(false);
  const { addToast } = useToasts()
  return (
      <div>
          <div style={phantom} />
          <div style={style}>
              Idée ou problème sur l'application, contactes moi : <Button className="linkFooter" variant="link" onClick={() => setModalShow(true)}>Contacter</Button> 
          </div>
          <ModalContact show={modalShow}
          onNotif={(type, message) => addToast(message, {
              appearance: type,
              autoDismiss: true,
            })}
          onHide={() => setModalShow(false)}/>
      </div>
  )
}

class Header extends React.Component {
  render() {
   return <div className='header'>
      <span className='title'>Réviser son japonais</span>
      <span className='subtitle'>Révisons les alphabets syllabiques de la langue japonaise</span>
   </div>
  }
}

class Body extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 'accueil',
      langueDe: null,
      langueVers: null,
      alphabetSel: null,
      listeChoixType: []
    }
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(newPage, langueDeSel, langueVersSel, alphabetSel, listeChoixType){
    console.log('new page', newPage)
    this.setState({
      page: newPage,
      langueDe: langueDeSel,
      langueVers: langueVersSel,
      alphabetSel: alphabetSel,
      listeChoixType: listeChoixType
    })
  }

  render() {
    var render = null
    if(this.state.page === 'accueil') {
        render = (<Accueil onChangePage={this.onChangePage}/>)
    } else if (this.state.page === 'revision') {
        render = (<Revision onChangePage={this.onChangePage} 
          listeChoixType={this.state.listeChoixType}
          alphabetSelect={this.state.alphabetSel}
          langueDe={this.state.langueDe} langueVers={this.state.langueVers}/>)
    }   
    return <Container>
      {render}
    </Container>
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Header/>
      <Body/>
      <Footer/>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
