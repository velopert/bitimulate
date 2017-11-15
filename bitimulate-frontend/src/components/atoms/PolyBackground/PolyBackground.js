import React, { Component } from 'react';
import styles from './PolyBackground.scss';
import classNames from 'classnames/bind';
import background from 'static/images/background.png';

const cx = classNames.bind(styles);

class PolyBackground extends Component {

  state = {
    loaded: false
  }

  componentWillMount() {
    const image = new Image();
    image.src = background;

    const cached = image.complete || (image.width+image.height) > 0;
    if(cached) {
      this.setState({
        loaded: true
      })
      return;
    }

    image.onload = () => {
      this.setState({
        loaded: true
      })
    };
  }
  componentDidMount() {
    

  }
  
  render() {
    const { loaded } = this.state;
    const { children, fixed, half, home } = this.props;

    return (
      <div className={cx('poly-background', {
        fixed, half, home
      })}>
        <div className={cx('image', { blur: !loaded })}>
        </div>
        <div className={cx('inner')}>
          {children}
        </div>
      </div>
    );
  }
}

export default PolyBackground;