import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { profile } from '../api/ApiClient'
import UserContext from '../context/UserContext'
import Sidebar from '../components/main-conponents/sidebar'
import Media from './media/media'
import AdminHeader from '../components/main-conponents/admin-header'

function Home() {

  const profileQuery=useQuery(["profile"],async ()=>profile(),{
    onSuccess:(res)=>{
      console.log("sdvsdbsdb",res);
    }
  })
  return (
    <div className='w-full'>


    </div>
  )
}


export default Home