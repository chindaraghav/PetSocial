import React from 'react';
import Post from "../post/post";
import RightContent from "../Right-Content/right-content";

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state= { posts:[] };
        this.renderPosts=this.renderPosts.bind(this);
        this.getPosts=this.getPosts.bind(this);
        this.getDate=this.getDate.bind(this);
        this.getTime=this.getTime.bind(this);
        this.onLatestFirst=this.onLatestFirst.bind(this);
        this.onMostCommentedFirst=this.onMostCommentedFirst.bind(this);
        this.onOldestFirst=this.onOldestFirst.bind(this);
        this.rerender=this.rerender.bind(this);
        this.getNewPostsFromCategories=this.getNewPostsFromCategories.bind(this);
    }
    componentWillMount(){
        this.getPosts();
        this.renderPosts();
    }
    getNewPostsFromCategories(data){
        this.setState({posts:data});
    }
    onLatestFirst(){
        let g=this.state.posts;
        g.sort(function(a,b){ return b.forSort-a.forSort});
        this.setState({posts:g});
    }
    rerender(post){
        let b=this.state.posts;
        b.push(post);
        this.setState({posts:b});
    }
    onMostCommentedFirst(){
        let g=this.state.posts;
        g.sort(function(a,b){ return b.comment.length-a.comment.length});
        this.setState({posts:g});
        this.renderPosts();;
    }
    onOldestFirst(){
        let g=this.state.posts;
            g.sort(function(a,b){ return a.forSort-b.forSort});
            this.setState({posts:g});
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
    getPosts(){
        let url = 'http://localhost:8080/posts/getPostsForHome';
        let data = {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {this.setState({posts:jsonResponse});})
            .catch(err => {console.log("Error!")});
    }
    renderPosts(){
        return (this.state.posts
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
            />));
    }
    render(){
        return (
            <div>
                <RightContent getCategories={this.getNewPostsFromCategories} rerender={this.rerender}/>
                 <div className='content_lft'>
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
                                <div className='post_div'>
                                    <div className='post_list'>
                                        <ul>
                                            <li onClick={this.onLatestFirst}>
                                                <a ><span className='list_img'><img src='/images/img_1.png' /></span>Latest First</a>
                                            </li>
                                            <li>
                                                <a onClick={this.onOldestFirst} ><span className='list_img'><img src='//images/img_2.png' /></span>Oldest First</a>
                                            </li>
                                            <li>
                                                <a  href='#'><span className='list_img'><img src='//images/img_3.png' /></span>Most Pet</a>
                                            </li>
                                            <li>
                                                <a href='#'><span className='list_img'><img src='//images/img_4.png' /></span>Most Clicks</a>
                                            </li>
                                            <li>
                                                <a onClick={this.onMostCommentedFirst}><span className='list_img'><img src='/images/img_5.png' /></span>Most Commented</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='post_txt'>
                                        4 New Post Updates
                                    </div>
                                </div>
                            </div>
                            {this.renderPosts()}
                        </div>
            </div>
        );
    }
}
;

export default Home;
