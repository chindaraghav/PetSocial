import React from 'react';

class DisplayCategory extends React.Component{
    constructor(props)
    {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e){
        const url='http://localhost:8080/posts/getPostsFromCategory';
        const data={
            method:'POST',
            body:JSON.stringify({category:e.target.value}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        let a=fetch(url,data)
            .then(response => response.json())
            .then(jsonResponse => {  this.props.getCategoriesPost(jsonResponse);})
            .catch(err => {console.log(err)});
    }
    render(){
        return(
                <div className='rght_cate'>
                    <div id='rght_cat_bg' className='rght_cate_hd'>
                        Categories
                    </div>
                    <div className='rght_list'>
                        <ul>
                            <li style={{paddingLeft:0,paddingRight:0,width:'100%'}}>
                                <a>
                                    <button onClick={this.handleClick} value='others' style={{border:'none',width:'100%',background:'#f1f1f1',textAlign:'left'}}>
                                           <span className='list_icon' >
                                            <img style={{width:30,height:30}} src={`http://localhost:8080/categoryAvatar/others.jpg`} alt='up' />
                                            </span>
                                         Others
                                    </button>
                                </a>
                            </li>
                            {
                                this.props.categories.map(objj =>
                                    <li style={{paddingLeft:0,paddingRight:0,width:'100%'}}>
                                        <a>
                                       <button onClick={this.handleClick} value={objj.categoryName} style={{border:'none',width:'100%',background:'#f1f1f1',textAlign:'left'}}>
                                           <span className='list_icon' >
                                            <img style={{width:30,height:30}} src={`http://localhost:8080/categoryAvatar/${objj.fileName}`} alt='up' />
                                            </span>
                                           {objj.categoryName}
                                       </button>
                                        </a>
                                    </li>
                            )}
                        </ul>
                    </div>
                </div>
        );
    }
}

export default DisplayCategory;