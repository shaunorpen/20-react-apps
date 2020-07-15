import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default function App () {
  const [markdown, setMarkdown] = useState('# sup');

  const handleChange = e => {
    setMarkdown(e.target.value);
  };

  return (
    <div className='app'>
      <textarea value={markdown} onChange={handleChange} />

      <ReactMarkdown source={markdown} className='preview' />
    </div>
  );
}
