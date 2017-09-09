import React, { Component } from 'react';

export default (shouldComponentUpdate) => (FunctionalComponent) => class extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate.bind(this)(nextProps, nextState);
    }

    render() {
        return <FunctionalComponent {...this.props}/>
    }
}