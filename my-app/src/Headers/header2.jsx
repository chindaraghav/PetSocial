import React from 'react';
import {Link} from 'react-router-dom';
import reactCookies from 'react-cookies';
class Header2 extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={postNames:[]};
        this.logMeOut=this.logMeOut.bind(this);
        this.searchBarHandle=this.searchBarHandle.bind(this);
        this.renderPostNames=this.renderPostNames.bind(this);
    }
    logMeOut(){
        localStorage.removeItem('email');
        localStorage.removeItem('currentEmail');
        reactCookies.remove('PPL',{path:'/'});
        reactCookies.remove('PPL.sig',{path:'/'});
        fetch('http://localhost:8080/users/auth/logMeOut');
        this.props.history.push('/login');
    }

    searchBarHandle(e){
        if(e.target.value!=='')
        {
            let url='http://localhost:8080/posts/searchPostOnBar';
            let data={
                method:'POST',
                body:JSON.stringify({text:e.target.value}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(url,data)
                .then(response => response.json())
                .then(jsonResponse => {this.setState({postNames:jsonResponse});})
                .catch(err=>{console.log(err);})
        }
        else {
            this.setState({postNames:[]});
        }
    }

    renderPostNames(){
        return this.state.postNames.map(objj => <li> <Link to={`/timeline/singlePost/${objj._id}`}>{objj.description}</Link></li>
        )

    }

    render(){
        return(
            <div>
                <div  className='navbar navbar-inverse navbar-fixed-top'>
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
                                        <a href="" tabIndex='-1'>My Profile</a>
                                    </li>
                                    <li>
                                        <Link to='/timeline' tabIndex='-1'>My Profile</Link>
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
                            <div className='nav-collapse collapse'>
                                <ul className='nav'>
                                    <li className='active'>
                                        <a href=''>Home</a>
                                    </li>
                                    <li>
                                        <a href=''>E-Coupons</a>
                                    </li>
                                    <li>
                                        <a href=''>E-Brands</a>
                                    </li>
                                    <li>
                                        <a href=''>Resuse Market</a>
                                    </li>
                                    <li>
                                        <a href=''>Lost and Found</a>
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
                        <div className='navigatn'>
                            <ul>
                                <li>
                                    <Link to='/timeline/Home' className='active'>Home</Link>
                                </li>
                                <li>
                                    <a href=''>E-Coupons</a>
                                </li>
                                <li>
                                    <a href=''>E-Brands</a>
                                </li>
                                <li>
                                    <a href=''>Resuse Market</a>
                                </li>
                                <li>
                                    <a href=''>Lost and Found</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='header_rgt'>
                        <div className='flag_div'>
                            <img src='/images/flag.png' />
                        </div>
                        <div style={{position:'relative'}}>
                            <input onBlur={()=>{setTimeout(()=>{this.setState({postNames:[]})},1000)}} onChange={this.searchBarHandle} type='text'  placeholder='Search' className='txt_box' />
                            <div style={{position:'absolute',width:'210px',margin:20,marginLeft:'65px',marginTop:39}}>
                                <ul className="dropdownRV">
                                    {this.renderPostNames()}
                                </ul>
                            </div>
                        </div>
                        <div className='msg_box'>
                            <a href='#'><span className='msg_count'>100</span></a>
                        </div>
                        <div className='pro_info pull-right'>
                            <div className='pro_icn'>
                                <img src='/images/pic_small.png' />
                            </div>
                            <div className='pro_txt'>
                                Me<b className='caret' />
                            </div>
                            <ul role='menu' aria-labelledby='dLabel' className='dropdown-menu'>
                                <li>
                                    <a href='' onClick={this.logMeOut} tabIndex='-1'>Logout</a>
                                </li>
                                <li>
                                    <Link to='/timeline' tabIndex='-1'>My Profile</Link>
                                </li>
                                <li>
                                    <a href='' tabIndex='-1'>Change Language</a>
                                </li>
                                <li className='divider' />
                                <li>
                                    <a href='' tabIndex='-1'>
                                        <input type='text' placeholder='search' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Header2;