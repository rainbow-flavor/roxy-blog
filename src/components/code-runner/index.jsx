import React from 'react';
import Editor from '@monaco-editor/react'

const CodeRunner = ({codeString = "//comment"} ) => {
    return (
        <Editor
            height='400px'
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue={codeString}
        />
    );
};

export default CodeRunner;
