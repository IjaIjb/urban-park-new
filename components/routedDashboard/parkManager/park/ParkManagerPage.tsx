"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BreadscrumbsDisplay from "@/app/dashboard/BreadscrumbsDisplay";
import DispatchOfficerTable from "./DispatchOfficerTable";

const ParkManagerPage = () => {
  return (
    <div>
      <div className="bg-white overflow-hidden rounded-[8px] px-3 md:px-8 py-7 md:py-9">
        <BreadscrumbsDisplay />
        <div className="grid md:grid-cols-1 my-6 gap-6">
          <Link
            href={"/dashboard/park/add-dispatch-officer"}
            className="py-6 flex justify-center shadow-lg  bg-white rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <Image
                  className=""
                  src="/images/park/addDispatch.svg"
                  alt="image"
                  width={50}
                  height={50}
                  priority
                />
              </div>
              <div className="flex justify-center">
                <h4 className="text-center">Add Dispatch Officer</h4>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 my-6 gap-6">
        <Link
            href={"/dashboard/park/archive"}
             className="bg-[#036E030F]/[6%] py-3 rounded-lg flex justify-center ">
            <h5 className="text-primary">View Archive</h5>
          </Link>

          {/* <button className="bg-[#375F900F]/[6%] py-3 rounded-lg flex justify-center ">
            <h5 className="text-[#274871]">See All Dispatch Officers</h5>
          </button> */}
        </div>

        <DispatchOfficerTable />
      </div>
    </div>
  );
};

export default ParkManagerPage;
