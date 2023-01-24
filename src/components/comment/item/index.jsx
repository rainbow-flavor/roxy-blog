import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import useInput from '../../../hooks/use-input';
import { API_URL } from '../../../constants/url';

const CommentItem = ({ content, username = 'Annonymous', id, onSubmit }) => {
    const { value, onChange, resetValue: resetPasswordValue } = useInput();
    const { value: descritpionValue, onChange: onDescriptionChange } =
        useInput(content);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleSubmitEdit = async () => {
        try {
            if (!value) return alert('비밀번호를 입력해주세요!');
            const body = JSON.stringify({
                username,
                content: descritpionValue,
                checkingPassword: value,
            });

            await fetch(`${API_URL}/comment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }).then((res) => {
                if (!res.ok) throw new Error(res.type);
            });
        } catch (err) {
            console.error(err);
            alert('다시 시도해주세요');
        } finally {
            resetPasswordValue();
            setIsEdit(false);
        }
    };

    const handleSubmitDelete = async () => {
        try {
            if (!value) return alert('비밀번호를 입력해주세요!');
            const isDelete = confirm('댓글을 정말 삭제하시겠습니까?');

            if (isDelete) {
                await fetch(`${API_URL}/comment/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: value,
                }).then((res) => {
                    if (!res.ok) throw new Error(res.type);
                });

                alert('댓글이 삭제되셨습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('비밀번호가 맞지 않습니다.');
        } finally {
            resetPasswordValue();
            setIsDelete(false);
            await onSubmit();
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.info}>
                    <b>{username}</b>
                    <div className={styles.editField}>
                        {!isDelete && !isEdit && (
                            <button
                                className={clsx(
                                    styles.infoEditButton,
                                    isEdit && styles.active
                                )}
                                onClick={() => setIsEdit((prev) => !prev)}
                            >
                                수정
                            </button>
                        )}

                        {!isDelete && !isEdit && (
                            <button
                                className={clsx(
                                    styles.infoEditButton,
                                    isEdit && styles.active
                                )}
                                onClick={() => setIsDelete((prev) => !prev)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>

                {isEdit && (
                    <input
                        className={styles.infoEditInput}
                        type="text"
                        placeholder="비밀번호"
                        value={value}
                        onChange={onChange}
                    />
                )}

                {isDelete && (
                    <input
                        className={styles.infoEditInput}
                        type="text"
                        placeholder="비밀번호"
                        value={value}
                        onChange={onChange}
                    />
                )}
            </div>

            {isEdit ? (
                <textarea
                    className={styles.descriptionEditInput}
                    cols="30"
                    rows="10"
                    draggable={false}
                    value={descritpionValue}
                    onChange={onDescriptionChange}
                />
            ) : (
                <div className={styles.description}>{descritpionValue}</div>
            )}

            {isEdit && (
                <div className={styles.submitEditContainer}>
                    <button
                        className={clsx(
                            'button button--md',
                            styles.submitEditButton
                        )}
                        onClick={() => setIsEdit(false)}
                    >
                        취소
                    </button>
                    <button
                        className={clsx(
                            'button button--md',
                            styles.submitEditButton
                        )}
                        onClick={handleSubmitEdit}
                    >
                        댓글 수정
                    </button>
                </div>
            )}

            {isDelete && (
                <div className={styles.submitEditContainer}>
                    <button
                        className={clsx(
                            'button button--md',
                            styles.submitEditButton
                        )}
                        onClick={handleSubmitDelete}
                    >
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentItem;
