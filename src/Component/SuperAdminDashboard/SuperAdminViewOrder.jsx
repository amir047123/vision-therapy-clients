import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SuperAdminViewOrder = () => {
  const { id } = useParams(); // Get the order ID from the URL parameter
  const [order, setOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const navigate = useNavigate();

  useEffect(() => {
    // Create a function to fetch order data by ID
    const fetchOrderById = async () => {
      try {
        // Make an HTTP GET request to your API endpoint to fetch the order by ID
        const response = await axios.get(
          ` http://localhost:5000/api/v1/orders/${id}`
        );

        // Update the state with the received order data
        setOrder(response.data);
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        console.error("Error fetching order:", error);
        setIsLoading(false); // Set loading state to false even in case of an error
      }
    };

    // Call the fetchOrderById function when the component mounts
    fetchOrderById();
  }, [id]); // Include the 'id' as a dependency to fetch data when it changes

  const handleStatusChange = async () => {
    try {
      // Make an HTTP PUT request to update the order status
      await axios.put(` http://localhost:5000/api/v1/orders/${id}`, {
        status: selectedStatus,
      });

      // Refresh the order data
      const response = await axios.get(
        ` http://localhost:5000/api/v1/orders/${id}`
      );
      setOrder(response.data);

      // Show a success toast notification
      toast.success("Order status updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating status:", error);

      // Show an error toast notification
      toast.error("Error updating order status!");
    }
  };

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading order details...</p>
      ) : (
        <div>
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col bg-gray-800 p-5">
              <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Order# {order?._id}
              </h1>
              <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="mt-2 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>

                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          className="w-full hidden md:block"
                          src={item?.imageUrl}
                          alt="dress"
                        />
                        <img
                          className="w-full md:hidden"
                          src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                          alt="dress"
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item?.name}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Stock:{" "}
                              </span>{" "}
                              {item?.weight}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            ৳ {item?.price}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {item?.quantity}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {" "}
                            ৳ {item.price * item.quantity}
                          </p>{" "}
                          {/* Calculate total cost */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ৳ {order?.subtotal}
                        </p>
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Tax
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ৳ {order?.tax}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total with shipping
                      </p>
                      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        ৳ {order?.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {order?.firstName} {order?.lastName}
                        </p>
                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                          {order?.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <img
                        className="dark:hidden"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                        alt="email"
                      ></img>
                      <img
                        className="hidden dark:block"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                        alt="email"
                      ></img>
                      <p className="cursor-pointer text-sm leading-5 ">
                        {order?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          Country: {order?.country}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          StreetAddress: {order?.streetAddress}
                        </p>{" "}
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          Apartment: {order?.apartment}
                        </p>{" "}
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          Town / City: {order?.townCity}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          State: {order?.state}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          PIN CODE: {order?.pinCode}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Details
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.companyName}, {order?.shippingMethod}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order?.orderNotes}
                        </p>
                      </div>
                    </div>
                    <div className=" mt-3">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full p-2 rounded-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirm">Confirm</option>
                        <option value="Reject">Reject</option>
                      </select>
                      <button
                        className=" text-white shadow-md border-2 w-full mt-2"
                        onClick={handleStatusChange}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminViewOrder;
