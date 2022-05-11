import React, { useState } from "react";



const CheckBox = (props) => {

  const [isChecked , setCheck] = useState(false)

  const toggleCheck = (event) => {

    // if (event)

    setCheck(!isChecked);
  }

  const mouseDownAndHover = (event) => {

    if ( event.altKey === true || event.ctrlKey === true ) {
      props.updateGrid(props.id);
      toggleCheck();
    }
    
  }
  

  return(
    <input type={'checkbox'} onMouseEnter={mouseDownAndHover}  checked={isChecked} onChange={() => (props.updateGrid(props.id), toggleCheck())} className={'box'}>
    </input>
  );
}

export default CheckBox;