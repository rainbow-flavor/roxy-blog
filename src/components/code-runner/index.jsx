import React, { useState } from 'react';
import api from '../../lib/api';
import styles from './styles.module.css';
import clsx from 'clsx';
import { LANGUAGE_PARAMS } from './data';
import useInterval from '../../hooks/use-interval';
import config from '../../config';
import Loading from '../../../static/img/loading_light.svg';
import Editor from '@monaco-editor/react';

function utf8_to_b64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(atob(str)));
}

const CodeRunner = ({ codeString = '// comment', language = 'javascript' }) => {
    const [value, setValue] = useState(codeString);
    const [token, setToken] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [retry, setRetry] = useState(0);

    const submitCode = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);

            const { data } = await api.post(
                `${config.server.judge}/submissions`,
                {
                    source_code: utf8_to_b64(value),
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
            `${config.server.judge}/submissions/${token}?base64_encoded=true`,
            {},
            {
                params: {
                    base64_encoded: true,
                    wait: false,
                },
            }
        );

        const newStringArr = [];
        const time = data.time ? `연산 시간 : ${data.time}ms\n` : null;
        const memory = data.memory ? `메모리 : ${data.memory} kB\n` : null;

        newStringArr.push(
            time,
            memory,
            data.compile_output ? b64_to_utf8(data.compile_output) : '',
            data.message,
            data.stderr,
            data.stdout ? b64_to_utf8(data.stdout) : ''
        );

        setResult(newStringArr.join(''));
        setToken('');
        setIsLoading(false);
    };

    useInterval(
        async () => {
            try {
                await showCompileResult();
                setRetry(0);
            } catch (err) {
                if (retry <= 3) {
                    setToken('');
                }
                console.error(err);
                setRetry((prev) => prev + 1);
            }
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
