import { useState } from "react";

const FormInput = (props) => {
   const { label,onchange,id,errorMessage,onkeydown,value,...inputPros } = props;
   const [focused,setFocused] = useState(false);
   const handlerBlur = () => value !== '' && setFocused(false);
   const handlerFocus = () => value === '' && setFocused(true);
   return (
      <div className="uk-margin">
         <label className="uk-form-label" htmlFor="empCode">{label}</label>
         <div className="uk-form-controls">
            <input {...inputPros} value={value} className={`uk-input uk-form-large ${focused ? 'uk-form-danger' : ''}`} onChange={onchange} focused={focused.toString()} onBlur={handlerBlur} onKeyDown={onkeydown} onFocus={handlerFocus} />
            <p className="uk-error-text errortext">{errorMessage}</p>
         </div>
      </div>
   )
}

export default FormInput