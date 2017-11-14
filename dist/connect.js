"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const redux_1 = require("redux");
const PropTypes = require("prop-types");
const defaultMergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
};
exports.default = (mapStateToProps, mapDispatchToProps, mergeProps = defaultMergeProps) => {
    return function (WrappedComponent) {
        class Connect extends react_1.Component {
            constructor(props, context) {
                super(props, context);
                this.store = props.store || context.store;
                const dispatch = this.store.dispatch.bind(this.store);
                // mapDispatchToProps can be a function or an object that will be bound to dispatch
                // This end result of calling or binding mapDispatchToProps with dispatch only needs to be done once and is stored on the instance
                if (typeof mapDispatchToProps === 'function') {
                    this.dispachedProps = mapDispatchToProps(dispatch, props);
                }
                else {
                    this.dispachedProps = redux_1.bindActionCreators(mapDispatchToProps, dispatch) || {};
                }
                this.dispachedProps.dispatch = dispatch;
            }
            /**
             * Render the passed in component with the latest connected properties.
             * Same as <WrappedComponent {...this.getConnectedProps()}.  Without using jsx.
             */
            render() {
                return react_1.createElement(WrappedComponent, this.getConnectedProps());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9jb25uZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlEO0FBQ2pELGlDQUEyQztBQUMzQyx3Q0FBd0M7QUFFeEMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDaEUsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxHQUFHLGlCQUFpQixFQUFFLEVBQUU7SUFDckYsTUFBTSxDQUFDLFVBQVMsZ0JBQWdCO1FBRTlCLGFBQWMsU0FBUSxpQkFBUztZQUU3QixZQUFZLEtBQUssRUFBRSxPQUFPO2dCQUN4QixLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdEQsbUZBQW1GO2dCQUNuRixrSUFBa0k7Z0JBQ2xJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sa0JBQWtCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRywwQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9FLENBQUM7Z0JBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzFDLENBQUM7WUFFRDs7O2VBR0c7WUFDSCxNQUFNO2dCQUNKLE1BQU0sQ0FBQyxxQkFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUVEOzs7O2VBSUc7WUFDSCxpQkFBaUI7Z0JBQ2YsTUFBTSxlQUFlLEdBQUcsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFFRDs7OztlQUlHO1lBQ0gsaUJBQWlCO2dCQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO29CQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVEOztlQUVHO1lBQ0gsbUJBQW1CO2dCQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQixDQUFDO1NBQ0Y7UUFFRCxvQ0FBb0M7UUFDcEMsT0FBTyxDQUFDLFlBQVksR0FBRztZQUNyQixLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUc7U0FDckIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0ICogYXMgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBkZWZhdWx0TWVyZ2VQcm9wcyA9IChzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb3duUHJvcHMsIHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzID0gZGVmYXVsdE1lcmdlUHJvcHMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKFdyYXBwZWRDb21wb25lbnQpIHtcblxuICAgIGNsYXNzIENvbm5lY3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBwcm9wcy5zdG9yZSB8fCBjb250ZXh0LnN0b3JlO1xuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHRoaXMuc3RvcmUuZGlzcGF0Y2guYmluZCh0aGlzLnN0b3JlKTtcblxuICAgICAgICAvLyBtYXBEaXNwYXRjaFRvUHJvcHMgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYW4gb2JqZWN0IHRoYXQgd2lsbCBiZSBib3VuZCB0byBkaXNwYXRjaFxuICAgICAgICAvLyBUaGlzIGVuZCByZXN1bHQgb2YgY2FsbGluZyBvciBiaW5kaW5nIG1hcERpc3BhdGNoVG9Qcm9wcyB3aXRoIGRpc3BhdGNoIG9ubHkgbmVlZHMgdG8gYmUgZG9uZSBvbmNlIGFuZCBpcyBzdG9yZWQgb24gdGhlIGluc3RhbmNlXG4gICAgICAgIGlmICh0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYWNoZWRQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgcHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGFjaGVkUHJvcHMgPSBiaW5kQWN0aW9uQ3JlYXRvcnMobWFwRGlzcGF0Y2hUb1Byb3BzLCBkaXNwYXRjaCkgfHwge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhY2hlZFByb3BzLmRpc3BhdGNoID0gZGlzcGF0Y2g7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVuZGVyIHRoZSBwYXNzZWQgaW4gY29tcG9uZW50IHdpdGggdGhlIGxhdGVzdCBjb25uZWN0ZWQgcHJvcGVydGllcy5cbiAgICAgICAqIFNhbWUgYXMgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMuZ2V0Q29ubmVjdGVkUHJvcHMoKX0uICBXaXRob3V0IHVzaW5nIGpzeC5cbiAgICAgICAqL1xuICAgICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCB0aGlzLmdldENvbm5lY3RlZFByb3BzKCkpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIENhbGwgbWFwU3RhdGVUb1Byb3BzIHdpdGggdGhlIHN0b3JlJ3Mgc3RhdGUgYW5kIHRoZSBjb25uZWN0ZWQgQ29udGFpbmVyJ3MgXCJvd25Qcm9wc1wiLlxuICAgICAgICogUmV0dXJuIHRoZSBtZXJnZVByb3BzIHdoaWNoIGJ5IGRlZmF1bHQgYXBwbGllcyB0aGUgYXBwbGllcyB0aGUgb3duUHJvcHMsIHN0YXRlUHJvcHMgYW5kIGRpc3BhdGNoIHByb3BzIG92ZXJcbiAgICAgICAqIGVhY2ggb3RoZXIgYnV0IGNhbiBiZSBjb25maWd1cmVkIHRvIGRvIGFueXRoaW5nLlxuICAgICAgICovXG4gICAgICBnZXRDb25uZWN0ZWRQcm9wcygpIHtcbiAgICAgICAgY29uc3QgcmVkdXhTdGF0ZVByb3BzID0gKG1hcFN0YXRlVG9Qcm9wcyAmJiBtYXBTdGF0ZVRvUHJvcHModGhpcy5zdG9yZS5nZXRTdGF0ZSgpLCB0aGlzLnByb3BzKSk7XG4gICAgICAgIHJldHVybiBtZXJnZVByb3BzKHJlZHV4U3RhdGVQcm9wcywgdGhpcy5kaXNwYWNoZWRQcm9wcywgdGhpcy5wcm9wcyk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogU3Vic2NyaWJlIHRvIHRoZSBzdG9yZSdzIGNoYW5nZSBcImV2ZW50XCIuICBGb3IgcmUtcmVuZGVyIHdoZW4gc29tZXRoaW5nIGhhcyBjaGFuZ2VkLlxuICAgICAgICogU3RhcnQgbGlzdGVuaW5nIHJpZ2h0IGJlZm9yZSB0aGUgaW5pdGlhbCByZW5kZXIgYmVjYXVzZSB0aGUgaW5pdGlhbCByZW5kZXIgYWxyZWFkeSBoYXMgdGhlIG1vc3QgdXAgdG8gXG4gICAgICAgKiBkYXRlIHN0b3JlIHN0YXRlLiAoZm9yIGFsbCBpbnRlbnRzIGFuZCBwdXJwb3NlcykuXG4gICAgICAgKi9cbiAgICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlID0gdGhpcy5zdG9yZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogcmVtb3ZlIGNoYW5nZSBsaXN0ZW5lciB3aGVuIHRoZSBjb250YWluZXIgaXMgZ2V0dGluZyBkZWxldGVkIGZyb20gdGhlIGRvbS5cbiAgICAgICAqL1xuICAgICAgY29tb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy51bnN1YnNjcmliZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1RoaXMgaXMgbmVlZGVkIGZvciBjb250ZXh0IHRvIHdvcmtcbiAgICBDb25uZWN0LmNvbnRleHRUeXBlcyA9IHtcbiAgICAgIHN0b3JlOiBQcm9wVHlwZXMuYW55XG4gICAgfTtcblxuICAgIHJldHVybiBDb25uZWN0O1xuICB9O1xufTtcbiJdfQ==