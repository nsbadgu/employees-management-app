import React from 'react'
import { Routes,Route } from 'react-router-dom'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import EmployeeListUpdate from './components/EmployeeListUpdate'
import NotFoundPage from './components/not-found'

const App = () => {
   return (<>
      <div className="uk-container" style={{ paddingTop: '100px' }}>
         <Routes>
            <Route path="/" exact element={<EmployeeForm />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/employee-list-update/:id" element={<EmployeeListUpdate />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </div>
   </>
   )
}

export default App