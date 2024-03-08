  import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
 import { Offline } from "react-detect-offline";

export default function Layout() {

  return <>

  <Navbar/>
    <div className='container py-5 mt-5 '>
      <Offline>
        <div className='row justify-content-center text-center z-3 position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75 align-items-center'>
          <h2 className='fw-bold'>Only shown offline (surprise!)</h2>
        </div>
        </Offline>
      <Outlet> </Outlet>
      
    </div>
 
  </>
}
