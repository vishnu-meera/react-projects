import React, { Component } from 'react'
import {connect} from'react-redux';
import {fetchPost,deletePost} from '../actions/index';
import {Link} from 'react-router-dom';

class ShowPost extends Component{
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id,()=>{
            this.props.history.push("/");
        })
    }

    render(){
        const {post} = this.props;
        if(post===undefined)
            return <div>Loading...</div>
        else
            return (
                <div>
                    <Link to="/">Back</Link>
                    <button
                        className = "btn btn-danger float-sm-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete
                    </button>
                    <h3>{post["title"]}</h3>
                    <h6>Categories: {post["categories"]}</h6>
                    <p>{post["content"]}</p>
                </div>
            );
    }
}

function mapStateToProps({posts},ownProps){
    return {post:posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{
    fetchPost,deletePost
})(ShowPost);