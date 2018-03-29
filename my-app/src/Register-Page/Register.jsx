import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../Headers/Header';
import {Footer} from '../Footer/Footer';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={userName:'',password:'',email:'',firstName:'',lastName:''};
        this.setText=this.setText.bind(this);
        this.submitIt=this.submitIt.bind(this);
        this.checkItBox=false;
        this.validateEmail=this.validateEmail.bind(this);
        this.validateFields= this.validateFields.bind(this);
        this.validatePassword= this.validatePassword.bind(this);
        this.googleLogin= this.googleLogin.bind(this);
        this.valiEmail=false;
        this.valiField=false;
        this.valiPass=false;
        this.emailExists=false;
    }
    setText(e){
        if(e.target.name==='email')
        {
            this.valiEmail=false;
            this.emailExists=false;
        }
        if(e.target.name==='password')
        {
            this.valiPass=false;
        }
        this.setState({[e.target.name]:e.target.value});
        this.valiField=false;
    }
    googleLogin(){

    }
    validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }
    validateFields(){
        for(let a in this.state)
        {
            if(this.state[a]==='') return false;
        }
        return true;
    }
    validatePassword(){
        if(this.state.password.length<=6)
            return false;
        return true;
    }
    submitIt()
    {
        if(this.checkItBox && this.validatePassword() && this.validateFields() && this.validateEmail() )
        {
            let url = 'http://localhost:8080/users/createUser';
            let data = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            fetch(url, data)
                .then(response => response.json())
                .then(jsonResponse => {
                    if(!jsonResponse)
                    {
                        this.emailExists=true;
                        this.setState({});
                    }
                })
                .catch(err => {
                    console.log("Unexpected Error");
                });
        }
            if(!this.validatePassword())
            {
                this.valiPass=true;
            }
             if(!this.validateEmail())
            {
                this.valiEmail=true;
            }
             if(!this.validateFields())
            {
                this.valiField=true;
            }
            this.setState({});
    }
    componentWillMount(){
        if(localStorage.getItem('currentEmail')!==null)
        {
            this.props.history.push('/timeline/home');
        }
    }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='content' style={{paddingTop:'70px',paddingBottom:'80px'}}>
            <div className='content_rgt'>
              <div className='register_sec'>
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>Username</span>
                    <input type='text' onChange={this.setText}  name="userName" placeholder='Enter your username' />
                  </li>
                  <li>
                    <span>Password</span>
                    <input type='password' onChange={this.setText}  name="password" placeholder='Enter your password' />
                      {this.valiPass && <p style={{fontSize:'14px',color:'red'}}>Password is short!</p>}
                  </li>
                  <li>
                    <span>Email</span>
                    <input type='email' onChange={this.setText}  name="email" placeholder='Enter your email' />
                      {this.valiEmail && <p style={{fontSize:'14px',color:'red'}}>Email is not Correct!</p>}
                      {this.emailExists && <p style={{fontSize:'14px',color:'red'}}>Email already Exists!</p>}
                  </li>
                  <li>
                    <span>First Name</span>
                    <input type='text' onChange={this.setText}  name="firstName" placeholder='Enter your first name' />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input type='text' onChange={this.setText}  name="lastName" placeholder='Enter your last name' />
                  </li>
                  <li>
                    <input type='checkbox' onClick={()=>{this.checkItBox=!this.checkItBox;}} />I agree to Term & Conditions
                  </li>
                  <li>
                      <input type='submit' onClick={this.submitIt} value='Register' />
                      {this.valiField && <p style={{fontSize:'14px',color:'red'}}>Please fill out all the fields!</p>}
                  </li>
                </ul>
                  <a href="http://localhost:8080/users/auth/google">
                      <button class="loginBtn loginBtn--google">
                          Login with Google
                      </button>
                  </a>
                <div className='addtnal_acnt'>
                  I already have an account.<Link to='/login'>Login My Account !</Link>
                </div>
              </div>
            </div>
            <div className='content_lft'>
              <h1>Welcome from PPL!</h1>
              <p className='discrptn'>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which
                don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                the middle of text.
              </p> <img src='images/img_9.png' alt='' />
            </div>
          </div>
        </div>
        <div className='clear' />
      </div>
      );
  }
}
;

export default Register;
