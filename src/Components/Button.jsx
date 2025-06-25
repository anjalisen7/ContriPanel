import React from "react";

  
export default function Button(props){
     return(
        <button
      type={props.type || "button"}
      className={props.className || "btn btn-secondary"}
      disabled={props.disabled}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
     );
}