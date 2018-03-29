import React from 'react';

class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:localStorage.getItem('email'),
            firstName:this.props.userData.firstName,
            lastName:this.props.userData.lastName,
            description:this.props.userData.description,
            sex:'Male'
        };
        this.setVal=this.setVal.bind(this);
        this.submitData=this.submitData.bind(this);
    }
    setVal(e){
        this.setState({[e.target.name]:e.target.value});
    }
    submitData(){
        const url='http://localhost:8080/users/updateUser';
        const data={
            method:'POST',
            body:JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => { this.props.reRender(jsonResponse)})
            .catch(err => {console.log("Error here!")})

    }
    render(){
        return(
            <div style={{paddingLeft:130}}>
                <input onChange={this.setVal}  name="firstName" defaultValue={this.state.firstName} type="text"/>
                <input onChange={this.setVal} name="lastName" defaultValue={this.state.lastName} type="text"/><br/>
                <textarea onChange={this.setVal} name="description" id="" cols="30" rows="10" defaultValue={this.state.description}></textarea>
                <select name="sex" defaultValue={this.state.sex} onChange={this.setVal}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button onClick={this.submitData}>Submit It</button>
            </div>
        );
    };
}

export default EditProfile;