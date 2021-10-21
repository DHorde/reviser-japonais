import React from 'react'
import './Revision.css'
import { Container, Loader } from 'semantic-ui-react'
import { Row } from 'react-bootstrap'
import {Reponse} from './Reponse'
import {ViewResultat} from './ViewResultat'


var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.REACT_APP_AIRTABLEAPI
});
var base = Airtable.base('appmnYQG4QB8P4kJj');

const nbReponse = 8

class Resultat extends React.Component {
    render() {
        return <Container>
            <Row className="justify-content-md-center mt-2 ligneResult">
                {this.props.listeResultat.map((result) => (
                    <span key={result.num} className={"dot mr-2 " + result.resultat}>{result.num}</span>
                ))}
            </Row>
        </Container>
    }
}

class AffichageDevinette extends React.Component {
    render() {
        return <Container >
            <Row className="justify-content-md-center mt-3">
                <div className="textadeviner">
                    {this.props.text}
                </div>
            </Row>
        </Container>
    }
}

export class Revision extends React.Component {

    constructor(props) {
        super(props)
        const listeResult = this.buildListeResultat()
        this.state = {
            listeResultat: listeResult,
            textADeviner: "",
            listeAlphabet: null,
            listeADeviner: [],
            typeResponse: this.props.langueVers,
            numReponse: 0,
            viewResultat: false,
            nbBonneReponse: 0,
            listeReponseUser: [],
            listChoixType: this.props.listeChoixType
        }
        this.checkReponse = this.checkReponse.bind(this)
        this.clickAccueil = this.clickAccueil.bind(this)
        this.clickRestart = this.clickRestart.bind(this)
    }

    clickRestart() {
        const listeResult = this.buildListeResultat()
        const listeADeviner = []
        for (let i = 0; i < nbReponse; i++) {
            const random = Math.floor(Math.random() * this.state.listeAlphabet.length);
            listeADeviner.push(this.state.listeAlphabet[random])
        }
        let textADev = ''
        if (this.props.langueDe === 1) {
            textADev = listeADeviner[0].fields.motKana
        } else {
            textADev = listeADeviner[0].fields.motRomaji
        }
        this.setState({
            listeResultat: listeResult,
            listeADeviner: listeADeviner,
            textADeviner: textADev,
            viewResultat: false,
            numReponse: 0,
            nbBonneReponse: 0,
            listeReponseUser: []
        })
    }

    buildListeResultat() {
        const listeResult = []
        for (let i=1; i <= nbReponse; i++) {
            listeResult.push({
                num: i,
                resultat: i === 1 ? 'encours' : 'waiting'
            })
        }
        return listeResult
    }

    clickAccueil() {
        this.props.onChangePage('accueil', null, null, null, null)
    }

    componentDidMount() {
        base(this.props.alphabetSelect.text).select({view: this.props.alphabetSelect.text }).all().then((data) => {
            const listeADeviner = []
            const listAlphaChoixType = []
            for (const item of data) {
                if(this.state.listChoixType.includes(item.fields.type)) {
                    listAlphaChoixType.push(item)
                }
            }
            console.log(listAlphaChoixType)
            for (let i = 0; i < nbReponse; i++) {
                const random = Math.floor(Math.random() * listAlphaChoixType.length);
                listeADeviner.push(listAlphaChoixType[random])
            }
            let textADev = ''
            if (this.props.langueDe === 1) {
                textADev = listeADeviner[0].fields.motKana
            } else {
                textADev = listeADeviner[0].fields.motRomaji
            }
            this.setState({
                listeAlphabet: listAlphaChoixType,
                listeADeviner: listeADeviner,
                textADeviner: textADev
            })
        })
	}

    checkReponse(reponse) {
        const listeRes = this.state.listeResultat.slice()
        const listeReponseUs = this.state.listeReponseUser.slice()
        const numeroReponse = this.state.numReponse
        let viewResul = this.state.viewResultat
        let textADev = ''
        let nbBonneReponse = this.state.nbBonneReponse
        let resultatReponse = ''
        if (this.props.langueVers === 1) {
            if (this.state.listeADeviner[numeroReponse].fields.motKana === reponse) {
                resultatReponse = 'success'
                listeRes[numeroReponse].resultat = 'success'
                nbBonneReponse = nbBonneReponse + 1
            } else {
                resultatReponse = 'error'
                listeRes[numeroReponse].resultat = 'error'
            }
        } else {
            if (this.state.listeADeviner[numeroReponse].fields.motRomaji === reponse) {
                resultatReponse = 'success'
                listeRes[numeroReponse].resultat = 'success'
                nbBonneReponse = nbBonneReponse + 1
            } else {
                resultatReponse = 'error'
                listeRes[numeroReponse].resultat = 'error'
            }        
        }
        listeReponseUs.push({
            reponse: reponse,
            motRomaji: this.state.listeADeviner[numeroReponse].fields.motRomaji,
            motKana: this.state.listeADeviner[numeroReponse].fields.motKana,
            resultatReponse: resultatReponse
        })
        if (numeroReponse === nbReponse - 1) {
            viewResul = true
        }  else {
            listeRes[numeroReponse + 1].resultat = 'encours'
            if (this.props.langueDe === 1) {
                textADev = this.state.listeADeviner[numeroReponse + 1].fields.motKana
            } else {
                textADev = this.state.listeADeviner[numeroReponse + 1].fields.motRomaji
            }  
        }
        this.setState({
            numReponse: numeroReponse + 1,
            listeResultat: listeRes,
            textADeviner: textADev,
            viewResultat: viewResul,
            nbBonneReponse: nbBonneReponse,
            listeReponseUser: listeReponseUs
        })
    }

    render(){
        var viewResultat = null
        if (!this.state.viewResultat) {
            viewResultat = (<Container>
                <AffichageDevinette text={this.state.textADeviner}/>
                <Reponse typeResponse={this.state.typeResponse} 
                    listeAlphabet={this.state.listeAlphabet}
                    envoiReponse={this.checkReponse}/>
            </Container>)
        } else {
            viewResultat = (<Container>
                <ViewResultat bonneReponse={this.state.nbBonneReponse} 
                    listeReponse={this.state.listeReponseUser}
                    handleClickRestart={this.clickRestart} handleClickAccueil={this.clickAccueil}/>
            </Container>)
        }
        if (this.state.listeAlphabet) {
            return <Container className="justify-content-md-center mt-4">
                <Resultat listeResultat={this.state.listeResultat}/>
                {viewResultat}
            </Container>
        } else {
            return <Loader active>Loading</Loader>
        }
        
    }
}