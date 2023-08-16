import React,{ useEffect,useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import CurrentTime from '../TimeHook';
import { InputField } from './InputField';



let formData = {};

const EmployeeForm = () => {
   const navigate = useNavigate();
   const [submitBtn,setSubmitBtn] = useState(false);
   const [loader,setLoader] = useState(false);
   const [values,setValues] = useState({
      id: 0,
      empCode: '',
      empFullName: '',
      empMobile: '',
      empSalary: '',
      empDOJ: '',

   })

   const clearTime = useRef(null)

   const onChange = event => {
      const { name,value } = event.target;

      if (name === 'empFullName') {
         let updateValue = { ...values,[name]: (value.replace(/(^\w{1})|(\s+\w{1})/g,letter => letter.toUpperCase())) }
         setValues(updateValue)
      }
      if (name === 'empMobile') {
         let updatevalue = { ...values,[name]: value.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3").replace(/^\s|\s+$/gm,'') }
         setValues(updatevalue)
      }
      if (name === 'empCode') {
         setValues({ ...values,[name]: value })
      }
      if (name === 'empSalary') {
         setValues({ ...values,[name]: value })
      }
      if (name === 'empDOJ') {
         let updateValue = { ...values,[name]: value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/,"$1-$2-$3").replace(/^\s|\s+$/gm,'') }
         setValues(updateValue)
      }

      console.log(values)
   }

   const onkeydown = event => {
      const { name,value } = event.target;

      console.log(event.key)
   }


   const submitHandler = e => {
      e.preventDefault();
      const updateId = Math.floor(Math.random() * new Date() / 100);
      console.log(updateId)

      setLoader(true);
      setSubmitBtn(true);
      formData = { ...values,id: updateId };
      dataSend(formData);
   }

   const dataSend = async (data) => {
      console.log(data)
      try {
         const response = await fetch('http://localhost:3001/posts',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            }
         })

         if (response.status === 200 || response.status === 201) {

            clearTime.current = setTimeout(() => {
               setLoader(false);
               setSubmitBtn(false);
               formData = {};
               setValues({
                  id: '',empCode: '',empFullName: '',empMobile: '',empSalary: '',empDOJ: ''
               })
            },3000)
            clearTime.current = setTimeout(() => {
               navigate('/employee-list');
            },4000)

         }
         else {
            throw new Error('HTTP Status ' + response.status)
         }
      }
      catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      return () => {
         clearTimeout(clearTime.current)
      }
   },[])

   return (
      <>
         <div className="uk-card uk-card-default uk-width-1-2@m" style={{ margin: '0 auto' }}>
            <div className="uk-card-header">
               <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div className="uk-width-expand">
                     <h3 className="uk-card-title uk-margin-remove-bottom">EMPLOYEE FORM</h3>
                     <p className="uk-text-meta uk-margin-remove-top">
                        <time><CurrentTime /></time>
                     </p>
                  </div>
               </div>
            </div>
            <form onSubmit={submitHandler} className="uk-form-stacked">
               <div className="uk-card-body">
                  {
                     InputField.length > 0 && InputField.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onchange={onChange} onkeydown={onkeydown} />
                     ))
                  }

               </div>
               <div className="uk-card-footer">
                  <button type="submit" className="uk-button uk-button-secondary uk-button-large uk-margin-right" disabled={submitBtn}>Submit</button>
                  <div data-uk-spinner style={{ visibility: loader ? 'visible' : 'hidden' }}></div>
                  <Link to="/employee-list" className="uk-link-text" style={{
                     display: 'inlineBlock',
                     verticalAlign: 'middle',
                     marginLeft: 'calc(100% - 390px)'
                  }}>GO TO EMPLOYEES LIST</Link>
               </div>
            </form>

            {/*  {formDetailData && formDetailData.map((item) => <li key={item.email}>{item.email}{item.mobileNo}</li>)} */}
         </div>
      </>
   )
}

export default EmployeeForm