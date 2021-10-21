import React from 'react'
import './Accueil.css'
import { Container, Checkbox } from 'semantic-ui-react'
import { Row, Col, Button, Toast } from 'react-bootstrap'
import { ChoixListeDeroulante, ListeDeroulanteGroup } from './ChoixListeDeroulante'

const LISTEALPHABET = [
    {
        text: 'Hiragana',
        value: 1
    },
    {
        text: 'Katakana',
        value: 2
    }
]

const TYPELANGUE = [
    {
        text: 'Symbole',
        value: 1
    },
    {
        text: 'Text',
        value: 2
    }
]

function ChoixCheckBox(props) {
    return (
        <Row className='justify-content-md-center mt-5'>
            <Checkbox className="mr-2" onChange={props.clickBase} checked={props.checkBase} label='Base' />
            <Checkbox className="mr-2" onChange={props.clickAccent} checked={props.checkAccent} label='Accent' />
            <Checkbox className="mr-2" onChange={props.clickCombi} checked={props.checkCombi} label='Combinaison' />
        </Row>
    );
}

class ChoixRevision extends React.Component {

    constructor(props) {
        super(props)
        this.onChangeAlphabet = this.onChangeAlphabet.bind(this)
    }

    onChangeAlphabet(value) {
        this.props.onChangeAlphabet(LISTEALPHABET.find(elem => elem.value === value))
    }

    render() {
        return <Container className="mt-5">
            <ChoixListeDeroulante titre='Je révise les : ' placeholder='Sélectionner un alphabet' listeDonnee ={LISTEALPHABET} onChangeAlphabet={this.onChangeAlphabet} />
        </Container>
    }
}

class ChoixSensLangage extends React.Component {
    constructor(props) {
        super(props)
        
        this.onChangeDe = this.onChangeDe.bind(this)
        this.onChangeVers = this.onChangeVers.bind(this)
    }

    onChangeDe(value) {
        this.props.onChangeDe(value)
    }

    onChangeVers(value) {
        this.props.onChangeVers(value)
    }
    render() {
        return <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs='auto'><ListeDeroulanteGroup placeholder='Langue' prepend= 'De : ' listeDonnee ={this.props.listeDe} onChangeAlphabet={this.onChangeDe}/></Col>
                <Col xs='auto'><ListeDeroulanteGroup placeholder='Langue' prepend= 'Vers : ' listeDonnee ={this.props.listeVers} onChangeAlphabet={this.onChangeVers}/></Col>
            </Row>
        </Container>
    }
}



export class Accueil extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            alphabetSel: null,
            langueDeSel: null,
            langueVersSel: null,
            listeDe: TYPELANGUE,
            listeVers: TYPELANGUE,
            titreToaster: null,
            messageToaster: null,
            showToaster: false,
            checkBase: true,
            checkAccent: false,
            checkCombi: false
        }
        this.changeSelectionAlphabet = this.changeSelectionAlphabet.bind(this)
        this.changeDe = this.changeDe.bind(this)
        this.changeVers = this.changeVers.bind(this)
        this.handleClickCommencer = this.handleClickCommencer.bind(this)
        this.toggleShow = this.toggleShow.bind(this)
        this.onClickCombi = this.onClickCombi.bind(this)
        this.onClickBase = this.onClickBase.bind(this)
        this.onClickAccent = this.onClickAccent.bind(this)
    }

    onClickCombi() {
        this.setState({
            checkCombi: !this.state.checkCombi
        })
    }

    onClickBase() {
        this.setState({
            checkBase: !this.state.checkBase
        })
    }

    onClickAccent() {
        this.setState({
            checkAccent: !this.state.checkAccent
        })
    }

    changeSelectionAlphabet(newAlphabet) {
        this.setState({
            alphabetSel: newAlphabet
        })
        
    }

    changeVers(newAlphabet) {
        this.setState({
            langueVersSel: newAlphabet
        })
    }

    changeDe(newAlphabet) {
        this.setState({
            langueDeSel: newAlphabet
        })
    }

    handleClickCommencer() {
        const listeChoixType = []
        if(this.state.checkBase) {
            listeChoixType.push('base')
        }
        if(this.state.checkAccent) {
            listeChoixType.push('accent')
        }
        if(this.state.checkCombi) {
            listeChoixType.push('combinaison')
        }
        if (this.state.langueDeSel && this.state.langueVersSel && this.state.alphabetSel && listeChoixType.length > 0){
            if(this.state.langueVersSel === this.state.langueDeSel) {
                this.setState({
                    titreToaster: 'Attention',
                    messageToaster: 'Les deux langues doivent être différentes',
                    showToaster: true
                })
            } else {
                this.props.onChangePage('revision', this.state.langueDeSel, this.state.langueVersSel, this.state.alphabetSel, listeChoixType)
            }
        } else {
            this.setState({
                titreToaster: 'Attention',
                messageToaster: 'Vous devez sélectionner toutes les listes et au moins un type pour commencer',
                showToaster: true
            })
        }
    }

    toggleShow() {
        this.setState({
            showToaster: false
        })
    }

    render() {      
        return <Container> 
            <ChoixRevision onChangeAlphabet={this.changeSelectionAlphabet}/>
            <ChoixCheckBox checkBase={this.state.checkBase} checkAccent={this.state.checkAccent} checkCombi={this.state.checkCombi}
                clickBase={this.onClickBase} clickAccent={this.onClickAccent} clickCombi={this.onClickCombi}/>
            <ChoixSensLangage onChangeDe={this.changeDe} onChangeVers={this.changeVers} 
                            listeDe={this.state.listeDe} listeVers={this.state.listeVers}/>
            <Row className="justify-content-md-center mt-4">
                <Button variant="primary" onClick={this.handleClickCommencer}>Commencer</Button>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Toast className='toasterAccueil' show={this.state.showToaster} onClose={this.toggleShow}>
                    <Toast.Header>
                        <strong className="mr-auto">{this.state.titreToaster}</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.messageToaster}</Toast.Body>
                </Toast>
            </Row>
        </Container>
    }
}