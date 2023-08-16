import React,{ useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import CurrentTime from '../TimeHook';

const EmployeeList = () => {
   const [data,setData] = useState([]);

   const getData = async () => {
      const res = await fetch('http://localhost:3001/posts');
      const dataRes = await res.json();
      setData(dataRes);
   }

   const deleteData = async (id,e) => {
      const deleteData = window.confirm();

      deleteData && await fetch(`http://localhost:3001/posts/${id}`,{
         method: "DELETE"
      }).then(res => res.json()).then((data) => {
         setData(values => {
            return values.filter(item => item.id !== id)
         })
         console.log(data)
      });
   }


   useEffect(() => {
      getData();
   },[data])



   return (
      <div className="uk-card uk-card-default" style={{ margin: '0 auto',width: 'calc(min(1000px, 100%))' }}>
         <div className="uk-card-header" >
            <div className="uk-grid-small uk-flex-middle" data-uk-grid>
               <div className="uk-width-expand">
                  <h3 className="uk-card-title uk-margin-remove-bottom">Employees List</h3>
                  <p className="uk-text-meta uk-margin-remove-top">
                     <time><CurrentTime /></time>
                  </p>
               </div>
            </div>
         </div>
         <div className="uk-card-body  uk-padding-remove">
            <div className="uk-overflow-auto">
               <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                  <thead>
                     <tr>
                        <th className="uk-table-shrink" style={{ width: '8%',textAlign: "center" }}>Sr. No.</th>
                        <th className="uk-table-expand" style={{ width: '17%' }}>Employee Code</th>
                        <th className="uk-width-small" style={{ width: '15%' }}>Fullname</th>
                        <th className="uk-width-small" style={{ width: '' }}>Mobile No.</th>
                        <th className="uk-width-small" style={{ width: '' }}>Salary</th>
                        <th className="uk-width-small" style={{ width: '' }}>Date of Joining</th>
                        <th className="uk-table-shrink uk-text-nowrap uk-text-center">Edit / Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        data.length === 0 ? (
                           <tr>
                              <td colSpan="7" className=" uk-text-center">No data available</td>
                           </tr>
                        ) :
                           (data.map((item,index) => (
                              <tr key={item.id}>
                                 <td className=" uk-text-center">{index + 1}</td>
                                 <td className="uk-text-truncate">{item.empCode}</td>
                                 <td className="uk-text-truncate">{item.empFullName}</td>
                                 <td className="uk-text-truncate">{item.empMobile}</td>
                                 <td className="uk-text-truncate">{item.empSalary}</td>
                                 <td className="uk-text-truncate">{item.empDOJ}</td>
                                 <td className="uk-text-nowrap uk-text-center">
                                    {/* <button id="js-modal-confirm" uk-icon="icon:  file-edit" style={{ marginRight: '15px' }}></button> */}
                                    <Link to={`/employee-list-update/${item.id}`} uk-icon="icon:  file-edit" style={{ marginRight: '15px' }}></Link>
                                    <button type="button" uk-icon="icon: trash" onClick={(e) => deleteData(item.id,e)}></button></td>
                              </tr>
                           ))
                           )
                     }
                  </tbody>
               </table>
            </div>
         </div>
         <div className="uk-card-footer uk-text-center">
            <Link to="/" className="uk-button uk-button-text">BACK TO EMPLOYEE FORM</Link>
         </div>
      </div>
   )
}

export default EmployeeList