"use client"; // Add this for client components in the Next.js app directory

import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import nigeriaData from "../../../components/assets/states.json"; // Adjust path to your JSON file
import { useAuthControllerLoginMutation, useUserControllerCreateIndividualBodyMutation, useUserControllerCreateParkOwnerBodyMutation } from "@/store/api";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { loginUserSuccess } from "@/store/redux/actions/AuthAction";
import { useAppDispatch } from "@/store/redux/store";
// import { useUserControllerCreateIndividualBodyMutation } from "@/store/api";

// ImageUpload component definition with proper types
interface ImageUploadProps {
    image: string | undefined; // URL of the uploaded image
    setImage: (image: string | undefined) => void; // Updates the image URL
  }

const IndividualOwnerReg = () => {
    const router = useRouter();
    const dispatch = useAppDispatch(); // Access `dispatch`
  
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmPassword] = useState(false);
  const [showScreen, setShowScreen] = useState(1);
  const [showBusArchitecture, setBusAchitecture] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
   const [sideBusImage, setSideBusImage] = useState<string | null>(null);
  const [frontBusImage, setFrontBusImage] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [openCongratModal, setOpenCongratModal] = useState(false);

  const [signup, { isLoading, }] =
  useUserControllerCreateParkOwnerBodyMutation();
    
  const [login] =
    useAuthControllerLoginMutation();
    const toggleBusArchitecture = () => {
        setBusAchitecture(!showBusArchitecture);
      };
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
        role: "USER",
        userType: "PARK",
        userCategory: "PARK_OWNER",
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
    
      const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
        const [loading, setLoading] = useState(false);
      
        const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setLoading(true); // Show loading spinner or indicator
      
            try {
              // Create a FormData object
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "urban_image"); // Replace with your Cloudinary preset
      
              // Upload to Cloudinary
              const response = await fetch("https://api.cloudinary.com/v1_1/dngyazspl/image/upload", {
                method: "POST",
                body: formData,
              });
      
              const result = await response.json();
              if (result.secure_url) {
                // Set the image URL in the state
                setImage(result.secure_url);
              }
      
              setLoading(false); // Stop loading
            } catch (error) {
              console.error("Error uploading image", error);
              toast.error("Error uploading image. Please try again.");
              setLoading(false);
            }
          }
        };
      
        return (
          <div className="flex justify-center text-center">
            <label className="flex w-[110px] bg-white dotted-border flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
              <div className="flex flex-col items-center justify-center h-[70px]">
                {image ? (
                  <Image
                    className=""
                    src={image} // This should now be the Cloudinary URL
                    alt="Uploaded image"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    className=""
                    src="/onboarding/Icon.svg" // Default placeholder image
                    alt="Default placeholder"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                className="hidden mb-2 text-sm text-[#6C757D] font-medium"
                onChange={handleImageChange}
              />
            </label>
            {loading && <p>Uploading...</p>}
          </div>
        );
      }; 

      const onCloseModal = () => setOpen(false);

      const onOpenCongratModal = () => {
        // e.preventDefault();
        onCloseModal();
        setTimeout(() => setOpenCongratModal(true), 100); // Slight delay for smoother transition
      };
    
      const onCloseCongratModal = () => setOpenCongratModal(false);
    
      // const onSubmit = async (values: LoginValues) => {
      //   // e.preventDefault(); // Prevent default browser behavior
      //   // onOpenModal(); // Open the modal
      //   // console.log("Form submitted");
      //   if (showScreen === 1) {
      //     setShowScreen(2);
      //   } else {
      //     const payload = {
      //       ...values,
      //       avatar: image, // Include the uploaded image (as base64 string)
      //       role: values.role as "USER", // Type assertion
      //       userType: values.userType as "FLEET_PARTNERS", // Type assertion
      //       userCategory: values.userCategory as "PASSENGERS",
      //     };
      //     // console.log(payload);
      //     try {
      //       const response = await signup(payload).unwrap();
      //       console.log(response);
      //       if ((response as any)?.status == 200) {
    
      //          // Store token and user data in localStorage
      //       const token = (response as any)?.data?.token;
      //       const user = (response as any)?.data?.user;
      
      //       localStorage.setItem("auth_token", token);
      //       localStorage.setItem("userData", JSON.stringify(user));
      //         // router.push("/dashboard/home");
      //         console.log(response)
      //         toast.success((response as any)?.message);
      //       } else { 
      //         console.log(response)
      //         toast.error((response as any)?.message);
    
      //       }
      //     } catch (error) {
      //       console.error("Error during signup:", error);
      //       toast.error("An error occured");
      //     }
      //   }
      // };
    
    
    const onSubmit = async (values: any) => {
      if (showScreen === 1) {
        setShowScreen(2);
      } else {
        const payload = {
          ...values,
          avatar: image, // Include the uploaded image (as base64 string)
          role: values.role as "USER", // Type assertion
          userType: values.userType as "PARK", // Type assertion
          userCategory: values.userCategory as "PARK_OWNER",
        };
    
        try {
          const signupResponse = await signup(payload).unwrap();
    
          if (signupResponse?.status === 200 || signupResponse?.status === 201) {
            // Signup successful
            toast.success(signupResponse?.message);
    
            // Extract login credentials from signup payload
            const loginCredentials = {
              email: payload.email,
              password: payload.password,
            };
    
            // Perform login
            try {
              const loginResponse:any = await login(loginCredentials).unwrap();
    
              if (loginResponse?.status === 200) {
                // Store token and user data in localStorage
                const token = loginResponse?.data?.token;
                const user = loginResponse?.data?.user;
           dispatch(loginUserSuccess({ auth_token: token, user: user }));
    
                localStorage.setItem("auth_token", token);
                localStorage.setItem("user", JSON.stringify(user));
    
                // Redirect to dashboard/home
                router.push("/dashboard/home");
                toast.success(loginResponse?.message);
              } else {
                toast.error(loginResponse?.message);
              }
            } catch (loginError) {
              console.error("Error during login:", loginError);
              toast.error("An error occurred during login.");
            }
          } else {
            toast.error(signupResponse?.message);
          }
        } catch (signupError) {
          console.error("Error during signup:", signupError);
          toast.error("An error occurred during signup.");
        }
      }
    };
    
    const handleBackClick = () => {
        router.back(); // Navigate to the previous page
      };
  return (
    <div className="w-full">
      <div
        className={
          showScreen === 4 ? "" : " "
        }
      >
  
        {/* Right Section */}
        <div className="">
   
          <div className=" ">
            <div className="sticky top-0  z-10 ">
              {showScreen === 1 ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="flex items-center text-gray-600 mb-4"
                  >
                    <FaArrowLeft className="" />
                  </button>

                  <div className="flex items-center gap-2">
                    <h6>Step 1</h6>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#D9D9D9]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#D9D9D9]"></div>
                    </div>
                  </div>
                </div>
              ) : showScreen === 2 ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowScreen(1)}
                    className="flex items-center text-gray-600 mb-4"
                  >
                    <FaArrowLeft className="" />
                  </button>

                  <div className="flex items-center gap-2">
                    <h6>Step 2</h6>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#D9D9D9]"></div>
                    </div>
                  </div>
                </div>
              ) : showScreen === 3 ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowScreen(2)}
                    className="flex items-center text-gray-600 mb-4"
                  >
                    <FaArrowLeft className="" />
                  </button>

                  <div className="flex items-center gap-2">
                    <h6>Step 3</h6>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full lg:w-[40%]">
                  <button
                    type="button"
                    onClick={() => setShowScreen(3)}
                    className="flex items-center text-gray-600 mb-4"
                  >
                    <FaArrowLeft className="" />
                  </button>

                  <div className="flex items-center gap-2">
                    <h6>Step 3</h6>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#6CC56C]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:h-full h-full w-full scrollbar-hide overflow-y-scroll">
              {showScreen === 1 ? (
                <div className="flex flex-col">
                  <h5 className="text-[#121212] text-[20px] md:text-[30px] lg:text-[35px] font-[800]">
                    Sign up as an Individual
                  </h5>
                  <h3 className="text-[#1A1A1A] text-[14px] lg:text-[16px] font-[400]">
                    Register in three easy steps
                  </h3>
                </div>
              ) : showScreen === 2 ? (
                <div className="flex flex-col">
                  <h5 className="text-[#121212] text-[26px] md:text-[34px] lg:text-[36px] font-[800]">
                    Upload Profile Picture
                  </h5>
                  <h3 className="text-[#1A1A1A] text-[15px] lg:text-[20px] font-[300]">
                    Upload a cleer picture of yourself
                  </h3>
                </div>
              ) : showScreen === 3 ? (
                <div className="flex flex-col">
                  <h5 className="text-[#121212] text-[26px] md:text-[34px] lg:text-[36px] font-[800]">
                    Add a Vehicle
                  </h5>
                  <h3 className="text-[#1A1A1A] text-[15px] lg:text-[20px] font-[300]">
                    Add at least one vehicle from your fleet
                  </h3>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h5 className="text-[#121212] text-[26px] md:text-[34px] lg:text-[36px] font-[800]">
                    Upload Vehicle Documents
                  </h5>
                  <h3 className="text-[#1A1A1A] text-[15px] lg:text-[20px] font-[300]">
                    Add at least one vehicle document for your fleet
                  </h3>
                </div>
              )}

              <div className="flex flex-col  mb-8 gap-8">
                <Formik
                  initialValues={initialData}
                  validationSchema={validation}
                  onSubmit={onSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form className="w-full  mt-10 lg:mt-10 mb-6 flex flex-col justify-between">
                      <div className={showScreen === 1 ? "block " : "hidden"}>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="firstname"
                          >
                            First Name
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="firstname"
                            type="text"
                            id="firstname"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="firstname" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="lastname"
                          >
                            Last Name
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="lastname"
                            type="text"
                            id="lastname"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="lastname" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="phone"
                          >
                            Phone Number
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="phone"
                            type="text"
                            id="phone"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="phone" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="email"
                          >
                            E-mail
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="email"
                            type="email"
                            id="email"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="email" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="address"
                          >
                            Address
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="address"
                            type="text"
                            id="address"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="address" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="city"
                          >
                            City
                          </label>
                          <Field
                            className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                            name="city"
                            type="text"
                            id="city"
                            placeholder=""
                          />
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="city" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <div>
                            <Field
                              className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="password"
                              id="password"
                              type={!showPassword ? "password" : "text"}
                              placeholder=""
                            />
                            <button
                              type="button"
                              role="button"
                              aria-label="show password"
                              title=" show password"
                              onClick={() =>
                                setShowPassword(() => !showPassword)
                              }
                              className={`absolute right-4 top-12`}
                            >
                              {!showPassword ? (
                                <AiOutlineEyeInvisible className="" />
                              ) : (
                                <AiOutlineEye className="" />
                              )}
                            </button>
                          </div>
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="password" />
                          </p>
                        </div>
                        <div className=" mb-5 relative">
                          <label
                            className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                            htmlFor="confirmPassword"
                          >
                            Retype Password
                          </label>
                          <div>
                            <Field
                              className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="confirmPassword"
                              id="confirmPassword"
                              type={
                                !confirmPassword ? "password" : "text"
                              }
                              placeholder=""
                            />
                            <button
                              type="button"
                              role="button"
                              aria-label="show password"
                              title=" show password"
                              onClick={() =>
                                setShowConfirmPassword(() => !confirmPassword)
                              }
                              className={`absolute right-4 top-12`}
                            >
                              {!confirmPassword ? (
                                <AiOutlineEyeInvisible className="" />
                              ) : (
                                <AiOutlineEye className="" />
                              )}
                            </button>
                          </div>
                          <p className="text-red-700 text-xs mt-1 ">
                            <ErrorMessage name="confirmPassword" />
                          </p>
                        </div>
                      </div>

                      <div className={showScreen === 2 ? "block " : "hidden"}>
                      <div className="mb-7">
      <ImageUpload image={image} setImage={setImage}  />
    </div>
                      </div>

                      <div className={showScreen === 3 ? "block " : "hidden"}>
                        <div className="mb-7">
                          <div className=" mb-5 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                              htmlFor="first_name"
                            >
                              Engine Number
                            </label>
                            <Field
                              className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="engine"
                              type="text"
                              id=""
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="first_name" />
                            </p>
                          </div>
                          <div className=" mb-5 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                              htmlFor="last_name"
                            >
                              Engine Type
                            </label>
                            <Field
                              className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="last_name"
                              type="text"
                              id="last_name"
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="last_name" />
                            </p>
                          </div>

                          <div className=" mb-5 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                              htmlFor="last_name"
                            >
                              Vehicle Type
                            </label>
                            <Field
                              className=" block w-full h-12 border-[1px] border-[#E4E1E1]  px-3 rounded-[10px] focus:outline-primary "
                              name="vehicle_type"
                              as="select"
                              // type="tel"
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  "vehicle_type",
                                  event.target.value
                                );
                              }}
                              placeholder=""
                            >
                              <option label="Select"></option>
                              <option className="text-center" value="Bus (12)">
                                Bus
                              </option>
                              <option className="text-center" value="M Bus (5)">
                                M Bus (5)
                              </option>
                              <option className="text-center" value="Sedan (3)">
                                Sedan (3)
                              </option>
                            </Field>
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="last_name" />
                            </p>
                          </div>

                          <div className=" mb-5 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                              htmlFor="phone"
                            >
                              Number Plate
                            </label>
                            <Field
                              className="mt-1 block w-full h-12 border-[0.5px]  pl-3 rounded-[10px] focus:outline-none border-[#D9D9D9] "
                              name="phone"
                              type="text"
                              id="phone"
                              placeholder=""
                            />
                            <p className="text-red-700 text-xs mt-1 ">
                              <ErrorMessage name="phone" />
                            </p>
                          </div>

                          <div className=" mb-5 relative">
                            <label
                              className=" text-[#2B2C2B] text-[16px] md:text-[20px] font-[500] "
                              htmlFor="last_name"
                            >
                              Enrollment City
                            </label>
                            <Field
                              className=" block w-full h-12 border-[1px] border-[#E4E1E1]  px-3 rounded-[10px] focus:outline-primary "
                              name="vehicle_type"
                              as="select"
                              // type="tel"
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  "vehicle_type",
                                  event.target.value
                                );
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
                              <ErrorMessage name="last_name" />
                            </p>
                          </div>

                      
                        </div>
                      </div>

                      {showScreen === 4 ? (
                        <div className="block w-full md:w-[70%]">
                          <button
                            // onClick={onSubmit}
                            type="submit"
                            // disabled={!selectedOption} // Disable button if no option is selected
                            className={`py-4 w-full px-6 bg-[#036E03] text-white rounded-lg  hover:bg-green-700
      }`}
                          >
                            Proceed
                          </button>
                        </div>
                      ) : (
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
                          className={`disabled:bg-gray-500  py-4 w-full px-6 bg-[#036E03] text-white rounded-lg  hover:bg-green-700
        }`}
                        >
                         {isLoading ? <LoadingSpinner /> : "Proceed"} 
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* Proceed Button */}
            {/* <button
              onClick={handleProceed}
              disabled={!selectedOption} // Disable button if no option is selected
              className={`py-4 px-6 bg-[#036E03] w-full mb-8 text-white rounded-lg ${
                !selectedOption
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
            >
              Proceed
            </button> */}
          </div>
        </div>
      </div>



      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div> */}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default IndividualOwnerReg