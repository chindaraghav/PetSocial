import React from 'react';
import AddCategory from "./add-category";
import UploadPost from "./upload-post";
import DisplayCategory from "./display-categories";

class RightContent extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            email: localStorage.getItem('email'),
            received: [],
            newPost: {},
            categories: []
        }
        this.showUpload=false;
        this.showCategoryComp=false;
        this.rerenderDisplayCategory=this.rerenderDisplayCategory.bind(this);
        this.getData=this.getData.bind(this);
        this.rerender=this.rerender.bind(this);
    }
    componentWillMount(){
        this.getData();
    }
    rerender(post){
        let b=this.state.received;
        b.push(post);
        this.setState({received:b});
    }
    rerenderDisplayCategory(data){
        let a=this.state.categories;
        a.push(data);
        this.setState({categories:a});
    }
    getData() {
        let url = 'http://localhost:8080/category/getCategories';
        let data = {method: 'POST'};
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {this.setState({categories:jsonResponse});})
            .catch(err => {console.log('NOO!')});
    }
    render(){
        return(
            <div>
                <div className='content_rgt'>
                    <div style={{cursor:"pointer"}} onClick={()=>{this.showUpload=!this.showUpload; this.setState({});}} className='rght_btn'>
                        <span className='rght_btn_icon'><img src='/images/btn_iconb.png' alt='up' /></span> <span className='btn_sep'><img src='/images/btn_sep.png' alt='sep' /></span>
                        <a>Upload Post</a>
                    </div>
                    {this.showUpload && <UploadPost reRenderParent={this.props.rerender} categories={this.state.categories} reRenderIt={this.rerender}/>}
                    <div  style={{cursor:"pointer"}} onClick={()=>{this.showCategoryComp=!this.showCategoryComp; this.setState({});}} className='rght_btn'>
                        <span className='rght_btn_icon'><img src='/images/btn_icona.png' alt='up' /></span> <span className='btn_sep'><img src='/images/btn_sep.png' alt='sep' /></span>
                        <a>Upload Category</a>
                    </div>
                    {this.showCategoryComp && <AddCategory  rerenderIt={this.rerenderDisplayCategory}/>}

                    <DisplayCategory getCategoriesPost={this.props.getCategories} categories={this.state.categories}/>
                </div>
            </div>
        );
    }
}

export default RightContent;