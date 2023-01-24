import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import CommentForm from './form';
import CommentItem from './item';
import api from '../../lib/api';

const Comment = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const getCommentList = async () => {
        const path = window.location.pathname;
        const { data } = await api.get(`/comment?path=${path}`);

        setCount(data.count);
        setList(data.data);
    };

    useEffect(() => {
        getCommentList();
    }, []);

    return (
        <div className={styles.container}>
            <h4 className="title">{count}개의 댓글</h4>

            <CommentForm onSubmit={getCommentList} />

            <div className={styles.commentContainer}>
                {list?.map((data) => {
                    return (
                        <CommentItem
                            key={data.id}
                            {...data}
                            username={
                                !data.username ? 'Anonymous' : data.username
                            }
                            onSubmit={getCommentList}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Comment;
