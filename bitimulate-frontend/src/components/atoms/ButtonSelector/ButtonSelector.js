import React from 'react';
import styles from './ButtonSelector.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Option = ({name, children, active, onClick}) => {
  return (
    <div className={cx('option', { active })} onClick={onClick}>
      {children}
    </div>
  )
}

const ButtonSelector = ({
  options,
  onSelect,
  value,
  className,
  ...rest
}) => {
  const optionList = options.map(
    ({name, text}) => (
      <Option 
        onClick={() => onSelect(name)}
        active={value===name}
        key={name}>
        {text}
      </Option>
    )
  );

  return (
    <div className={cx('button-selector', className)} {...rest}>
      {optionList}
    </div>
  );
};

ButtonSelector.defaultProps = {
  options: [
    {
      name: 'value',
      text: '텍스트'
    },
    {
      name: 'value2',
      text: '텍스트2'
    }
  ]
}

export default ButtonSelector;