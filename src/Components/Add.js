import React from 'react';

function Add({ToggleEditor}) {

  return (
    <div>
        <button type="add" onClick={ToggleEditor}>➕</button>
    </div>
  );
}

export default Add;
