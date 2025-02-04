"use client";
import DashboardLayout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import BreadscrumbsDisplay from "../BreadscrumbsDisplay";
import Image from "next/image";
import FilteredParkks from "../home/FilteredParkks";
import Link from "next/link";
import ParkOwnerPage from "@/components/routedDashboard/parkOwner/park/ParkOwnerPage";
import ParkManagerPage from "@/components/routedDashboard/parkManager/park/ParkManagerPage";

const Page = () => {
      const [userData, setUserData] = useState<any>(null);
    
      useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      }, []);
    
  return (
    <DashboardLayout>
      {/* <BreadscrumbsDisplay /> */}

      {userData?.userCategory === "PARK_OWNER" ? (
        <ParkOwnerPage />
      ) : userData?.userCategory === "MANAGER" ? (
       <ParkManagerPage />
      ) : (
        <div></div>
      )}   
    </DashboardLayout>
  );
};

export default Page;
