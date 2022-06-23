import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import { useState } from 'react';
import Header from './Header';

import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    function renderItems() {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                           setHistory((prev) => {
                            console.log('array',[...prev, item.children]);
                            return [...prev, item.children]
                           });
                        }
                    }}
                />
            );
        });
    }
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            hideOnClick = {false}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className="menu-popper">
                        {(history.length > 1) && (
                            <Header 
                            title={current.title}
                            onBack={() => {
                                setHistory((prev) => {

                                    return prev.slice(0, prev.length - 1)
                                })
                            }}
                            />

                        )}
                        <div className={cx('body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide = {() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,

}

export default Menu;
