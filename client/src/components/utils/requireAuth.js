import React, { Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

export default (ChildComponent) => {
  // class ComposedComponent extends Component {
  //   componentDidMount() {
  //     this.shouldNavigateAway();
  //   }

  //   componentDidUpdate() {
  //     this.shouldNavigateAway();
  //   }

  //   shouldNavigateAway() {
  //     if (!localStorage.getItem('id') || !localStorage.getItem('token')) {
  //       this.props.history.replace('/');
  //     }
  //   }

  //   render() {
  //     return <ChildComponent {...this.props} />;
  //   }
  // }
  const ComposedComponent = (props) => {
    let history = useHistory();
    useEffect(() => {
      if(!localStorage.getItem('id') || !localStorage.getItem('token')){
        const location = {
          pathname: '/'
        };
        history.replace(location);
      }
    })
    return (
      <ChildComponent {...props} />
    )
  }

  return ComposedComponent;
};