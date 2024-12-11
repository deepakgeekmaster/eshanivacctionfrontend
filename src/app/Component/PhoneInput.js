import { useEffect } from "react";
import "intl-tel-input/build/css/intlTelInput.min.css";

const PhoneInput = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically load the intl-tel-input script
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/intl-tel-input@24.4.0/build/js/intlTelInput.min.js";
      script.onload = () => {
        const input = document.querySelector("#phone");
        const iti = window.intlTelInput(input, {
          initialCountry: "us",
          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.4.0/build/js/utils.js",
        });

        // Store the instance variable so we can access it in the console
        window.iti = iti;
      };
      document.body.appendChild(script);

      // Clean up script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      <input
        id="phone"
        type="tel"
        placeholder="Enter phone number"
        className="form-control border rounded-lg p-3 w-2/6"
      />
    </div>
  );
};

export default PhoneInput;
