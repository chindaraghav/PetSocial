import React from 'react';
import EditProfile from "./edit-profile";
import UploadPhoto from "./upload-photo";


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={userData:{},email:localStorage.getItem('email'),showEditTab:false,showProfileChange:false};
        this.changeData=this.changeData.bind(this);
    }
    changeData(data){
        this.setState({userData:data});
    }
    componentWillMount(){
        const url='http://localhost:8080/users/getUserInfo';
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
            .then(jsonResponse => {this.setState({userData:jsonResponse}); })
            .catch(err => {console.log("Error here!")})
    }
    render(){
        return(
            <div>
                <div className='contnt_1'>
                    <div className='list_1'>
                        <ul>
                            <li>
                                <input type='checkbox' className='chk_bx' /> Friends
                            </li>
                            <li>
                                <input type='checkbox' className='chk_bx' /> Flaged
                            </li>
                        </ul>
                    </div>
                    <div className='timeline_div'>
                        <div className='timeline_div1'>
                            <div className='profile_pic'>
                                <img src={`http://localhost:8080/profilePics/${this.state.userData.fileName}`} />
                                <div onClick={()=>{this.setState({showProfileChange:!this.state.showProfileChange})}} className='profile_text'>
                                    <a >Change Profile Pic</a>
                                </div>
                            </div>
                            <div className='profile_info'>
                                <div className='edit_div'>
                                    <a style={{cursor:"pointer"}} onClick={()=> {this.setState({showEditTab:!this.state.showEditTab})}}>Edit <img src='/images/timeline_img.png' />
                                        </a>
                                </div>
                                <div className='profile_form'>
                                    <ul>
                                        <li>
                                            <div className='div_name1'>
                                                Name :
                                            </div>
                                            <div className='div_name2'>
                                                {this.state.userData.firstName+" "+this.state.userData.lastName}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='div_name1'>
                                                Sex :
                                            </div>
                                            <div className='div_name2'>
                                                {this.state.userData.sex}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='div_name1'>
                                                Description :
                                            </div>
                                            <div className='div_name3'>
                                                {this.state.userData.description}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='timeline_div2'>
                            <ul>
                                <li>
                                    <a href='#' className='active'>Timeline</a>
                                </li>
                                <li>
                                    <a href='#'>About</a>
                                </li>
                                <li>
                                    <a href='#'>Album</a>
                                </li>
                                <li>
                                    <a href='#'>Pets</a>
                                </li>
                                <li>
                                    <a href='#'>My Uploads</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.showProfileChange && <UploadPhoto reRender={this.changeData}/>}
                {this.state.showEditTab && <EditProfile reRender={this.changeData} userData={this.state.userData}/>}
            </div>
        );
    };
}

export default Profile;