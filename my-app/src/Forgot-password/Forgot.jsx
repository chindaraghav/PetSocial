import React from 'react';

class Forgot extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
        emailDoesNotExists:false,
        emptyInput:false,
        emailFormatWrong:false,
        responseOK:false
    }
    this.submitIt=this.submitIt.bind(this);
    this.validateEmail=this.validateEmail.bind(this);
  }
    validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }
  submitIt(){
      if(this.state.email!=='' && this.validateEmail(this.state.email))
      {
          const url='http://localhost:8080/users/checkForUser';
          const data={
              method:'POST',
              body:JSON.stringify({email:this.state.email}),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }
          fetch(url,data)
              .then(response => response.json())
              .then(jsonResponse =>
              {
                  if(jsonResponse.exists) {
                      this.setState({responseOK:true})
                  }
                  else{
                      this.setState({emailDoesNotExists:true});
                  }
              });

      }
      else if(this.state.email==='')
      {
          this.setState({emptyInput:true});
      }
      else if(!this.validateEmail(this.state.email)){
          this.setState({emailFormatWrong:true});
      }
  }
  render() {
    return (
      <div>
          {this.state.responseOK && <div id='pop_forgt' className='popup_sec'>
              <div className='clos_btn'>
                  <img onClick={() => {this.setState({responseOK:false})}} src='images/clos.png' alt='' id='clos_pop' />
              </div>
              <div className='pop_hdr'>
                  A mail has been send to your e-mail Id for Reset Password Link
              </div>
              <div className='man_contnt'>
                  <span>Please Check Your Mail Box!</span>
                  <input  onClick={() => {this.setState({responseOK:false})}} type='submit' value='Ok' />
              </div>
          </div>}
        <div className='container'>
          <div className='content' style={{paddingTop:'70px',paddingBottom:'80px'}}>
            <div className='content_rgt'>
              <div className='register_sec'>
                <h1>Forgot Password</h1>
                <ul>
                  <li>
                    <span>Enter E-mail ID</span>
                    <input onChange={(e)=>{this.setState({email:e.target.value,emailFormatWrong:false,emailDoesNotExists:false,emptyInput:false})}} type='text' placeholder='User@gmail.com' />
                      {this.state.emailFormatWrong && <p>This is not an E-mail!</p>}
                      {this.state.emailDoesNotExists && <p>This is Email Does not exist!</p>}

                  </li>
                  <li>
                    <input type='submit' onClick={this.submitIt} value='Submit' />
                  </li>
                    {this.state.emptyInput && <p>Your Field is Empty</p>}
                </ul>
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


export default Forgot;
