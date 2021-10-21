import React from 'react'
import './ChoixListeDeroulante.css'
import { Container, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'


export class ChoixListeDeroulante extends React.Component {

    constructor(props) {
        super(props)
        this.handleOnChange = this.handleOnChange.bind(this)
      }

    handleOnChange(e, {value}) {
        this.props.onChangeAlphabet(value)
    }

    render() {
        return <Container className='divListeDeroulante'>
            <Row className="justify-content-md-center">
                <Col className='align-middle' xs='auto' lg="auto">{this.props.titre}</Col>
                <Col xs='auto' lg="auto">
                    <Dropdown
                    placeholder={this.props.placeholder}
                    selection
                    options={this.props.listeDonnee}
                    onChange={this.handleOnChange}
                /></Col>
            </Row>
        </Container>
    }
}

export class ListeDeroulanteGroup extends React.Component {
    constructor(props) {
        super(props)
        this.handleOnChange = this.handleOnChange.bind(this)
      }

    handleOnChange(e, {value}) {
        this.props.onChangeAlphabet(value)
    }

    render() {
        return <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">{this.props.prepend}</InputGroup.Text>
            </InputGroup.Prepend>
            <Dropdown 
                placeholder={this.props.placeholder}
                selection 
                options={this.props.listeDonnee}
                onChange={this.handleOnChange}
                />
        </InputGroup>
    }
}