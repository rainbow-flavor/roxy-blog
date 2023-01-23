import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import useInput from '../../../hooks/use-input';

const CommentItem = ({ content, username = 'Annonymous' }) => {
    const { value, onChange } = useInput(username);
    const { value: descritpionValue, onChange: onDescriptionChange } =
        useInput(content);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.info}>
                    <b>{username}</b>
                    <button
                        className={clsx(
                            styles.infoEditButton,
                            isEdit && styles.active
                        )}
                        onClick={handleEdit}
                    >
                        {isEdit ? 'FINISH' : 'EDIT'}
                    </button>
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
        </div>
    );
};

export default CommentItem;
