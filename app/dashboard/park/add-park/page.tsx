"use client";
import DashboardLayout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import BreadscrumbsDisplay from '../../BreadscrumbsDisplay'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import LoadingSpinner from '@/components/UI/LoadingSpinner'
import nigeriaData from "../../../../components/assets/states.json"; // Adjust path to your JSON file
import * as Yup from "yup";
import { useParkControllerCreateParkMutation } from '@/store/api'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
   const [userData, setUserData] = useState<any>(null);
  
    useEffect(() => {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }, []);
    
      const [addPark, { isLoading }] = useParkControllerCreateParkMutation();
    
    const initialData = {
        description: "",
        address: "",
        phone: "",
        city: "",
        coordinate: "",
        region: "",
        image: "https://res.cloudinary.com/demo/image/upload/v1695735734/sample.jpg",
        parkOwnerId: ""
      
      };

        const validation = Yup.object({
            description: Yup.string().required("Description is required"),
            address: Yup.string().required("Address is required"),
            phone: Yup.string()
            //   .matches(/^\+?[1-9]\d{1,12}$/, "Invalid phone number")
              .required("Phone number is required"),
            city: Yup.string().required("City is required"),
            coordinate: Yup.string().required("Coordinates are required"),
            region: Yup.string().required("Region is required"),
            // image: Yup.string()
            //   .url("Invalid image URL")
            //   .required("Image URL is required"),
            parkOwnerId: Yup.string().required("Park owner ID is required"),
        });
      
        const onSubmit = async (values: any) => {
       
            const parkPayload: any = {
              description: values.description,
              address: values.address,
              phone: values.phone,
              city: values.city,
              coordinate: values.coordinate,
      
      
              region: values.region,
              image: values.image || "https://res.cloudinary.com/demo/image/upload/v1695735734/sample.jpg",
              parkOwnerId: userData?.individual ? userData?.individual?.userId : userData?.corporateBody?.userId
            };
      
            try {
              const addParkResponse = await addPark(parkPayload).unwrap();
           console.log(addParkResponse)
              if (addParkResponse?.status === 200 || addParkResponse?.status === 201) {
                toast.success(addParkResponse?.message || "Park added successfully");
                router.push("/dashboard/park");
            
              } else {
                toast.error(addParkResponse?.message || "error");
      
              }
            } catch (signupError) {
              console.error("Error during signup:", signupError);
              toast.error("An error occurred during signup.");
            }
 
        };

  return (
  <DashboardLayout>
          <BreadscrumbsDisplay />

<div>

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
                              className=" text-[#2B2C2B] text-[16px]  font-[500] "
                              htmlFor="description"
                            >
                              Name of the park
                            </label>
                            <Field
                              className="mt-1 block w-full  border-[0.5px] bg-transparent h-12 pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="description"
                              type="text"
                              id=""
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="description" />
                            </p>
                          </div>
                          <div className=" mb-3 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] font-[500] "
                              htmlFor="region"
                            >
                              Region
                            </label>
                            <Field
                              className="mt-1 block w-full bg-transparent h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="region"
                              type="text"
                              id="region"
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="region" />
                            </p>
                          </div>
{/* </div> */}

{/* <div className="grid md:grid-cols-2 gap-3 w-full"> */}
                          <div className=" mb-3 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] font-[500] "
                              htmlFor="city"
                            >
                              City
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
                              {nigeriaData.states.map((state) => (
                                <option
                                  key={state.state_code}
                                  value={state.name}
                                >
                                  {state.name}
                                </option>
                              ))}
                            </Field>
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="city" />
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
                          {/* </div> */}

                          {/* <div className="grid md:grid-cols-2 gap-3 w-full"> */}
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
                              htmlFor="coordinate"
                            >
                              Coordinate of the Park
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
                        disabled={isLoading} // Disable button if no option is selected
                        className={`disabled:bg-gray-500  py-2 w-full px-6 mt-4 bg-[#036E03] text-white rounded-lg  hover:bg-green-700
        }`}
                      >
                        {isLoading ? <LoadingSpinner /> : "Proceed"}
                      </button>
                        </Form>
                          )}
                                        </Formik>
</div>
                                        </div>
</div>
  </DashboardLayout>
  )
}

export default page