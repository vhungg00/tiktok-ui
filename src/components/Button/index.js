import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);
function Button({
    to,
    href,
    small = 'medium',
    leftIcon,
    rightIcon,
    disabled = false,
    primary = false,
    outline = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        disabled,
        leftIcon,
        rightIcon,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon}
            <span className={cx('title')}>{children}</span>
            {rightIcon}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    small: PropTypes.bool,
    left: PropTypes.node,
    right: PropTypes.node,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
}

export default Button;
