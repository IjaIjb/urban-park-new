"use client";
import DashboardLayout from "@/components/Layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import BreadscrumbsDisplay from "../../BreadscrumbsDisplay";
import { useLazyParkControllerFindAllParksQuery } from "@/store/api";
import * as Yup from "yup";

const page = () => {
  const [getAllParks, { data: parkData }] =
    useLazyParkControllerFindAllParksQuery<any>();

  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    getAllParks({
      offset: 0, // Default offset
      limit: 10, // Default limit (adjust as needed)
      region: "", // Can be dynamically set later
      city: "", // Can be dynamically set later
      description: "", // Optional filter
    });
  }, [getAllParks]);

  console.log(parkData);
  const initialData = {
    firstname: "",
    lastname: "",
    phone: "",
    city: "",
    avatar: "",
    /** Password of the user */
    password: "",
    /** Email of the user */
    email: "",
    role: "ADMIN",
    userType: "PARK",
    userCategory: "MANAGER",
    // city: "",
    documents: [
      { name: "", expiryDate: "", image: null }, // Ensure a default document exists
    ],
  };

  const validation = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be minimum of 6 characters")
      .max(255)
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
    // documents: Yup.array().of(
    //   Yup.object().shape({
    //     name: Yup.string().required("Document name is required"),
    //     expiryDate: Yup.date().required("Expiry date is required"),
    //     image: Yup.mixed().required("Document upload is required"),
    //   })
    // ),
  });

  const onSubmit = async (values: any) => {};
  return (
    <DashboardLayout>
      <BreadscrumbsDisplay />

      <div className="grid lg:grid-cols-12 mt-10">
        <div className="lg:col-span-8 ">
          <Formik
            initialValues={initialData}
            validationSchema={validation}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-full  mt-6 mb-6 flex flex-col justify-between">
                <div className="mb-7">
                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="phone"
                    >
                      Select Park
                    </label>
                    <Field
                      className="mt-1 block w-full bg-transparent h-12 border-[1px] border-[#E4E1E1]  px-3 rounded-[10px] focus:outline-primary "
                      name="city"
                      as="select"
                      // type="tel"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue("city", event.target.value);
                      }}
                      placeholder=""
                    >
                      <option label="Select"></option>
                      {parkData?.data.map((park) => (
                        <option key={park.id} value={park.description}>
                          {park.description}
                        </option>
                      ))}
                    </Field>
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>

                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="coordinate"
                    >
                      Dispatcher Name
                    </label>
                    <Field
                      className="mt-1 block w-full bg-transparent h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                      name="coordinate"
                      type="text"
                      id="coordinate"
                      placeholder=""
                    />
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="coordinate" />
                    </p>
                  </div>

                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px]  font-[500] "
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <Field
                      className="mt-1 block w-full bg-transparent h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                      name="email"
                      type="email"
                      id="email"
                      placeholder=""
                    />
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="email" />
                    </p>
                  </div>

                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <Field
                      className="mt-1 block w-full bg-transparent h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                      name="phone"
                      type="text"
                      id="phone"
                      placeholder=""
                    />
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>

                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="address"
                    >
                      Full Address
                    </label>
                    <Field
                      className="mt-1 block w-full bg-transparent h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                      name="address"
                      type="text"
                      id="address"
                      placeholder=""
                    />
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="address" />
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  // onClick={
                  //   showScreen === 1
                  //     ? () => setShowScreen(2)
                  //     : showScreen === 2
                  //     ? () => setShowScreen(3)
                  //     : () => setShowScreen(4)
                  // }
                  // disabled={isLoading} // Disable button if no option is selected
                  className={`disabled:bg-gray-500  py-2 w-full px-6 mt-4 bg-[#036E03] text-white rounded-lg  hover:bg-green-700
        }`}
                >
                  {
                    // isLoading ? <LoadingSpinner /> :
                    "Add Dispatch Officer"
                  }
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
