import { useEffect, useRef } from 'react';
import { EditorContainer, EditorHeader, RunButton, EditorWrapper } from '../styles/QueryEditorStyles';
import { FaPlay, FaSpinner } from 'react-icons/fa';
import Editor from '@monaco-editor/react';

const QueryEditor = ({ query, setQuery, executeQuery, loading }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const isMac = navigator.platform.toLowerCase().includes('mac');
  const shortcutKey = isMac ? '⌘' : 'Ctrl';

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Add keyboard shortcut for executing query (Ctrl/Cmd + Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, executeQuery);
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <h3>SQL Query</h3>
        <RunButton 
          onClick={executeQuery} 
          disabled={loading}
          title={`Run Query (${shortcutKey}+Enter)`}
        >
          {loading ? <FaSpinner className="spinner" /> : <FaPlay />}
          {loading ? 'Running...' : 'Run Query'}
        </RunButton>
      </EditorHeader>
      <EditorWrapper id="editor-container">
        <Editor
          height="100%"  /* Take full height of wrapper */
          language="sql"
          value={query}
          theme="vs-dark"
          onChange={setQuery}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on' // Add word wrap for better visibility
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default QueryEditor;
