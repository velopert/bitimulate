import React, { Component } from 'react';
import {
  PageTemplate,
  RegisterTemplate,
  PolyBackground,
  Paper
} from 'components';
import {HeaderContainer, RegisterFormContainer} from 'containers';
import styles from './RegisterPage.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class RegisterPage extends Component {
  state = {
    half: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        half: true
      });
    })
  }
  
  render() {
    const { half } = this.state;

    return (
      <PageTemplate 
        header={<HeaderContainer/>}>
        <PolyBackground half={half}>
        </PolyBackground>
        <Paper>
          <RegisterTemplate>
            <RegisterFormContainer/>
          </RegisterTemplate>
        </Paper>
      </PageTemplate>
    );
  }
}

export default RegisterPage;