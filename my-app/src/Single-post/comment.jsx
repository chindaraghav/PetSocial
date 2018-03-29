import React from 'react';

class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li>
                <div className="list_image">
                    <div className="image_sec"><img src="/images/post_img.png" /></div>
                    <div className="image_name">{this.props.name}</div>
                </div>
                <div className="list_info">
                    {this.props.commentText}
                </div>
            </li>
        );
    }
}
/*


*/
export default Comment;