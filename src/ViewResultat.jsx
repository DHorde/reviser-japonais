import React from 'react'
import './Revision.css'
import { Container, Button} from 'semantic-ui-react'
import { Row } from 'react-bootstrap'

export class ViewResultat extends React.Component {
    constructor(props) {
        super(props)

        this.handleClickRestart = this.handleClickRestart.bind(this)
        this.handleClickAccueil = this.handleClickAccueil.bind(this)
    }

    handleClickAccueil() {
        this.props.handleClickAccueil()
    }

    handleClickRestart() {
        this.props.handleClickRestart()
    }

    render() {
        var namesList = (<div>
            <table>
            <thead>
                <tr>
                    <th>Votre Réponse</th>
                    <th>Romaji</th>
                    <th>Kana</th>
                </tr>
            </thead>
              <tbody>
                {this.props.listeReponse.map((item, index) => {
                  return (
                    <tr >
                      <td key={index + "1"} className={item.resultatReponse}>{item.reponse}</td>
                      <td key={index + "2"} >{item.motRomaji}</td>
                      <td key={index + "3"}>{item.motKana}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>)
        return <Container>
            <Row className="justify-content-md-center mt-3">
                <label >Bravo, vous avez eu {this.props.bonneReponse} bonnes réponses</label>
            </Row>
            <Row className="justify-content-md-center mt-3">
                {namesList}
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Button secondary className="mr-3" onClick={this.handleClickAccueil}>Accueil</Button>
                <Button primary onClick={this.handleClickRestart}>Nouvelle liste</Button>
            </Row>
        </Container>
    }
}