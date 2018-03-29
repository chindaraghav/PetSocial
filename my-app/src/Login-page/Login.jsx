import React from 'react';
import {Header} from '../Headers/Header';
import {Footer} from '../Footer/Footer';
import {Link} from 'react-router-dom';
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={email:'',password:'',rememberMe:false};
        this.validateEmail=this.validateEmail.bind(this);
        this.validateFields= this.validateFields.bind(this);
        this.validatePassword= this.validatePassword.bind(this);
        this.setText= this.setText.bind(this);
        this.logMeIn= this.logMeIn.bind(this);
        this.valiEmail=false;
        this.valiField=false;
        this.valiPass=false;
        this.auth={exists:true,passMatch:true,verified:true};
        this.googleLogin=this.googleLogin.bind(this);
    }

    googleLogin(){
        const url='http://localhost:8080/users/auth/google';
        fetch(url)
            .catch(err => {console.log(err);});
    }

    componentWillMount(){
        if(this.props.match.params.id!==undefined)
        {
            const url='http://localhost:8080/users/verifyUser';
            const data={
                method:"POST",
                body:JSON.stringify({_id:this.props.match.params.id}),
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            };
            let a=fetch(url,data)
                .then(response => response.json())
                .then(jsonResponse => { this.setState({email:jsonResponse.email})})
                .catch(console.log('Nope!'));
        }
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
    logMeIn()
    {
        if(this.validateEmail() && this.validateFields() && this.validatePassword())
        {
            let url='http://localhost:8080/users/loginUser';
            let data={
                method:'POST',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            fetch(url,data)
                .then(response => response.json())
                .then(jsonResponse => {this.auth=jsonResponse; this.setState({});
                    if(this.auth.exists && this.auth.verified && this.auth.passMatch){
                        if(this.state.rememberMe)
                        {
                            localStorage.setItem("currentEmail",this.state.email);
                        }
                        localStorage.setItem("email",this.state.email);
                        this.props.history.push('/timeline/home');
                    }
                })
                .catch((err) => {console.log("NOO!")});
        }
        if(!this.validateFields())
        {
            this.valiField=true;
            this.setState({});
        }
        if(!this.validatePassword())
        {
            this.valiPass=true;
            this.setState({});
        }
        if(!this.validateEmail())
        {
            this.valiEmail=true;
            this.setState({});
        }
    }
    setText(e)
    {
        if(e.target.name==='email')
        {
            this.valiEmail=false;
            this.auth.exists=true;
            this.auth.verified=true;
        }
        if(e.target.name==='password')
        {
            this.valiPass=false;
            this.auth.passMatch=true;
            this.auth.verified=true;
        }
        this.setState({[e.target.name]:e.target.value});
    }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='content' style={{paddingTop:'70px',paddingBottom:'80px'}}>
            <div className='content_rgt'>
              <div className='login_sec'>
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input type='email' onChange={this.setText} value={this.state.email} name="email" placeholder='Enter your email' />
                      {this.valiEmail && <p style={{fontSize:'14px',color:'red'}}>This is not an Email!</p>}
                      {!this.auth.exists && <p style={{fontSize:'14px',color:'red'}}>Email Does Not Exist!</p>}
                  </li>
                  <li>
                    <span>Password</span>
                    <input type='password' onChange={this.setText} name="password" placeholder='Enter your password' />
                      {this.valiPass && <p style={{fontSize:'14px',color:'red'}}>Password is short!</p>}
                      {!this.auth.passMatch && this.auth.exists && <p style={{fontSize:'14px',color:'red'}}>Password did not Match!</p>}
                      </li>
                  <li>
                    <input type='checkbox' onChange={()=> this.setState({rememberMe:!this.state.rememberMe}) } />Remember Me
                  </li>
                  <li>
                      <input type='submit' onClick={this.logMeIn} value='Log In' /><Link to="/forgot_password">Forgot Password</Link>
                  </li>
                    {this.valiPass && <p style={{fontSize:'14px',color:'red'}}>Please fill all the Fields!</p>}
                    {!this.auth.verified && this.auth.passMatch && this.auth.exists && <p style={{fontSize:'14px',color:'red'}}>Account is Not Verified!</p>}
                </ul>
                  <a href="http://localhost:8080/users/auth/google">
                  <button class="loginBtn loginBtn--google">
                      Login with Google
                  </button>
                       </a>
                <div className='addtnal_acnt'>
                  I do not have any account yet.<Link to="/">Create My Account Now !</Link>
                </div>
              </div>
            </div>
            <div className='content_lft'>
              <h1>Welcome from PPL!</h1>
              <p className='discrptn'>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which
                don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                the middle of text.
              </p> <img src='/images/img_9.png' alt='' />
            </div>
          </div>
        </div>
        <div className='clear' />
      </div>
      );
  }
}
;

export default Login;
