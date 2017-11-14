"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PropTypes = require("prop-types");
class Provider extends react_1.Component {
    getChildContext() {
        return { store: this.store };
    }
    constructor(props, context) {
        super(props, context);
        //hold a reference to the store so child context's can reference it.
        this.store = props.store;
    }
    render() {
        return this.props.children;
    }
}
exports.default = Provider;
Provider.childContextTypes = {
    store: PropTypes.any
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvUHJvdmlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBMkM7QUFDM0Msd0NBQXVDO0FBRXZDLGNBQThCLFNBQVEsaUJBQVM7SUFDM0MsZUFBZTtRQUNiLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUVELFlBQVksS0FBSyxFQUFFLE9BQU87UUFDeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNyQixvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQWRELDJCQWNDO0FBRUQsUUFBUSxDQUFDLGlCQUFpQixHQUFHO0lBQ3pCLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRztDQUN2QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0ICogYXMgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3ZpZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICByZXR1cm4geyBzdG9yZTogdGhpcy5zdG9yZSB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxuICAgICAgLy9ob2xkIGEgcmVmZXJlbmNlIHRvIHRoZSBzdG9yZSBzbyBjaGlsZCBjb250ZXh0J3MgY2FuIHJlZmVyZW5jZSBpdC5cbiAgICAgIHRoaXMuc3RvcmUgPSBwcm9wcy5zdG9yZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG59XG5cblByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIHN0b3JlOiBQcm9wVHlwZXMuYW55XG59Il19