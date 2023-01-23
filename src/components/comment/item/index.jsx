import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange,
    };
};

const CommentItem = () => {
    const { value, onChange } = useInput();
    const { value: descritpionValue, onChange: onDescriptionChange } =
        useInput(`Section 1.10.33 of "de Finibus Bonorum et Malorum", written
        by Cicero in 45 BC "At vero eos et accusamus et iusto odio
        dignissimos ducimus qui blanditiis praesentium voluptatum
        deleniti atque corrupti quos dolores et quas molestias
        excepturi sint occaecati cupiditate non provident, similique
        sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est
        et expedita distinctio. Nam libero tempore, cum soluta nobis
        est eligendi optio cumque nihil impedit quo minus id quod
        maxime placeat facere possimus, omnis voluptas assumenda
        est, omnis dolor repellendus. Temporibus autem quibusdam et
        aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non
        recusandae. Itaque earum rerum hic tenetur a sapiente
        delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat."
        1914 translation by H. Rackham`);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.info}>
                    <b>Annonymous</b>
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
