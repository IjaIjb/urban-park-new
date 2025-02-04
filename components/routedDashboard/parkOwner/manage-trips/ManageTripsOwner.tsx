"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BreadscrumbsDisplay from "@/app/dashboard/BreadscrumbsDisplay";
import ManageTripsTable from "./ManageTripsTable";

const ManageTripsOwner = () => {
  return (
    <div>
      <div className="bg-white overflow-hidden rounded-[8px] px-3 md:px-8 py-7 md:py-9">
        <BreadscrumbsDisplay />
        <div className="grid md:grid-cols-3 my-6 gap-6">
          <Link
            href={"/dashboard/park/add-park"}
            className="py-6 flex justify-center shadow-lg  bg-white rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <Image
                  className=""
                  src="/images/trackRequest.svg"
                  alt="image"
                  width={50}
                  height={50}
                  priority
                />
              </div>
              <div className="flex justify-center">
                <h4 className="text-center">Track Request</h4>
              </div>
            </div>
          </Link>

          <Link
            href={"/dashboard/manage-trips/request-a-driver"}
            className="py-6 flex justify-center shadow-lg  bg-white rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <Image
                  className=""
                  src="/images/requestDriver.svg"
                  alt="image"
                  width={50}
                  height={50}
                  priority
                />
              </div>
              <div className="flex justify-center">
                <h4 className="text-center">Request a Driver</h4>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 my-6 gap-6">
          <button className="bg-[#036E030F]/[6%] py-3 rounded-lg flex justify-center ">
            <h5 className="text-primary">Set Trip</h5>
          </button>
        </div>
        <ManageTripsTable />

        {/* <FilteredParkks /> */}
      </div>
    </div>
  );
};

export default ManageTripsOwner;
