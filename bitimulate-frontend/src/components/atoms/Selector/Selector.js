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

  handleSelect = (value) => {
    const { onSelect, onClose } = this.props;
    onSelect(value);
    onClose();
  }

  render() {
    const { options } = this.props;
    const { handleSelect } = this;

    const optionList = options.map(
      ({name, text}) => <SelectorOption key={name} onClick={()=>handleSelect(name)}>{text}</SelectorOption> 
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
    const { onSelect, options, value } = this.props;

    const selected = options.find(option=>option.name === value);


    return (
      <div className={cx('selector-wrapper')}>
        <div className={cx('selector')} onClick={handleOpen}>
          {selected.text}
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
        { open && <Options eventTypes={["click", "touchend"]} onClose={handleClose} onSelect={onSelect} options={options}/> }
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Selector;