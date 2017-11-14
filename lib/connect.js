import { Component, createElement } from 'react';
import { bindActionCreators } from 'redux';
import * as PropTypes from 'prop-types';

const defaultMergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};

export default (mapStateToProps, mapDispatchToProps, mergeProps = defaultMergeProps) => {
  return function(WrappedComponent) {

    class Connect extends Component {

      constructor(props, context) {
        super(props, context);
        this.store = props.store || context.store;
        const dispatch = this.store.dispatch.bind(this.store);

        // mapDispatchToProps can be a function or an object that will be bound to dispatch
        // This end result of calling or binding mapDispatchToProps with dispatch only needs to be done once and is stored on the instance
        if (typeof mapDispatchToProps === 'function') {
          this.dispachedProps = mapDispatchToProps(dispatch, props);
        } else {
          this.dispachedProps = bindActionCreators(mapDispatchToProps, dispatch) || {};
        }

        this.dispachedProps.dispatch = dispatch;
      }

      /**
       * Render the passed in component with the latest connected properties.
       * Same as <WrappedComponent {...this.getConnectedProps()}.  Without using jsx.
       */
      render() {
        return createElement(WrappedComponent, this.getConnectedProps());
      }

      /**
       * Call mapStateToProps with the store's state and the connected Container's "ownProps".
       * Return the mergeProps which by default applies the applies the ownProps, stateProps and dispatch props over
       * each other but can be configured to do anything.
       */
      getConnectedProps() {
        const reduxStateProps = (mapStateToProps && mapStateToProps(this.store.getState(), this.props));
        return mergeProps(reduxStateProps, this.dispachedProps, this.props);
      }

      /**
       * Subscribe to the store's change "event".  For re-render when something has changed.
       * Start listening right before the initial render because the initial render already has the most up to 
       * date store state. (for all intents and purposes).
       */
      componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      /**
       * remove change listener when the container is getting deleted from the dom.
       */
      comonentWillUnmount() {
        this.unsubscribe();
        delete this.unsubscribe;
      }
    }

    //This is needed for context to work
    Connect.contextTypes = {
      store: PropTypes.any
    };

    return Connect;
  };
};
