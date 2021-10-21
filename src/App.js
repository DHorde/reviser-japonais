import './App.css';
import React from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Farenheit'
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function BoilingVerdict({celsius}) {
  if(celsius >= 100) {
    return <div className='alert alert-success'>L'eau bout</div>
  }
  return <div className='alert alert-info'>L'eau ne bout pas</div>
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
     this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const {temperature} = this.props
    const name = 'scale' + this.props.scale
    const scaleName = scaleNames[this.props.scale]
    return <div classN ame='form-group'>
      <label htmlFor={name}> Temperature en {scaleName}</label>
      <input type="text" id={name} value={temperature} className='form-control' onChange={this.handleChange}></input> 
    </div>
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: 'c',
      temperature: 20
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahreneitChange = this.handleFahreneitChange.bind(this)
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature
    })
  }

  handleFahreneitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature
    })
  }

  render() {
    const {temperature, scale} = this.state
    const celsius = scale === 'c' ? temperature : toCelsius(temperature)
    const fahrenheit = scale === 'f' ? temperature : toFahrenheit(celsius)
    return <div>
      <TemperatureInput scale="c" temperature= {celsius} onTemperatureChange={this.handleCelsiusChange}/>
      <TemperatureInput scale="f" temperature = {fahrenheit} onTemperatureChange={this.handleFahreneitChange}/>
      <BoilingVerdict celsius={temperature}/>
    </div>
  }
}

export class  App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      celsius: null,
      farenheit: null
    }
  }

  render() {
    return <div className='container mt-4'>
      <Calculator/>
    </div>
  }
}

