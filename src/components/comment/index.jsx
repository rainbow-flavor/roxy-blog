import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import CommentForm from './form';
import CommentItem from './item';
import { API_URL } from '../../constants/url';

const Comment = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const getCommentList = async () => {
        const path = window.location.pathname;
        const response = await fetch(`${API_URL}/comment?path=${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

        setCount(response.count);
        setList(response.data);
    };

    useEffect(() => {
        getCommentList();
    }, []);

    return (
        <div className={styles.container}>
            <h4 className="title">{count}개의 댓글</h4>
            <CommentForm onSubmit={getCommentList} />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {list.map((data) => {
                    return <CommentItem key={data.id} {...data} />;
                })}
            </div>
        </div>
    );
};

export default Comment;
