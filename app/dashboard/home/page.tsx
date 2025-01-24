"use client"; // Add this for client components in the Next.js app directory
import DashboardLayout from '@/components/Layout'
import LoadingSpinnerPage from '@/components/UI/LoadingSpinnerPage'
import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import "react-responsive-modal/styles.css";
import Image from "next/image";
import BreadscrumbsDisplay from '../BreadscrumbsDisplay';
import { useLazyTripControllerGetTripsByVehicleOwnerIdQuery, useLazyVehicleControllerGetMyVehiclesQuery } from '@/store/api';
import FilteredParkks from './FilteredParkks';

const page = () => {
    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState<any>(null);
  
    useEffect(() => {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }, []);
  
    const onOpenModal = () => {
      // e.preventDefault();
      setOpen(true);
    };
    const onCloseModal = () => setOpen(false);
  
    console.log(userData);
  
    const [getActiveVehicle, { data: activeVehicles, isLoading }] =
      useLazyVehicleControllerGetMyVehiclesQuery<any>();
  
    const [getUserTripsById, { data: userTripsById }] =
      useLazyTripControllerGetTripsByVehicleOwnerIdQuery<any>();
  
    console.log(activeVehicles);
    // Fetch vehicle types on component mount
    useEffect(() => {
      getActiveVehicle(); // Trigger the API call
    }, [getActiveVehicle]);
  
    useEffect(() => {
      if (userData) {
        // setIsLoading(true); // Set loading state
        getUserTripsById(userData.individual.userId).unwrap(); // Handle response or errors
        // .finally(() => setIsLoading(false)); // Reset loading state
      }
    }, [userData, getUserTripsById]);
  
    useEffect(() => {
      if (isLoading) {
        onOpenModal();
      } else {
        onCloseModal();
      }
    }, [isLoading]);
  
    const totalRevenue =
      activeVehicles?.data?.reduce((sum, vehicle) => {
        const revenue = parseFloat(vehicle.totalRevenue) || 0;
        return sum + revenue;
      }, 0) || 0;
  
  
  return (
    <DashboardLayout>
      {isLoading ? null : (
        <div className="bg-white overflow-hidden rounded-[8px] px-3 md:px-8 py-7 md:py-9">
          <BreadscrumbsDisplay />
          {/* <h5 className="md:text-[20px] text-[16px] font-light mb-4">
            Account Type:{" "}
            <span className="font-[500]">
              {userData?.individual ? "Individual" : "Corporate"}
            </span>
          </h5> */}

          <div className="bg-primary mt-5 rounded-[10px] overflow-hidden">
            <div className="flex justify-between items-center">
              <div className=" py-3 md:py-4 pl-3 pr-3 md:pl-6 md:pr-0 text-white ">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <div className="md:block hidden">
                      <Image
                        aria-hidden
                        src="/images/dashboard/dashboardCar.svg"
                        alt="Window icon"
                        width={40}
                        height={40}
                      />
                    </div>

                    <div className="block md:hidden">
                      <Image
                        aria-hidden
                        src="/images/dashboard/dashboardCar.svg"
                        alt="Window icon"
                        width={30}
                        height={30}
                      />
                    </div>

                    <h4 className=" text-[18px] md:text-[24px] font-light leading-[25px]">
                      Total Trips Set
                    </h4>
                  </div>

                  <h4 className=" text-[35px] md:text-[48px] font-[700]">
                    ₦{totalRevenue.toFixed(2)}
                  </h4>
                </div>
              </div>
              <div className="md:block hidden">
                {/* <img src="/dashboard/Group 20.svg" alt="Logo" className="" /> */}
                {/* <div className="relative w-full h-64"> */}
                <Image
                  src="/images/dashboard/Group 20.svg"
                  alt="Descriptive alt text"
                  className="h-full w-full"
                  width={100}
                  height={100}
                  priority
                />
                {/* </div> */}
              </div>
            </div>
          </div>

          <section className="py-5">
          <div className='md:flex w-full gap-4'>
            <div className='w-full md:mb-0 mb-2 flex rounded-[6px] bg-[#036E030F]/[6%] justify-center py-3 '>
                <h4 className='text-primary'>
Add Park
                </h4>
            </div>

            <div className='w-full flex md:mb-0 mb-2 rounded-[6px] bg-[#375F900F]/[6%] justify-center py-3 '>
                <h4 className='text-[#375F90]'>
Add Park Manager
                </h4>
            </div>

            <div className='w-full rounded-[6px] md:mb-0 mb-2 flex bg-[#C054060F]/[6%] justify-center py-3 '>
                <h4 className='text-[#C05406]'>
Add Park Manager
                </h4>
            </div>

          </div>
          </section>

          <section className="overflow-hidden overflow-x-scroll">
            <div className="">
              <FilteredParkks />
            </div>

            {/* <div className="block sm:hidden">
              <FilteredFleetsMobile />
            </div> */}
          </section>
        </div>
      )}

      <Modal
        classNames={{
          modal: "rounded-[10px] overflow-visible relative",
        }}
        open={open}
        onClose={onCloseModal}
        showCloseIcon={false} // Hides the close button
        center
      >
        <div className="px-2 md:px-5 w-[100px] h-[100px] flex justify-center items-center text-center">
          <LoadingSpinnerPage />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default page