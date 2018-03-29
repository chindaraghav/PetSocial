import React from 'react';
import {Link} from 'react-router-dom';

class Post extends React.Component{
    constructor(props){
        super(props);
    this.state={
        showLikeButton:true,
        allLikes:this.props.likes,
        _id:this.props._id
    };
    this.likeMyPost=this.likeMyPost.bind(this);
    this.unlikeMyPost=this.unlikeMyPost.bind(this);
    }

    componentWillMount()
    {
        if(this.props.likes.includes(localStorage.getItem("email")))
        {
            this.setState({showLikeButton:false});
        }
    }
    likeMyPost(){
        const url="http://localhost:8080/posts/likeMyPost";
        const data={
            method:'POST',
            body:JSON.stringify({email:localStorage.getItem('email'),_id:this.props._id}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {this.setState({allLikes:jsonResponse,showLikeButton:false});} )
            .catch(err => {console.log("Errorr!!!")})
    }
    unlikeMyPost(){
        this.setState({showLikeButton:true});
        const url="http://localhost:8080/posts/unLikeMyPost";
        const data={
            method:'POST',
            body:JSON.stringify({email:localStorage.getItem('email'),_id:this.props._id}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {this.setState({allLikes:jsonResponse})})
            .catch(err => {console.log("Errorr!!!")})
    }
    render(){
        return(
            <div className='contnt_2'>
                <div className='div_a'>
                    <div className='div_title'>
                        {this.props.description}
                    </div>
                    <div className='btm_rgt'>
                        <div className='btm_arc'>
                            {this.props.category}
                        </div>
                    </div>
                    <div className='div_top'>
                        <div className='div_top_lft'>
                             <img src='/images/img_6.png' />{this.props.uploaderName}
                        </div>
                        <div className='div_top_rgt'>
                            <span className='span_date'>{this.props.date}</span><span className='span_time'>{this.props.time}</span>
                        </div>
                    </div>
                    <div className='div_image'>
                        <Link to={`/timeline/singlePost/${this.props._id}`}>
                            <img src={this.props.fileName} alt='pet' />
                        </Link>
                    </div>
                    <div className='div_btm'>
                        <div className='btm_list'>
                            <ul>
                                <li>
                                    <a href=''><span className='btn_icon'><img src='/images/icon_001.png' alt='share' /></span>Share</a>
                                </li>
                                <li>
                                    <a href=''><span className='btn_icon'><img src='/images/icon_002.png' alt='share' /></span>Flag</a>
                                </li>
                                {this.state.showLikeButton ?(<li><a style={{cursor:"pointer"}} onClick={this.likeMyPost}>
                                    <span className='btn_icon'>
                                        <img src='/images/icon_003.png' alt='share' /></span>{this.state.allLikes.length} Likes</a></li>)
                                    :(<li style={{background:"red"}}>
                                        <a onClick={this.unlikeMyPost} style={{cursor:"pointer"}}>
                                            <span className='btn_icon'>
                                                <img src='/images/icon_003.png' alt='share' />
                                            </span>{this.state.allLikes.length} Unlike</a></li>)}
                                <li>
                                    <a href=''><span className='btn_icon'><img src='/images/icon_004.png' alt='share' /></span>{this.props.comment} Comments</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Post;