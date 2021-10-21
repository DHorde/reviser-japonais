import React from 'react'
import './Revision.css'
import { Container, Input, Button, Icon } from 'semantic-ui-react'
import { Row } from 'react-bootstrap'

export class Reponse extends React.Component {

    constructor(props) {
        super(props)
        const listeAlphabet = this.props.listeAlphabet.slice()
        let listeAlphaBase = []
        let listeAlphaAcc = []
        let listeAlphaCombi = []
        for(const item of listeAlphabet) {
            if (item.fields.type === 'base'){
                listeAlphaBase.push(item)
            } else if (item.fields.type === 'accent'){
                listeAlphaAcc.push(item)
            } else if (item.fields.type === 'combinaison'){
                listeAlphaCombi.push(item)
            }
        }
        this.state = {
            valueReponse: '',
            listeAlphabetReponse: [],
            typeAlpha: 'base',
            listeAlphaBase: listeAlphaBase,
            listeAlphaAccent: listeAlphaAcc,
            listeAlphaCombi: listeAlphaCombi
        }
        this.refInput = React.createRef();
        this.handleClickReponse = this.handleClickReponse.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onClickBase = this.onClickBase.bind(this)
        this.onClickAccent = this.onClickAccent.bind(this)
        this.onClickCombi = this.onClickCombi.bind(this)
        this.onClickTableau = this.onClickTableau.bind(this)
    }

    componentDidMount(){
        if(this.props.typeResponse === 2) {
            this.refInput.current.focus()
        }
        this.constructionTableau('base')
    }

    onClickBase(){
        this.constructionTableau('base')

    }
    onClickAccent() {
        this.constructionTableau('accent')

    }
    onClickCombi() {
        this.constructionTableau('combinaison')
        
    }

    onClickTableau(item) {
        if (item.motKana !== "") {
            const listeAfficher = this.state.listeAlphabetReponse.slice()
            for (const row of listeAfficher) {
                for (const lettre of row) {
                    if(item.Identifiant === lettre.Identifiant){
                        lettre.selected = "caseSelected"
                    } else {
                        lettre.selected = ""
                    }
                }
            }
            this.setState({
                listeAlphabetReponse: listeAfficher,
                valueReponse: item.motKana
            })
        }
    }

    ajouterVideTableau() {
        const listeAlphabet = this.props.listeAlphabet.slice()
        let numIdentMax = this.props.listeAlphabet.length + 1
        const objetBase = {
            fields: {
                motKana: "",
                motRomaji: "",
                type: "base"
            }
        }
        const objetCombi = {
            fields: {
                motKana: "",
                motRomaji: "",
                type: "combinaison"
            }
        }
        const numeroIdentVide = [36, 38, 46, 47, 48, 50, 51, 52, 53]
        for (const num of numeroIdentVide) {
            const object = {...objetBase}
            object.fields = {...object.fields, Identifiant: numIdentMax.toString()}
            listeAlphabet.splice(num, 0, object)
            numIdentMax++
        }
        let milieu = false
        for(let i=81; i < listeAlphabet.length; i=i+2) {
            const object = {...objetCombi}
            object.fields = {...object.fields, Identifiant: numIdentMax.toString()}
            listeAlphabet.splice(i, 0, object)
            numIdentMax++
            if(milieu){
                i++
                milieu = !milieu
            }else {
                milieu = !milieu
            }
        }
        return listeAlphabet
    }

    constructionTableau(type) {
        const listeAFaire = type === 'base' ? this.state.listeAlphaBase : (type === 'accent' ? this.state.listeAlphaAccent : this.state.listeAlphaCombi)
        let listeConstruite = []
        for(let i=0; i < listeAFaire.length; i=i+7) {
            const row = []
            for(let j=0; j < 7; j++) {
                if (listeAFaire[i+j]) {
                    row.push({...listeAFaire[i+j].fields, selected: ""})
                }
            }
            listeConstruite.push(row)
        }
        this.setState({
            typeAlpha: type,
            listeAlphabetReponse: listeConstruite
        })
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
          this.handleClickReponse();
        }
    }

    resetTableau() {
        const listeAfficher = this.state.listeAlphabetReponse.slice()
        for (const row of listeAfficher) {
            for (const lettre of row) {
                lettre.selected = ""
            }
        }
        this.setState({
            listeAlphabetReponse: listeAfficher,
        })
    }

    handleClickReponse() {
        this.props.envoiReponse(this.state.valueReponse)
        this.setState({
            valueReponse : ""
        })
        if(this.props.typeResponse === 2) {
            this.refInput.current.focus()
        } else {
            this.resetTableau()
        }  
    }

    handleChange(event) {
        this.setState({valueReponse: event.target.value});
    }

    render() {
        let reponse = null
        if(this.props.typeResponse === 2) {
            reponse = (<Row className="justify-content-md-center mt-3">
                <Input ref={this.refInput} placeholder='Réponse' onKeyPress={this.onKeyUp} value={this.state.valueReponse} onChange={this.handleChange}/>
                <Button icon primary className="round-btn ml-2" onClick={this.handleClickReponse}>
                    <Icon name="angle right"></Icon>
                </Button>
            </Row>)
        } else {
            reponse = (<Container>
            <Row className="justify-content-md-center mt-3">
            <Button.Group>
                <Button disabled={this.state.listeAlphaBase.length === 0} onClick={this.onClickBase}>Base</Button>
                <Button disabled={this.state.listeAlphaAccent.length === 0} onClick={this.onClickAccent}>Accent</Button>
                <Button disabled={this.state.listeAlphaCombi.length === 0} onClick={this.onClickCombi}>Combinaison</Button>
            </Button.Group>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <div>
                    <table>
                    <tbody>
                        {this.state.listeAlphabetReponse.map((item, index) => {
                        return (
                            <tr key={index}>
                                {item.map((subItem, subIndex) => {
                                    if(subItem.type === this.state.typeAlpha) {
                                        return (
                                            <td key={subItem.Identifiant} className={subItem.selected + ' tableauReponse'} onClick={() => this.onClickTableau(subItem)}>{subItem.motKana}</td>
                                        )
                                    }
                                    return null
                                })}
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
                <div>
                    <Button icon primary className="round-btn ml-2" onClick={this.handleClickReponse}>
                        <Icon name="angle right"></Icon>
                    </Button>
                </div>
            </Row>
            </Container>)
        }

        return <Container>
            {reponse}
        </Container>
    }
}