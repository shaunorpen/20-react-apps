import React, { useState } from 'react';

function Tab({ children }) {
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    opacity: 0,
  });

  function moveHightlight(e) {
    setHighlightStyle({ left: e.nativeEvent.layerX - 150 });
  }

  function hideHighlight(e) {
    setHighlightStyle({ opacity: 0 });
  }
  return (
    <div
      className='tab'
      onMouseMove={moveHightlight}
      onMouseOut={hideHighlight}
    >
      <div className='highlight' style={highlightStyle} />
      {children}
    </div>
  );
}

export default Tab;
