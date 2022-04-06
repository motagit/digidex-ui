import React from 'react';
import { Tooltip } from '@material-ui/core';

import './Post.scss';

const Post = ({ post }) => {

    return (
        <Tooltip title={post.number + ' - ' + post.name}>
            <img className="image" loading="lazy" src={post.iconSource} alt={post.name}/>
        </Tooltip>
    );
}

export default Post;