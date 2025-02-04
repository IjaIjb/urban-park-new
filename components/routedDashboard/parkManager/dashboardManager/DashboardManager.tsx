import React from "react";
import Image from "next/image";
import BreadscrumbsDisplay from "@/app/dashboard/BreadscrumbsDisplay";
import Link from "next/link";
import { FiCopy } from "react-icons/fi";

const DashboardManager = () => {
  return (
    <div>
      <div className="bg-white overflow-hidden rounded-[8px] px-3 md:px-8 py-7 md:py-9">
        <BreadscrumbsDisplay />
        {/* <h5 className="md:text-[20px] text-[16px] font-light mb-4">
            Account Type:{" "}
            <span className="font-[500]">
              {userData?.individual ? "Individual" : "Corporate"}
            </span>
          </h5> */}

        <div className="flex justify-between">
          <h5 className="text-[16px] md:text-[20px] pt-8 font-[400] mb-3">
            Manager Name:{" "}
            <span className="text-[18px] md:text-[20px] font-[300]">
              Tade Ogunsowo
            </span>
          </h5>

          <div className="flex gap-2 items-center mb-3">
            <h5 className="text-[16px] md:text-[20px] font-[400] ">
              Number Plate:{" "}
            </h5>
            <div className="flex gap-2 items-center">
              <span className="text-[18px] md:text-[20px] font-[300] text-primary">
                245378292545689FA
              </span>
              <button
                // onClick={copyToClipboard}
                className="ml-2 px-2 py-1 text-primary rounded hover:text-primary/[80%]"
              >
                <FiCopy className="text-primary" />
              </button>
            </div>
          </div>
        </div>

        <h5 className="text-[16px] md:text-[20px]  font-[400] mb-3">
          Park Name:{" "}
          <span className="text-[18px] md:text-[20px] font-[300]">
            Sabo Park
          </span>
        </h5>

        <section className="py-5">
          <div className=" gap-4">
            <Link
              href={"/dashboard/park/add-park"}
              className="w-full md:w-fit px-20 md:mb-0 mb-2 flex rounded-[6px] bg-[#036E030F]/[6%] justify-center py-3 "
            >
              <h4 className="text-primary">View Park Statement</h4>
            </Link>
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 my-6 gap-6">
          <div className="py-6 flex flex-col gap-1 pl-4 md:pl-10  shadow-lg  bg-white rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                className=""
                src="/images/car.svg"
                alt="image"
                width={35}
                height={35}
                priority
              />
              <div className="flex justify-center">
                <h4 className="text-center text-[16px]">Total Trips Set</h4>
              </div>
            </div>

            <h5 className="text-[#121212] text-[30px] md:text-[40px] font-[700]">
              3,456
            </h5>
          </div>

          <div className="py-6 flex flex-col gap-1 pl-4 md:pl-10  shadow-lg  bg-white rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                className=""
                src="/images/success.svg"
                alt="image"
                width={35}
                height={35}
                priority
              />
              <div className="flex justify-center">
                <h4 className="text-center text-[16px]">Successful Trips</h4>
              </div>
            </div>

            <h5 className="text-[#121212] text-[30px] md:text-[40px] font-[700]">
              30,000
            </h5>
          </div>

          <div className="py-6 flex flex-col gap-1 pl-4 md:pl-10  shadow-lg  bg-white rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                className=""
                src="/images/cancel.svg"
                alt="image"
                width={35}
                height={35}
                priority
              />
              <div className="flex justify-center">
                <h4 className="text-center text-[16px]">Cancelled Trips</h4>
              </div>
            </div>

            <h5 className="text-[#121212] text-[30px] md:text-[40px] font-[700]">
              23,000
            </h5>
          </div>

          <div className="py-6 flex flex-col gap-1 pl-4 md:pl-10  shadow-lg  bg-white rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                className=""
                src="/images/schedule.svg"
                alt="image"
                width={35}
                height={35}
                priority
              />
              <div className="flex justify-center">
                <h4 className="text-center text-[16px]">Scheduled Trips</h4>
              </div>
            </div>

            <h5 className="text-[#121212] text-[30px] md:text-[40px] font-[700]">
              23,000
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;
