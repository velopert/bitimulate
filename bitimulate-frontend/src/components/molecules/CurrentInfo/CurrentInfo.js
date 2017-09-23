import React from 'react';
import styles from './CurrentInfo.scss';
import classNames from 'classnames/bind';
import { LabelBlock } from 'components';
import moment from 'moment';
const cx = classNames.bind(styles);

const CurrentInfo = ({info}) => {
  const { 
    lastUpdate
  } = info.toJS();

  return (
    <div className={cx('current-info')}>
      <div className={cx('')}></div>
      <LabelBlock label="업데이트 날짜">
        {moment(lastUpdate).format('YYYY MMM DD HH:mm')}
      </LabelBlock>
      <LabelBlock label="가치2">
        피곤한건지
      </LabelBlock>
      <LabelBlock label="가치3">
        잘 모르겠다
      </LabelBlock>
      <LabelBlock label="가치4">
        한시되면 자러가야지~
      </LabelBlock>
    </div>
  );
};

export default CurrentInfo;