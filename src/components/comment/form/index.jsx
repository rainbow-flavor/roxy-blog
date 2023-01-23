import React, { useState } from 'react';
import styles from './styles.module.css';
import useInput from '../../../hooks/use-input';
import clsx from 'clsx';
import { API_URL } from '../../../constants/url';

const CommentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { value, onChange, resetValue } = useInput();
    const {
        value: passwordValue,
        onChange: onPasswordChange,
        resetValue: resetPasswordValue,
    } = useInput();
    const {
        value: descriptionValue,
        onChange: onDescriptionChange,
        resetValue: resetDescriptionValue,
    } = useInput();

    const handleSubmit = async (e) => {
        setIsLoading(true);
        try {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            const content = e.target.content.value;
            const path = window.location.pathname;

            if (!password) return alert('비밀번호가 입력되지 않았습니다.');
            if (!content) return alert('내용이 입력되지 않았습니다.');

            const body = JSON.stringify({
                username,
                password,
                content,
                path,
            });

            await fetch(`${API_URL}/comment/create`, {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            resetValue();
            resetPasswordValue();
            resetDescriptionValue();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.userField}>
                <input
                    className={styles.input}
                    name="username"
                    placeholder="이름(option)"
                    maxLength="8"
                    value={value}
                    onChange={onChange}
                />

                <input
                    className={styles.input}
                    name="password"
                    placeholder="비밀번호"
                    maxLength="8"
                    value={passwordValue}
                    onChange={onPasswordChange}
                />
            </div>

            <textarea
                className={styles.textarea}
                name="content"
                cols="30"
                rows="10"
                value={descriptionValue}
                onChange={onDescriptionChange}
            />

            <button
                className={clsx('button button--md', styles.submitButton)}
                type="submit"
            >
                {isLoading ? '업데이트...' : '댓글 작성'}
            </button>
        </form>
    );
};

export default CommentForm;
