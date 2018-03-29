import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <div>
                <div className='navbar navbar-inverse navbar-fixed-top'>
                    <div className='navbar-inner'>
                        <div className='container'>
                            <button type='button'
                                    data-toggle='collapse'
                                    data-target='.nav-collapse'
                                    className='btn btn-navbar'>
                                <span className='icon-bar' /> <span className='icon-bar' /> <span className='icon-bar' />
                            </button> <a href='' className='brand'>PPL</a>
                            <div className='pro_info pull-right'>
                                <div className='pro_icn'>
                                    <img src='/images/pic_small.png' />
                                </div>
                                <div className='pro_txt'>
                                    Me<b className='caret' />
                                </div>
                                <ul role='menu' aria-labelledby='dLabel' className='dropdown-menu'>
                                    <li>
                                        <a href='#' tabIndex='-1'>My Profile</a>
                                    </li>
                                    <li>
                                        <a href='#' tabIndex='-1'>Message Box</a>
                                    </li>
                                    <li>
                                        <a href='#' tabIndex='-1'>Change Language</a>
                                    </li>
                                    <li className='divider' />
                                    <li>
                                        <a href='#' tabIndex='-1'>
                                            <input type='text' placeholder='search' />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='header' style={{position:'fixed',zIndex:10}}>
                    <div className='header_lft'>
                        <div className='logo'>
                            <a href='#'><img src='/images/logo.png' /></a>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Header;