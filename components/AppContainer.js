import React from 'react'
import { buildDOM } from '../utils/generics'

export class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    this.props.state$.subscribe(
      newState => this.setState(newState)
    )
    this.props.state$.subscribe(
      newState => console.log(newState)
    )
  }

  render() {
    return buildDOM(this.props.lead)(this.state)
  }
}