import React, { useState } from "react";
import axios from "axios";

const VerifyOtpForm = ({ email, switchToLogin }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false); // ✅ track OTP verification
  console.log("emial",email)
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("Verifying...");

    try {
      const res = await axios.post("https://skygoal-backend-afez.onrender.com/auth/verify-otp", {
        email,
        otp,
      });

      setMessage(res.data.message);
      setVerified(true); // ✅ Enable button on success
    } catch (err) {
      setVerified(false);
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Verify OTP</h3>
      <form onSubmit={handleVerify}>
        <input
          className="form-control mb-2"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit" className="btn btn-warning w-100">
          Verify OTP
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <div className="text-center mt-3">
        <button
          className="btn btn-success"
          onClick={switchToLogin}
          disabled={!verified} // ✅ Disable if not verified
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
