import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import api from '../../lib/api';
import styles from './styles.module.css';
import clsx from 'clsx';
import { LANGUAGE_PARAMS } from './data';
import useInterval from '../../hooks/use-interval';
import config from '../../config';

import Loading from '../../../static/img/loading_light.svg';

const CodeRunner = ({ codeString = '// comment', language = 'javascript' }) => {
    const [value, setValue] = useState(codeString);
    const [token, setToken] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitCode = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const { data } = await api.post(
                `${config.server.judge}/submissions`,
                {
                    source_code: btoa(unescape(encodeURIComponent(value))),
                    language_id: LANGUAGE_PARAMS[language],
                },
                {
                    params: {
                        base64_encoded: true,
                        wait: false,
                    },
                }
            );

            setToken(data.token);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const showCompileResult = async () => {
        const { data } = await api.get(
            `${config.server.judge}/submissions/${token}`,
            {},
            {
                params: {
                    base64_encoded: true,
                    wait: false,
                },
            }
        );

        const newStringArr = [];
        newStringArr.push(`연산 시간 : ${data.time}ms\n`);
        newStringArr.push(`메모리 : ${data.memory}\n`);
        newStringArr.push(data.stdout);
        newStringArr.push(data.compile_output);

        setResult(newStringArr.join(''));
        setToken('');
        setIsLoading(false);
    };

    useInterval(
        async () => {
            await showCompileResult();
        },
        token ? 2000 : null
    );

    return (
        <div className={styles.container}>
            <div className={styles.editorContainer}>
                <h3>Code</h3>
                <Editor
                    height="400px"
                    language={language}
                    theme="vs-dark"
                    options={{
                        fontSize: 18,
                    }}
                    defaultValue={value}
                    onChange={(value) => setValue(value)}
                />
            </div>
            <div className={styles.editorContainer}>
                <h3 className={styles.outputContainer}>
                    Output
                    <button
                        className={clsx(
                            'button button--md',
                            styles.submitEditButton
                        )}
                        onClick={submitCode}
                    >
                        {isLoading ? (
                            <div className={styles.iconWrapper}>
                                <Loading />
                            </div>
                        ) : (
                            'Run'
                        )}
                    </button>
                </h3>

                <Editor
                    language="terminal"
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        fontSize: 18,
                    }}
                    value={result}
                    height="150px"
                />
            </div>
        </div>
    );
};

export default CodeRunner;
