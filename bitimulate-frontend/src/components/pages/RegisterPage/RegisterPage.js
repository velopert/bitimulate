import React, { Component } from 'react';
import {
  PageTemplate,
  RegisterTemplate,
  PolyBackground,
  Paper,
  SectionWithTitle,
  Input,
  SelectCurrency,
  Option,
  Button,
  AlignRight
} from 'components';
import {HeaderContainer} from 'containers';
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
        <PolyBackground fixed half={half}>
        </PolyBackground>
        <Paper>
          <RegisterTemplate>
            <SectionWithTitle title="닉네임" description="서비스에서 사용 하실 닉네임을 입력하세요."> 
              <Input/>
            </SectionWithTitle>
            <SectionWithTitle title="초기자금 설정"> 
              <div className={cx('description')}>
                모의 거래소에서 사용 할 초기자금을 설정하세요. {"\r\n"}초기 자금은 언제든지 설정페이지에서 초기화 할 수 있습니다.
              </div>
              <h4>
                화폐 선택
              </h4>
              <SelectCurrency/>
              <h4>금액 선택</h4>
              <Option active>
                ₩1,000,000
              </Option>
              <Option>
                ₩10,000,000
              </Option>
              <Option>
                ₩100,000,000
              </Option>
            </SectionWithTitle>
            <AlignRight>
              <Button flat color="teal" className={cx('register-button')} xPadding="2rem">가입</Button>
            </AlignRight>
          </RegisterTemplate>
        </Paper>
      </PageTemplate>
    );
  }
}

export default RegisterPage;