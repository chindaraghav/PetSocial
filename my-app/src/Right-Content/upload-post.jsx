import React from 'react';
import Dropzone from 'react-dropzone';
class UploadPost extends React.Component{

        constructor(props){
            super(props);
            this.state={
                email:"",
                category:"others",
                description:"",
                postedImage:null,
                categories:[],
                descriptionError:false,
                imageEmptyError:false
            }
            this.onDrop = this.onDrop.bind(this);
            this.submitPost = this.submitPost.bind(this);
            this.validateImage = this.validateImage.bind(this);
            this.validateDescription=this.validateDescription.bind(this);
        }
        onDrop(acceptedFiles, rejectedFiles) {
            if (acceptedFiles && acceptedFiles.length) {
                this.setState({ postedImage: acceptedFiles[acceptedFiles.length - 1]});
            }
        }
        validateImage(){
            if(this.state.postedImage===null)
            {
                this.setState({imageEmptyError:true});
                return false;
            }
            return true;
        }
        validateDescription(){
            if(this.state.description==='')
            {
                this.setState({descriptionError:true});
                return false;
            }
            return true;
        }
        componentWillMount(){
            this.setState({email:localStorage.getItem('email')});
        }

        submitPost(e){
            e.preventDefault();
            if(this.validateDescription() && this.validateImage()){
                let formData = new FormData();
                formData.append("postedImage",this.state.postedImage);
                formData.append("email",this.state.email);
                formData.append("category",this.state.category);
                formData.append("description",this.state.description);
                let options ={
                    method: 'POST',
                    body: formData
                }
                fetch('http://localhost:8080/posts/createPost',options)
                    .then(response => response.json())
                    .then(jsonResponse => { this.props.reRenderParent(jsonResponse); this.setState({description:'',postedImage:null});})
                    .catch(err=>{this.errorOnUpload=true; this.setState({}); console.log(err);});
            }
        }

        changeState(key,e){
            this.setState({[key]:e.target.value});
        }

        render(){
            return(
                <div className="register_sec">
                    <div className="uploadPost">
                        <form encType="multipart/form-data" id ="uploadForm" onSubmit={this.submitPost}>
                            <ul>
                                <li>
                                    <select onChange={(e)=> {this.setState({category:e.target.value})}}>
                                        <option value="others" selected>others</option>
                                        {this.props.categories.map(objj =>
                                            <option value={objj.categoryName}>
                                                {objj.categoryName}
                                            </option>)}
                                    </select>
                                </li>
                                <li><span>Description</span><textarea rows='6' value={this.state.description} name='description' className="textarea" onChange={(e)=>{this.changeState("description",e)}}></textarea>
                                </li>
                                <li>
                                    <Dropzone className="imageDroppper" name="GG" onDrop={this.onDrop}>
                                        <p style={{fontSize:15,color:'red'}}><b>Click Here to Upload A Photo</b></p>
                                        <div>
                                            {this.state.postedImage===null?"":<img src={this.state.postedImage.preview} />}
                                        </div>
                                    </Dropzone>
                                    {this.state.imageEmptyError && <p>Please Upload an image to submit post!</p>}
                                </li>
                                <input type="submit" defaultValue="Post" />
                                {this.state.descriptionError && <p>please fill the description box! </p>}
                                {this.errorOnUpload && <p style={{fontSize:'14px',color:'red'}}>Error while posting picture! try again later....</p>}
                            </ul>
                        </form>
                    </div>
                </div>
            )
        }
}

export default UploadPost;