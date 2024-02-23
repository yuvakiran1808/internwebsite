import React, { useState, useEffect } from "react";

const Residents = ({ eachplanet }) => {
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentPromises = eachplanet.residents.map(
          async (residentUrl) => {
            const response = await fetch(residentUrl);
            if (!response.ok) {
              console.log("Url not found");
              return null;
            }

            const residentData = await response.json();
            return residentData;
          }
        );

        const residentData = await Promise.all(residentPromises);

        setResidents(residentData);
      } catch (error) {
        console.log("Url not found");
      }
    };
    fetchResidents();
  }, [eachplanet.residents]);

  return (
    <div>
      {residents.length > 0 ? (
        <div className="residents-list">
          <h3>Details of Residents:</h3>
          <div className="container">
            <div className="row">
              {residents.map((resident, id) => (
                <div key={id} className="col-md-3">
                  <div className="card resident-card mt-3 ">
                    <div className="resident-details">
                      <p>Name: {resident.name}</p>
                      <p>Gender: {resident.gender}</p>
                      <p>Height: {resident.height}</p>
                      <p>
                        Mass: {resident.mass === "unknown" ? 0 : resident.mass}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Residents;
