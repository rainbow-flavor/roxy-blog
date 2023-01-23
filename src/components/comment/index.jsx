import React from 'react';
import styles from './styles.module.css';
import CommentForm from './form';
import CommentItem from './item';

const Comment = () => {
    return (
        <div className={styles.container}>
            <h4 className="title">5개의 댓글</h4>
            <CommentForm />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    );
};

export default Comment;
