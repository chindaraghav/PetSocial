import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Post from "../post/post";
import Comment from "./comment";
class SingalPost extends Component{
  constructor(props){
    super(props);
    this.state={received:null,commentVal:'',comments:[],_id:this.props.match.params.id};
    this.getPosts=this.getPosts.bind(this);
    this.getDate=this.getDate.bind(this);
    this.getTime=this.getTime.bind(this);
    this.addComment=this.addComment.bind(this);
    this.renderComments=this.renderComments.bind(this);
  }
      componentWillMount(){
          this.getPosts();
          this.renderComments();
      }
      componentWillReceiveProps(nextProps){
          this.setState({_id:nextProps.match.params.id});
          this.getPosts(nextProps);
          this.renderComments();
      }
      addComment(){
          const url="http://localhost:8080/posts/createComment";
          const data={
              method:'POST',
              body:JSON.stringify({
                  email: localStorage.getItem('email')
                  , comment: this.state.commentVal,
                  _id: this.state.received._id
              }),
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              credentials:'include'
          }
          fetch(url,data)
              .then(response => response.json())
              .then(jsonResponse => {this.setState({comments:jsonResponse.comment})})
      }
      renderComments(){
          return this.state.comments.map(objj => <Comment name={objj.name} commentText={objj.commentText}/>);
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
         getPosts(e){
        let dat={};
        if(e){
             dat = {
                _id: e.match.params.id
            }
        } else {
             dat = {
                _id: this.state._id
            }
        }
        let url = 'http://localhost:8080/posts/getSinglePost';
        let data = {
            method: 'POST',
            body: JSON.stringify(dat),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {this.setState({received:jsonResponse,comments:jsonResponse.comment});})
            .catch(err => {console.log("Error!")});
    }

    render() {
      return (
        <div>
              <div className="content_lft">
                <div className="contnt_2">
                    {this.state.received!==null &&<Post
                        description={this.state.received.description}
                        category={this.state.received.category}
                        uploaderName={this.state.received.uploaderName}
                        fileName={`http://localhost:8080/postPics/${this.state.received.fileName}`}
                        date={this.getDate(this.state.received.date)}
                        time={this.getTime(this.state.received.date)}
                        _id={this.state.received._id}
                        likes={this.state.received.likes}
                    />}
                </div>
                <div className="contnt_3">
                  <ul>
                      {this.renderComments()}
                    <li>
                      <div className="cmnt_div1">
                        <input placeholder="Enter your Comment" onChange={(e)=>{ this.setState({commentVal:e.target.value});}} className="cmnt_bx1" type="text" />
                        <input className="sub_bttn1" onClick={this.addComment} defaultValue="Submit Comment" type="submit" />
                      </div>
                    </li>
                  </ul>
                  <div className="view_div"><a href="#">View more</a></div>
                </div>
              </div>
        </div>
      );
    }
  };

  export default SingalPost;