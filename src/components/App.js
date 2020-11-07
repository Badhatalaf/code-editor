import '../index.css';
import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, sethtml] = useLocalStorage('html', '')
  const [css, setcss] = useLocalStorage('css', '')
  const [js, setjs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
    `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={sethtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setcss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setjs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
      <footer>
        Copyright &copy; Aryav Tiwari
      </footer>
    </>
  );
}

export default App;
