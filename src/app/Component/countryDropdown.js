import React, { useState, useEffect } from "react";

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  // Fetch countries data from the public folder
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("/countries.json");
      const data = await response.json();
      setCountries(data);
    };

    // Set isClient to true once client-side rendering is ready
    setIsClient(true);
    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (!isClient) {
    return null; // Prevent rendering until client-side hydration is complete
  }

  return (
    <div className="country-dropdown">
     
        <select
            id="country"
            value={selectedCountry}
            onChange={handleChange}
            className="form-control border rounded-lg p-3 w-full"
        >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.code}>
            {country.name} ({country.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
