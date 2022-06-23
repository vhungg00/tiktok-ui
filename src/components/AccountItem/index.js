import React from 'react';
import PropTypes from 'prop-types'
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles)
function AccountItem({data}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-box')} >
                <img className={cx('avatar')} 
                src={data.avatar}
                alt="hoaa"
                />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    { data.tick && <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />}
                </h4>
                <p className={cx('userName')} >
                    {data.nickname}
                </p>
            </div>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;