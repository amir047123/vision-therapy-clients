import React from "react";
import './PaymentCancel.css'
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        <div className="max-w-sm justify-center items-center h-fit bg-white mx-auto mt-40">
          <div className="col-md-5">
            <div className="message-box _success _failed">
            <MdError className="text-5xl text-orange-600 mx-auto" />
              <h2> Your payment Canceled </h2>
              <p> Try again later </p>

              <Link to="/" className="px-3 py-2 rounded-md bg-orange-500 text-white mt-5 block font-semibold">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
