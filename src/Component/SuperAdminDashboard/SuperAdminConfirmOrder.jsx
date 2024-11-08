import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SuperAdminConfirmOrder = () => {
  const [orders, setOrders] = useState([]);

  // Create a function to fetch order data
  const fetchOrders = async () => {
    try {
      // Make an HTTP GET request to your API endpoint
      const response = await axios.get("http://localhost:3001/api/v1/orders");

      // Filter the received data to keep only "Pending" orders
      const pendingOrders = response.data.filter(
        (order) => order.status === "Confirm"
      );

      // Update the state with the filtered data
      setOrders(pendingOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Call the fetchOrders function when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to run the effect once
  const handleDeleteOrder = async (orderId) => {
    try {
      // Make an HTTP DELETE request to delete the order by ID
      await axios.delete(`http://localhost:3001/api/v1/orders/${orderId}`);

      // Trigger a data refresh
      fetchOrders();

      // Display a success toast message
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);

      // Display an error toast message
      toast.error("Error deleting order");
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className=" text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Phone
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                E-mail
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Street Address
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              <th className=" whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 ">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <tr key={order._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {`${order?.firstName} ${order?.lastName}`}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {order?.phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {order?.emailAddress}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {order?.streetAddress}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {order?.status}
                  </td>
                  <td className="flex justify-start items-center px-4 py-2 gap-2">
                    <td className="flex justify-start items-center px-4 py-2 gap-2">
                      <Link
                        to={`/superAdminDashboard/superadmin-order-view/${order._id}`} // Correctly include the order ID
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        View
                      </Link>
                    </td>

                    <p
                      onClick={() => handleDeleteOrder(order._id)}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 cursor-pointer"
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminConfirmOrder;
