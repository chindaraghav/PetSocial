import React from 'react';
import Post from "../post/post";
import Profile from "./Profile";
import RightContent from "../Right-Content/right-content";

class Timeline extends React.Component {
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
        this.getPosts=this.getPosts.bind(this);
        this.renderPosts=this.renderPosts.bind(this);
        this.rerender=this.rerender.bind(this);
        this.getData=this.getData.bind(this);
        this.rerenderDisplayCategory=this.rerenderDisplayCategory.bind(this);
        this.getNewPostsFromCategories=this.getNewPostsFromCategories.bind(this);
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
    getDate(date){
        let created_date=new Date(date);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = created_date.getFullYear();
        let month = months[created_date.getMonth()];
        let date1 = created_date.getDate();
        let time = date1 + ' ' + month + ' ' + year ;
        return time;
    }
    getTime(date){
        let created_date=new Date(date);
        let hour = created_date.getHours();
        let min = created_date.getMinutes();
        let sec = created_date.getSeconds();
        return hour+':'+min+':'+sec;
    }
    componentWillMount(){
        if(this.props.match.params.email!==undefined)
        {
            localStorage.setItem('email',this.props.match.params.email);
        }
      this.getPosts();
      this.getData();
    }
    getNewPostsFromCategories(data){
        this.setState({received:data});
    }
    rerender(post){
      let b=this.state.received;
      b.push(post);
      this.setState({received:b});
    }
    getPosts(){
        let url = 'http://localhost:8080/posts/getPostsForTimeline';
        let data = {
            method: 'POST',
            body: JSON.stringify({email:this.state.email}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials:'include'
        }
        fetch(url,data)
        .then(response => response.json())
        .then(jsonResponse => {this.setState({received:jsonResponse});})
        .catch(err => {console.log(err)});
    }
    renderPosts(){
       return this.state.received
           .map(objj =>      <Post
                   description={objj.description}
                   category={objj.category}
                   uploaderName={objj.uploaderName}
                   fileName={`http://localhost:8080/postPics/${objj.fileName}`}
                   date={this.getDate(objj.date)}
                   time={this.getTime(objj.date)}
                   _id={objj._id}
                   likes={objj.likes}
                   comment={objj.comment.length}
               />);
    }
  render() {
    return (
      <div>
          <RightContent getCategories={this.getNewPostsFromCategories} rerender={this.rerender}/>
            <div className='content_lft'>
                <Profile/>
                {this.renderPosts()}
            </div>
      </div>
      );
  }
}
;
export default Timeline;
