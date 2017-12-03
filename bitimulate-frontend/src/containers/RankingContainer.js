import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Ranking, SpinnerBlock } from 'components';
import * as rankingActions from 'store/modules/ranking';


class RankingContainer extends Component {

  componentDidMount() {
    const { RankingActions, type } = this.props;
    RankingActions.getTopRanking(type);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.type !== this.props.type) {
      const { RankingActions } = this.props;
      RankingActions.getTopRanking(nextProps.type);
    }
  }
  
  
  render() {
    const { ranking, count, loading, type, me } = this.props;

    if(ranking.isEmpty() || loading) return <SpinnerBlock/>;

    return (
      <Ranking data={ranking} count={count} monthly={type !== 'total'} me={me}/>
    )
  }
}

export default connect(
  (state) => ({
    me: state.ranking.get('me'),
    count: state.ranking.get('count'),
    ranking: state.ranking.get('ranking'),
    loading: state.pender.pending['ranking/GET_TOP_RANKING']
  }),
  (dispatch) => ({
    RankingActions: bindActionCreators(rankingActions, dispatch)
  })
)(RankingContainer);