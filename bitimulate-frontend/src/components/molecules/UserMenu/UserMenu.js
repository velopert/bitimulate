import React, { Component } from 'react';
import styles from './UserMenu.scss';
import classNames from 'classnames/bind';
import { Card } from 'components';
import onClickOutside from 'react-onclickoutside';

const cx = classNames.bind(styles);
// 클래스형태로 바꾸기
class UserMenu extends Component {

  timeoutId = null

  state = {
    animate: false,
    closed: true
  }

  handleClickOutside = () => {
    const { onHide, visible } = this.props;
    if(!visible) return;
    onHide();
  }


  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  componentDidMount() {
    const { visible } = this.props;
    if(visible) this.enter();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible) {
      if(this.props.visible) {
        this.enter();
      } else {
        this.leave();
      }
    }
  }
  

  finishAnimation = () => {
    this.timeoutId = setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 200);
  }

  enter = () => {
    this.setState({
      animate: true,
      closed: false
    });
  }

  leave = () => {
    this.setState({
      animate: true,
      closed: true
    });
    this.finishAnimation();
  }

  render() {
    const { animate, closed } = this.state;
    const effect = animate ? (closed ? 'leave' : 'enter') : null;
    if(closed && !animate) return <div/>;
    const { onLogout } = this.props;

    return (
      <div className={cx('user-menu')}>
        <Card className={cx('card', effect)} noPadding>
          <div onClick={onLogout} className={cx('menu-item')}>로그아웃</div>
        </Card>
      </div>
    )
  }
}

export default onClickOutside(UserMenu);