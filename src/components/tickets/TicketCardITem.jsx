import React from 'react'
import { Link } from 'react-router-dom'

function TicketCardITem({item}) {
  return (
    <div className='w-full grid grid-cols-6 px-5 items-center gap-x-2 py-7 mt-4  bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg '>
    <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">
              {item?.user?.full_name}
              </p>
            </div>   
            
               <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">
             {item?.subject}
              </p>
            </div> <div className="col-span-2">
              <p className="font-KalamehMed text-sm font-medium line-clamp-3">
                {item?.message}
              </p>
            </div>

            <div className="col-span-1">
              <button className='rounded bg-white py-3 px-5 max-w-[120px] flex-nowrap flex flex-row justify-center items-center'>

              <p className="font-Kalameh text-sm ] font-medium" style={{color:item?.status_info?.color}}>
              {item?.status_info?.name}
              </p>
              </button>
            </div> 
             <div className="col-span-1 flex flex-row  gap-3 -mr-20">
              <button className='rounded w-[120px] flex-nowrap bg-white py-3 px-8 flex flex-row justify-center items-center'>

              <p className="font-Kalameh whitespace-nowrap text-sm  font-medium">
              {item?.department?.name}
              </p>
              </button>

            <Link to={`/tickets/${item?.id}`}>
            <button
          className="font-KalamehSemi flex flex-row gap-2 items-center justify-center font-semibold text-[12px] h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-6 text-white rounded-[4px]"
        
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16.3299C9.60998 16.3299 7.66998 14.3899 7.66998 11.9999C7.66998 9.60992 9.60998 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.16998 10.4399 9.16998 11.9999C9.16998 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" fill="white"/>
<path d="M12 21.0205C8.24002 21.0205 4.69002 18.8205 2.25002 15.0005C1.19002 13.3505 1.19002 10.6605 2.25002 9.00047C4.70002 5.18047 8.25002 2.98047 12 2.98047C15.75 2.98047 19.3 5.18047 21.74 9.00047C22.8 10.6505 22.8 13.3405 21.74 15.0005C19.3 18.8205 15.75 21.0205 12 21.0205ZM12 4.48047C8.77002 4.48047 5.68002 6.42047 3.52002 9.81047C2.77002 10.9805 2.77002 13.0205 3.52002 14.1905C5.68002 17.5805 8.77002 19.5205 12 19.5205C15.23 19.5205 18.32 17.5805 20.48 14.1905C21.23 13.0205 21.23 10.9805 20.48 9.81047C18.32 6.42047 15.23 4.48047 12 4.48047Z" fill="white"/>
</svg>
          مشاهده

        </button>
            </Link>
            </div>  
    </div>
  )
}

export default TicketCardITem