import React, { Component } from 'react';
import styles from './Msgbox.scss';
import classNames from 'classnames/bind';
import { Modal } from 'components';
import CheckIcon from 'react-icons/lib/md/check';
import ErrorIcon from 'react-icons/lib/md/error-outline';
const cx = classNames.bind(styles);

const icons = {
  success: CheckIcon,
  error: ErrorIcon,
}

class Msgbox extends Component {
  render() {
    const { visible, type = 'success', text, onExit } = this.props;

    const Icon = icons[type];

    return (
      <Modal visible={visible}>
        <div className={cx('msgbox')}>
          <div className={cx('head', type)}>
            { Icon && <Icon/> }
          </div>
          <div className={cx('content')}>
            {text}
          </div>
          <div className={cx('button-area')}>
            <div className={cx('button',type)} onClick={onExit}>확인</div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default Msgbox;