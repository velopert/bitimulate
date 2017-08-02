import { connect } from 'react-redux';
import { ScreenMask } from 'components';

export default connect(
  (state) => ({
    visible: state.base.getIn(['screenMask', 'visible'])
  })
)(ScreenMask);
