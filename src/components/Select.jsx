import React, { forwardRef, useId } from "react";

function Select({
    options,
    label,
    className,
    ...props   
},ref){

    

    const id=useId();
    return(
        <>
         {label && <label className="font-semibold" htmlFor={id}>
             {label}
        </label>}
        <select value={options[0]}  id={id} ref={ref} {...props} className={`${className}  border rounded-sm  border-gray-600 `}>

            {options?.map((item)=>(
               <option key={item} value={item}>{item}</option> 
            ))}

        </select>
        </>
    )
}

export default React.forwardRef(Select);