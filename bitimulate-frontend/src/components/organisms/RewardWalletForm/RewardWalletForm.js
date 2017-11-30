import React from 'react';
import styles from './RewardWalletForm.scss';
import classNames from 'classnames/bind';
import { Input, Card, Button } from 'components';

const cx = classNames.bind(styles);

const RewardWalletForm = ({
  address,
  destinationTag,
  onChange,
  onSubmit
}) => (
  <Card className={cx('reward-wallet-form')}>
    <div className={cx('title')}>리플 지갑</div>
    <div className={cx('form')}>
      <Input placeholder="주소" name="address" value={address} onChange={onChange}/>
      <Input placeholder="데스티네이션 태그" name="destinationTag" value={destinationTag} onChange={onChange}/>
    </div>
    <div className={cx('button-container')}>
      <Button flat color="teal" onClick={onSubmit}>저장</Button>
    </div>
  </Card>
);

export default RewardWalletForm;