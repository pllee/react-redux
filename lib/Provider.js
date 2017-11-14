import { Component, Children } from 'react'
import * as PropTypes from 'prop-types'

export default class Provider extends Component {
    getChildContext() {
      return { store: this.store }
    }

    constructor(props, context) {
      super(props, context)
      //hold a reference to the store so child context's can reference it.
      this.store = props.store;
    }

    render() {
      return this.props.children;
    }
}

Provider.childContextTypes = {
    store: PropTypes.any
}