import React from 'react';
import Dropzone from 'react-dropzone';
class AddCategory extends React.Component{
    constructor(props){
        super(props);
        this.state={categoryName:'',postedImage:null,showImageError:false,emptyFieldError:false};
        this.setName=this.setName.bind(this);
        this.createIt=this.createIt.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.validateFields=this.validateFields.bind(this);
        this.validateImage=this.validateImage.bind(this);
    }
    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({ postedImage: acceptedFiles[acceptedFiles.length - 1]});
    }
    setName(e){
        this.setState({[e.target.name]:e.target.value});
    }
    validateImage(){
        if(this.state.postedImage===null) {
            this.setState({showImageError:true});
            return false;
        }
        return true;
    }
    validateFields(){
        if(this.state.categoryName===''){
            this.setState({emptyFieldError:true});
            return false;
        }
        return true;
    }
    createIt(e){
        e.preventDefault();
        if(this.validateFields() && this.validateImage())
        {
            let url="http://localhost:8080/category/createCategory";
            let formData = new FormData();
            formData.append("postedImage",this.state.postedImage);
            formData.append("categoryName",this.state.categoryName);
            let options ={
                method: 'POST',
                body: formData
            }
            fetch(url,options)
                .then(response => response.json())
                .then(jsonResponse => {this.props.rerenderIt(jsonResponse); this.setState({categoryName:"",postedImage:null});})
                .catch(err => {console.log(err)});
        }
    }
    render(){
        return(
            <div>
                 <form encType="multipart/form-data" id ="uploadForm" >
                        <input name="categoryName" onChange={this.setName} value={this.state.categoryName} style={{marginTop:15}} type="text" placeholder="Category Name"/>
                        <Dropzone className='imageDropper' style={{paddingTop:20}} name="postedImage" onDrop={this.onDrop}>
                            <div>
                                <p style={{fontSize:15,color:'red'}}><b>Click Here to Upload An Avatar</b></p>
                            </div>
                        </Dropzone>
                     {this.state.showImageError && <p>Please select an image to be uploaded!</p>}
                        <input onClick={this.createIt} type="submit" value="Add Category"/>
                     {this.state.emptyFieldError && <p>Please Fill the category name field!</p>}
                    </form>
            </div>
        );
    }
}

export default AddCategory;