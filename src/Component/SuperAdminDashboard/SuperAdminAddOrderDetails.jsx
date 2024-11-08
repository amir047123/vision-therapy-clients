import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// ... (import statements)

const SuperAdminAddOrderDetails = () => {
  const [shippingCharge, setShippingCharge] = useState("");
  const [taxCharge, setTaxCharge] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [isDataPosted, setIsDataPosted] = useState(false);

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/orderDetails/getOrderDetails"
      );

      const responseData = await response.json();

      if (response.ok) {
        // Ensure that data is an array
        if (Array.isArray(responseData.data)) {
          // Set the fetched order details in state
          setOrderDetails(responseData.data);
          setIsDataPosted(responseData.data.length > 0);
        } else {
          console.error("API response data is not an array:", responseData);
        }
      } else {
        console.error("Error fetching order details:", responseData);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDataPosted) {
      console.log("Data has already been posted. Delete it first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/orderDetails/addOrderDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingCost: parseFloat(shippingCharge),
            taxRate: parseFloat(taxCharge),
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // Handle success
        console.log("OrderDetails created successfully:", responseData);

        // Reset the form and fetch updated order details
        setShippingCharge("");
        setTaxCharge("");
        e.target.reset();
        setIsDataPosted(true);
        fetchOrderDetails();
      } else {
        // Handle error
        console.error("Error creating OrderDetails:", responseData);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/orderDetails/deleteOrderDetails/${orderId}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // Handle success
        console.log("OrderDetails deleted successfully:", responseData);

        // Fetch updated order details after deletion
        setIsDataPosted(false);
        fetchOrderDetails();
      } else {
        // Handle error
        console.error("Error deleting OrderDetails:", responseData);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="uppercase text-center">Order Details</h1>
      </div>

      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-bold">Shipping Charge </label>
              <input
                className="border p-1"
                placeholder="Enter Shipping charge"
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-bold">Tax Charge (%) </label>
              <input
                className="border p-1"
                placeholder="Enter Tax charge"
                value={taxCharge}
                onChange={(e) => setTaxCharge(e.target.value)}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className={`bg-primary mt-2 px-5 py-1 rounded-md text-white ${
                  isDataPosted ? "cursor-not-allowed" : ""
                }`}
                disabled={isDataPosted}
              >
                {isDataPosted ? "Set Shipping & Tax" : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 border font-medium text-gray-900">
                    Shipping Charge
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 border font-medium text-gray-900">
                    Tax Charge{" "}
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 border font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-center">
                {orderDetails.map((orderDetail) => (
                  <tr key={orderDetail._id}>
                    <td className="whitespace-nowrap px-4 py-2 border font-medium text-gray-900">
                      {orderDetail.shippingCost} BDT
                    </td>
                    <td className="whitespace-nowrap px-4 border py-2 text-gray-700">
                      {orderDetail.taxRate}%
                    </td>
                    <td className="whitespace-nowrap px-4 flex justify-center py-2 text-gray-700">
                      <Icon
                        className="text-2xl cursor-pointer"
                        icon="material-symbols:delete"
                        onClick={() => handleDelete(orderDetail._id)}
                      ></Icon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAddOrderDetails;
