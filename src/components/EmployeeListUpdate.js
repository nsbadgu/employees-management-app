import React,{ useEffect,useRef,useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom';
import CurrentTime from '../TimeHook';
import { InputField } from './InputField';
import FormInput from './FormInput';

let formData = {};

const EmployeeListUpdate = () => {
   const param = useParams();
   const [spinner,setSpinner] = useState(true);

   const [update,setUpdate] = useState({
      id: 0,
      empCode: '',
      empFullName: '',
      empMobile: '',
      empSalary: '',
      empDOJ: '',

   })

   const navigate = useNavigate();
   const [submitBtn,setSubmitBtn] = useState(true);
   const [loader,setLoader] = useState(false);

   const clearTime = useRef(null)
   const clearTime2 = useRef(null)

   const onChange = event => {
      const { name,value } = event.target;

      setSubmitBtn(false);

      if (name === 'empFullName') {
         let updateValue = { ...update,[name]: (value.replace(/(^\w{1})|(\s+\w{1})/g,letter => letter.toUpperCase())) }
         setUpdate(updateValue)
      }
      if (name === 'empMobile') {
         let updatevalue = { ...update,[name]: value.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3").replace(/^\s|\s+$/gm,'') }
         setUpdate(updatevalue)
      }
      if (name === 'empCode') {
         setUpdate({ ...update,[name]: value })
      }
      if (name === 'empSalary') {
         setUpdate({ ...update,[name]: value })
      }
      if (name === 'empDOJ') {
         let updateValue = { ...update,[name]: value.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/,"$1-$2-$3").replace(/^\s|\s+$/gm,'') }
         setUpdate(updateValue);
      }

      console.log(update)
   }

   const submitHandler = e => {
      e.preventDefault();
      setLoader(true);
      setSubmitBtn(true);
      formData = { ...update };
      dataSend(formData);
   }

   const dataSend = async (data) => {
      console.log(data)
      try {
         const response = await fetch(`http://localhost:3001/posts/${param.id}`,{
            method: "PUT",
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
               setUpdate({
                  id: 0,empCode: '',empFullName: '',empMobile: '',empSalary: '',empDOJ: ''
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
      clearTime2.current = setTimeout(() => {
         setSpinner(false);

         if (spinner) {
            fetch(`http://localhost:3001/posts/${param.id}`,{
               method: 'GET',
               header: {
                  "Content-Type": "application/json"
               }
            }).then(res => res.json()).then(resData => {

               setUpdate({ ...resData })
            });
         }
      },3000);

      return () => {
         clearTimeout(clearTime.current)
         clearTimeout(clearTime2.current)
      }
   },[])

   console.log(update)
   return (
      <>
         <div className="uk-card uk-card-default uk-width-1-2@m" style={{ margin: '0 auto' }}>
            <div className="uk-card-header">
               <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div className="uk-width-expand">
                     <h3 className="uk-card-title uk-margin-remove-bottom">EMPLOYEE DETAILS UPDATE FORM</h3>
                     <p className="uk-text-meta uk-margin-remove-top">
                        <time><CurrentTime /></time>
                     </p>
                  </div>
               </div>
            </div>
            <form onSubmit={submitHandler} className="uk-form-stacked">
               <div className="uk-card-body" style={{ position: 'relative' }}>
                  <div className="spinner" style={{ position: 'absolute',top: 0,left: 0,width: '100%',height: '100%',textAlign: 'center',background: 'rgba(255,255,255,0.7)',display: spinner ? 'block' : 'none' }}>
                     <div data-uk-spinner style={{ position: 'absolute',top: '50%',transform: 'translateY(-50%)' }}></div>
                  </div>
                  {
                     InputField.length > 0 && InputField.map((input) => (
                        <FormInput key={input.id} {...input} value={update[input.name]} onchange={onChange} />
                     ))
                  }

               </div>
               <div className="uk-card-footer">
                  <button type="submit" className="uk-button uk-button-secondary uk-button-large uk-margin-right" disabled={submitBtn} onBlur={() => update.empDOJ !== '' ? setSubmitBtn(false) : setSubmitBtn(true)} onFocus={() => update.empDOJ === '' ? setSubmitBtn(true) : setSubmitBtn(false)}>Submit</button>
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

export default EmployeeListUpdate