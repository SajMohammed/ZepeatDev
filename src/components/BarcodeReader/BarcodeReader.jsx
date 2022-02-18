import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeReader = ({toggleScanner, populateData}) => {
    const [data, setData] = useState("Data");
    useEffect(() => {
    const html5QrCode = new Html5Qrcode("customReader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        //console.log(decodedText, decodedResult);
        setData(decodedText);
        
        html5QrCode.stop()
        .then((ignore) => {
            populateData(decodedText);   // !Important to use the populateData callback here when stop() is called
            toggleScanner(false);
            // QR Code scanning is stopped.
           // console.log(ignore, "Error");
        })
        .catch((err) => {
            // Stop failed, handle it.
        });
    
    };
    const config = { fps: 100, qrbox:{ width: 315, height: 315 }, aspectRatio: 1.777778 };

    // If you want to prefer front camera
    //html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

    // If you want to prefer back camera
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );


    // Select front camera or fail with `OverconstrainedError`.
    //html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

    // Select back camera or fail with `OverconstrainedError`.
    //html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
  }, []);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div
        id="customReader"
        style={{ width:"400px" }}>
      </div>
      {/* <div
        className="qrData"
        style={{ backgroundColor: "#e2f9f0", color: "#20CE88" }} >
      
        Barcode : {data}    
      </div> */}
    </div>
  );
};

export default BarcodeReader;
