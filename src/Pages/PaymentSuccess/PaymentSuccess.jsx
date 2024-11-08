import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      ` http://localhost:5000/api/v1/package/specific?fieldName=${"tran_id"}&&fieldValue=${tran_id}`
    ).then((res) => res.json().then((data) => setData(data?.data[0])));
  }, [tran_id]);

  return (
    <div className="box min-h-screen">
      <div className="printer-top"></div>

      <div className="paper-container">
        <div className="printer-bottom"></div>

        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Payment Complete</div>
            <div className="success-description">
              <b>{data?.userName}</b> Your payment for{" "}
              <b className="text-primary">{data?.packagePrice}</b> in BDT has
              been received and send to vision
            </div>
            <div className="order-details">
              <div className="order-number-label">Transition id</div>
              <div className="order-number">{data?.tran_id}</div>
            </div>
            <div className="order-footer">You can close this page!</div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
