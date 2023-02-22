import React from "react";

const MpesaForm = ({
  priceTotal,
  phoneNumber,
  setPhoneNumber,
  paymentStatus,
}: any) => {
  return (
    <div className="mpesa__Payment">
      <form>
        <div className="input__Label">
          <span>Amount (Kshs)</span>
          <input type="text" value={priceTotal} disabled />
        </div>
        <div className="input__Label">
          <span>Phone Number</span>
          <input
            onChange={setPhoneNumber}
            value={phoneNumber}
            type="tel"
            placeholder="0700111000"
            maxLength={10}
          />
        </div>
      </form>
      {paymentStatus ? (
        <div className="statusBox">
          <div className="status__Logic">
            <div className={"container " + paymentStatus}>
              <img src="/images/logos/mpesa.png" alt="Visa" />
            </div>
            <span className="status__text">
              {paymentStatus === "success"
                ? "Payment Processed Successfully"
                : paymentStatus === "pending"
                ? "Your Payment is Processing"
                : "Payment has failed"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MpesaForm;
