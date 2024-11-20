import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { closeTicket } from "../../api/ApiClient";
import Loading from "../elements/loading";

function ConfirmCloseTicketModal({ open, setOpen ,id}) {
    const navigate = useNavigate();
    const closeTicketMutation = useMutation(
        () => closeTicket(id),
        {
          onSuccess: (res) => {
            navigate("/tickets")
            setOpen(false)
          },
        }
      );

    const handleCloseTicket=()=>{
        console.log("SDfsdfdsfsdfsd");
        closeTicketMutation.mutate()
       }
  return (
    <div className="w-full  absolute ">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-2/5 transition-all  flex flex-col items-start ">
                  <div className="w-full bg-white rounded-lg p-4 flex flex-col justify-center items-center">
                    <div className="flex flex-row gap-3 mt-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 16.9106C13.81 16.9106 13.62 16.8406 13.47 16.6906L9.50998 12.7306C9.21998 12.4406 9.21998 11.9606 9.50998 11.6706C9.79998 11.3806 10.28 11.3806 10.57 11.6706L14.53 15.6306C14.82 15.9206 14.82 16.4006 14.53 16.6906C14.38 16.8306 14.19 16.9106 14 16.9106Z"
                          fill="#222427"
                        />
                        <path
                          d="M9.99994 16.9497C9.80994 16.9497 9.61994 16.8797 9.46994 16.7297C9.17994 16.4397 9.17994 15.9597 9.46994 15.6697L13.4299 11.7097C13.7199 11.4197 14.1999 11.4197 14.4899 11.7097C14.7799 11.9997 14.7799 12.4797 14.4899 12.7697L10.5299 16.7297C10.3799 16.8797 10.1899 16.9497 9.99994 16.9497Z"
                          fill="#222427"
                        />
                        <path
                          d="M14 6.75H10C9.04 6.75 7.25 6.75 7.25 4C7.25 1.25 9.04 1.25 10 1.25H14C14.96 1.25 16.75 1.25 16.75 4C16.75 4.96 16.75 6.75 14 6.75ZM10 2.75C9.01 2.75 8.75 2.75 8.75 4C8.75 5.25 9.01 5.25 10 5.25H14C15.25 5.25 15.25 4.99 15.25 4C15.25 2.75 14.99 2.75 14 2.75H10Z"
                          fill="#222427"
                        />
                        <path
                          d="M15 22.7504H9C3.38 22.7504 2.25 20.1704 2.25 16.0004V10.0004C2.25 5.44042 3.9 3.49042 7.96 3.28042C8.38 3.26042 8.73 3.57042 8.75 3.99042C8.77 4.41042 8.45 4.75042 8.04 4.77042C5.2 4.93042 3.75 5.78042 3.75 10.0004V16.0004C3.75 19.7004 4.48 21.2504 9 21.2504H15C19.52 21.2504 20.25 19.7004 20.25 16.0004V10.0004C20.25 5.78042 18.8 4.93042 15.96 4.77042C15.55 4.75042 15.23 4.39042 15.25 3.98042C15.27 3.57042 15.63 3.25042 16.04 3.27042C20.1 3.49042 21.75 5.44042 21.75 9.99042V15.9904C21.75 20.1704 20.62 22.7504 15 22.7504Z"
                          fill="#222427"
                        />
                      </svg>

                      <p className="font-Kalameh text-[18px] text-black">
                        آیا از بستن تیکت اطمینان داری؟
                      </p>
                    </div>
                    <div className="flex flex-row gap-3 mt-6">
                      <button 
                      className="font-KalamehMed flex flex-row gap-2 items-center justify-center  text-[14px] h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-10 text-white rounded-[4px]"
                      onClick={()=>handleCloseTicket()}
                      >
                      

                        {
                  closeTicketMutation.isLoading?     <Loading className="w-12 h-12 text-blacklead animate-pulse" />
                  :"  بله، اطمینان دارم"
                }
                
                      </button>
                      <button 
                      className="font-KalamehMed flex flex-row gap-2 hover:text-white items-center justify-center  text-[14px] h-11 bg-[#EFF1F1] hover:bg-blacklead transition-colors duration-500 px-10 text-black rounded-[4px]"
                      onClick={()=>   setOpen(false)}
                      >
                      بررسی مجدد
                      </button>
                    </div>
                    <p className="mt-6 text-[#5C5F5F] text-[12px] font-Kalameh"> 
                    در صورتی که کاربر به تیکت پاسخ ارسال کند تیکت مجدداً باز میشود
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default ConfirmCloseTicketModal;
