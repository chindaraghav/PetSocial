import React from 'react';

class Reset extends React.Component {
    constructor(props){
        super(props);
        this.state={
            password:'',
            confirmPass:'',
            fieldBlank:false,
            passwordValidation:false,
            fieldsNotEqual:false,
            passwordResetDone:false
        };
        this.submitIt=this.submitIt.bind(this);
        this.checkForEmptyFields=this.checkForEmptyFields.bind(this);
        this.equalFields=this.equalFields.bind(this);
        this.validatePassword=this.validatePassword.bind(this);
    }
    validatePassword(password){
        if(password.length>=6){

          return true;
        }
        this.setState({passwordValidation:true});
        return false;
    }
    checkForEmptyFields(){
        if(this.state.password==='' || this.state.confirmPass==='')
        {
            this.setState({fieldBlank:true});
            return false;
        }
        return true;
    }
    equalFields(){
        if(this.state.password!==this.state.confirmPass){
            this.setState({fieldsNotEqual:true});
            return false;
        }
        return true;
    }
    submitIt(){
        if(this.checkForEmptyFields() && this.equalFields() && this.validatePassword(this.state.password)){
            const url='http://localhost:8080/users/resetPassword';
            const data={
                method:'POST',
                body:JSON.stringify({_id:this.props.match.params.id,password:this.state.password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(url,data)
                .then(response => response.json())
                .then(jsonResponse =>
                {
                    if(jsonResponse.done){
                        this.props.history.push(`/login/${this.props.match.params.id}`);
                    }
                });
        }
    }
  render() {
    return (

        <div>
        <div className='container'>
          <div className='content' style={{paddingTop:'70px',paddingBottom:'80px'}}>
            <div className='content_rgt'>
              <div className='register_sec'>
                <h1>Reset Password</h1>
                <ul>
                  <li>
                    <span>Enter New Password</span>
                    <input onChange={(e)=> { this.setState({password:e.target.value,fieldBlank:false,passwordValidation:false,fieldsNotEqual:false}) }} type='password' placeholder='Enter your new password' />
                  </li>
                  <li>
                    <span>Confirm Password</span>
                    <input onChange={(e)=> { this.setState({confirmPass:e.target.value,fieldBlank:false,passwordValidation:false,fieldsNotEqual:false}) }} type='password' placeholder='Enter your password again' />
                  </li>
                  <li>
                    <input type='submit' onClick={this.submitIt} value='Submit' />
                  </li>
                    {this.state.fieldBlank && <p>Please fill all the fields!</p>}
                    {this.state.passwordValidation && <p>Password is not valid!</p>}
                    {this.state.fieldsNotEqual && <p>Both Passwords Don't Match!!</p>}
                </ul>
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

export default Reset;
