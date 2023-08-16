import React,{ useEffect,useState } from 'react'

const CurrentTime = () => {
   const [time,setTime] = useState(new Date())
   useEffect(() => {
      const timer = setInterval(() => setTime(new Date()),100);

      return () => {
         clearInterval(timer)
      }
   },[])

   return <>{time.toLocaleTimeString()}</>
}

export default CurrentTime