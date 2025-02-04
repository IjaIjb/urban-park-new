"use client";
import DashboardLayout from "@/components/Layout";
import React from "react";
import BreadscrumbsDisplay from "../../BreadscrumbsDisplay";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const page = () => {
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
              <div className="bg-white overflow-hidden rounded-[8px] px-3 md:px-8 py-7 md:py-9">

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
             
                  {/* <div className="grid md:grid-cols-2 gap-3 w-full"> */}
                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="phone"
                    >
                      Select Provider Agency
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
                      <option value="GIG">GIG</option>
                      <option value="God Is Good">God Is Good</option>
                    </Field>
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>
                  <div className=" mb-3 relative">
                    <label
                      className=" text-[#2B2C2B] text-[16px] font-[500] "
                      htmlFor="phone"
                    >
                      Select Trip Code
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
                      <option value="2345">2354</option>
                      <option value="67839">67839</option>
                    </Field>
                    <p className="text-red-700 text-xs mt-1 ">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>

                  {/* </div> */}
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
                    "Submit Report"
                  }
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
