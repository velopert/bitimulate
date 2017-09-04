import React, { Component } from 'react';
import styles from './Selector.scss';
import classNames from 'classnames/bind';
import onClickOutside from 'react-onclickoutside'
import SortIcon from 'react-icons/lib/fa/sort';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


const cx = classNames.bind(styles);

const SelectorOption = ({children, value, onClick}) => {
  return (
    <div className={cx('selector-option')} onClick={onClick}>
      {children}
    </div>
  );
}

class Options extends Component {
  handleClickOutside = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { options } = this.props;
    const optionList = options.map(
      ({name, text}) => <SelectorOption name={name} key={name}>{text}</SelectorOption> 
    );

    return (
      <div className={cx('options')}>
        {optionList}
      </div>
    );
  }
}

Options = onClickOutside(Options);

class Selector extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  render() {
    const { open } = this.state;
    const { handleOpen, handleClose } = this;
    const { options } = this.props;


    return (
      <div className={cx('selector-wrapper')}>
        <div className={cx('selector')} onClick={handleOpen}>
          알파벳순
          <SortIcon/>
        </div>
        <CSSTransitionGroup
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
          transitionName={{
            enter: cx('options-enter'),
            leave: cx('options-leave')
          }}
        >
        { open && <Options eventTypes={["click", "touchend"]} onClose={handleClose} options={options}/> }
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Selector;