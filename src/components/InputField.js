export const InputField = [
   {
      id: 1,
      name: 'empCode',
      type: 'number',
      label: 'Employee Code',
      errorMessage: 'Employee code should be digits',
      pattern: '^[0-9]+$',
      required: true
   },
   {
      id: 2,
      name: 'empFullName',
      type: 'text',
      label: 'Fullname',
      errorMessage: 'Fullname should be characters',
      pattern: '^[a-zA-Z ]+$',
      required: true
   },
   {
      id: 3,
      name: 'empMobile',
      type: 'text',
      label: 'Mobile',
      errorMessage: 'It is should be 10 digits',
      pattern: '^([0-9]{3})+\-([0-9]{3})+\-([0-9]{4})$',
      required: true
   },
   {
      id: 4,
      name: 'empSalary',
      type: 'number',
      label: 'Salary',
      errorMessage: 'Salary should be digits',
      pattern: '^[0-9]+$',
      required: true
   },
   {
      id: 5,
      name: 'empDOJ',
      type: 'text',
      label: 'Date of Joining',
      errorMessage: 'Date should be like format dd-mm-yyyy',
      pattern: '^([0-9]{2})+\-([0-9]{2})+\-([0-9]{4})$',
      required: true
   }
]
