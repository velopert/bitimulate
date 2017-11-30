import React, { Component } from 'react';
import { RewardWalletForm } from 'components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { waitUntil } from 'lib/utils';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';
import { Record } from 'immutable';


class RewardWalletFormContainer extends Component {

  state = {
    address: '',
    destinationTag: ''
  }


  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {
    const { address, destinationTag } = this.state;
    const { UserActions, BaseActions } = this.props;

    try {
      await UserActions.saveRewardWallet({
        address, destinationTag
      });
      BaseActions.showMsgbox({
        type: 'success',
        text: '리플 계좌가 저장되었습니다.'
      })
    } catch(e) {

    }
  }

  initialize = async () => {
    const { UserActions, rewardWallet } = this.props;
    
    if(rewardWallet) {
      this.setState(rewardWallet.toJS())
    }
    try {
      await UserActions.getMetaInfo();
      this.setState(this.props.rewardWallet.toJS())

    } catch (e) {

    }
  }

  componentDidMount() {
    this.initialize();
  }
  
  render() {
    const { address, destinationTag } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <RewardWalletForm
        address={address}
        destinationTag={destinationTag}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({
    rewardWallet: state.user.getIn(['metaInfo', 'rewardWallet'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(withRouter(RewardWalletFormContainer));