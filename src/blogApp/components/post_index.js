import React, { Component } from 'react'
import {connect} from'react-redux';
import {fecthPosts} from '../actions/index';
import {Link} from 'react-router-dom';
import _ from 'lodash';
class PostIndex extends Component{

    componentDidMount(){
        this.props.fecthPosts();
    }

    renderPosts(){
        return _.map(this.props.posts,post=>{
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}    
                    </Link>
                </li>
            );
        });
    }

    render(){
        return (
            <div>
                <div className="float-sm-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <div>
                    <h3>Posts</h3>
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts:state.posts};
}

export default connect(mapStateToProps,{fecthPosts:fecthPosts})(PostIndex);