"use client";
import DashboardLayout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import BreadscrumbsDisplay from "../BreadscrumbsDisplay";
import ManageTripsOwner from "@/components/routedDashboard/parkOwner/manage-trips/ManageTripsOwner";
import ManageTripsManager from "@/components/routedDashboard/parkManager/manage-trips/ManageTripsManager";

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
      {userData?.userCategory === "MANAGER" ? (
        <ManageTripsOwner />
      ) : userData?.userCategory === "PARK_OWNER" ? (
        <ManageTripsManager />
      ) : (
        <div></div>
      )}
      <div>trips</div>
    </DashboardLayout>
  );
};

export default Page;
