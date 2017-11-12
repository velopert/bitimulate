import React, { Component } from 'react';
import styles from './Modal.scss';
import classNames from 'classnames/bind';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  render() {
    const { visible, children, mobileFullscreen } = this.props;

    return (
      <div className={cx('modal-wrapper', { 'mobile-fullscreen': mobileFullscreen })}>
        <CSSTransitionGroup
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
          transitionName={{
            enter: cx('enter'),
            leave: cx('leave')
          }}>
          { visible && <div className={cx('modal')}>
            {children}
          </div> }
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default ModalWrapper;