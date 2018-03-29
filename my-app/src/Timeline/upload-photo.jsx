import React from 'react';
import Dropzone from 'react-dropzone';
class UploadPhoto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:localStorage.getItem('email'),
            postedImage:null
        };
        this.submitPost=this.submitPost.bind(this);
        this.onDrop=this.onDrop.bind(this);
    }
    onDrop(acceptedFiles, rejectedFiles) {
        if (acceptedFiles && acceptedFiles.length) {
            this.setState({ postedImage: acceptedFiles[acceptedFiles.length - 1]});
        }
    }
    submitPost(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("postedImage",this.state.postedImage);
        formData.append("email",this.state.email);
        let options ={
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:8080/users/updateProfilePic',options)
            .then(response => response.json())
            .then(jsonResponse => {this.props.reRender(jsonResponse)})
            .catch(err=>{console.log("false")});
    }
    render(){
        return(
                <div style={{float:"left"}}>
                    <form encType="multipart/form-data" onSubmit={this.submitPost}>
                        <Dropzone name="GG" onDrop={this.onDrop}>
                            <p>Drag the image or click in the box </p>
                            <div>
                                {this.state.postedImage===null?"":<img src={this.state.postedImage.preview} />}
                            </div>
                        </Dropzone>
                        <input type="submit"/>
                    </form>
                </div>
        );
    }
}
export default UploadPhoto;