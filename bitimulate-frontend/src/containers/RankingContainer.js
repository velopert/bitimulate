import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Ranking, SpinnerBlock } from 'components';
import * as rankingActions from 'store/modules/ranking';


class RankingContainer extends Component {

  componentDidMount() {
    const { RankingActions } = this.props;
    RankingActions.getTopRanking();
  }
  
  render() {
    const { ranking, count, loading } = this.props;

    if(ranking.isEmpty() || loading) return <SpinnerBlock/>;

    return (
      <Ranking data={ranking} count={count}/>
    )
  }
}

export default connect(
  (state) => ({
    count: state.ranking.get('count'),
    ranking: state.ranking.get('ranking'),
    loading: state.pender.pending['ranking/GET_TOP_RANKING']
  }),
  (dispatch) => ({
    RankingActions: bindActionCreators(rankingActions, dispatch)
  })
)(RankingContainer);