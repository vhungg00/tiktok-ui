import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import request from '~/utils/request';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500)
    const inputRef = useRef();


    useEffect(() => {
        if(!debounce.trim()) {
            setSearchResult([])
            return;
        }
        setLoading(true)
        request.get('users/search', {
            params: {
                q: debounce,
                type: 'less'
            }
        })
            .then((res) => {
                setSearchResult(res.data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [debounce]);
    function handleClear() {
        setSearchValue('');
        setSearchResult([])
        inputRef.current.focus();
    } 
    function handleHideResult() {
        setShowResult(false)
    }
    function handleChange(e) {
        const searchValue = e.target.value;
        if(!searchValue.startsWith(' ')){
             setSearchValue(searchValue);
        }
    }
    return (
        // 
        <div>
            <Tippy
                interactive={true}  
                appendTo={() => document.body}
                visible={ showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result, id) => {
                                return (
                                    <AccountItem key={id} data={result} />
                                )
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside = {handleHideResult}
            >
                <div className={cx('search')}>
                    <input 
                    ref={(inputRef)}
                    value={searchValue}
                    placeholder="Search account and videos" 
                    spellCheck={false} 
                    onChange = {handleChange}
                    onFocus = {() => setShowResult(true)}
                     />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <img src={images.clear} alt="" />
                        </button>
                    )}
                    
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
    
                    <button className={cx('btn-search')} onMouseDown = {(e) => e.preventDefault()}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                            fill="rgba(22, 24, 35, 0.34)"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
