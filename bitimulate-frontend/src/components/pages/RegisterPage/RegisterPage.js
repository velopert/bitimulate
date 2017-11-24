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
import { Helmet } from 'react-helmet';

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
        header={<HeaderContainer isRegister/>}>
        <PolyBackground half={half}>
        <Helmet>
          <title>회원가입 :: Bitimulate</title>
        </Helmet>
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