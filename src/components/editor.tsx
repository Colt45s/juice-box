import React, { useRef, useEffect, useLayoutEffect } from 'react';
import * as monaco from 'monaco-editor';

type Props = {
  code: string;
  language: string;
  theme: string;
  width: string;
  handleChangeCode: (value: string) => void;
};

export function Editor(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  useLayoutEffect(() => {
    if (contentRef.current) {
      editorRef.current = monaco.editor.create(contentRef.current, {
        value: props.code,
        language: props.language,
        theme: props.theme,
        minimap: {
          enabled: false
        },
        selectOnLineNumbers: true,
        automaticLayout: true,
        cursorBlinking: 'blink'
      });

      editorRef.current.onDidChangeModelContent(() => {
        if (editorRef.current) {
          const value = editorRef.current.getValue();
          props.handleChangeCode(value);
        }
      });

      editorRef.current.focus();

      return destroyEditor;
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();

      if (model) {
        monaco.editor.setModelLanguage(model, props.language);
      }
    }
  }, [props.language]);

  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setTheme(props.theme);
    }
  }, [props.theme]);

  function destroyEditor() {
    if (editorRef.current) {
      editorRef.current.dispose();
    }
  }

  return (
    <div
      ref={contentRef}
      style={{ borderRight: '1px solid #000', borderLeft: '1px solid #000' }}
    />
  );
}
