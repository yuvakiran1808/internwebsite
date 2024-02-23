import React, { useEffect, useState } from "react";
import Residents from "./Residents";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../index.css";

// Variants for Framer Motion animations

const cardVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.5,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
  exit: { opacity: 0 },
};

// Functional component for the Home page
const Home = () => {
  //  State for storing planet data, planet count per page, and starting count for pagination
  const [data, setData] = useState([]);
  const [planetCount] = useState(1);
  const [startCount, setStartCount] = useState(0);


  // Fetching planet data from SWAPI on component mount
  useEffect(() => {
    const fetchPlanetData = () => {
      fetch("https://swapi.dev/api/planets/?format=json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.results);
        });
    };
    fetchPlanetData();
  }, []);

    // Extracting the current page's data based on startCount and planetCount
  const currentPageData = data.slice(startCount, startCount + planetCount);

  return (
    <div className="container">
      <div className="hero-container">
        <h1>Star Wars Planets</h1>
        {/* pagination */}
        <nav className="pagination-nav" aria-label="Page navigation ">
          <ul className="pagination">
            <li className="page-item">
              <Link
                onClick={() => {
                  if (startCount >= planetCount) {
                    setStartCount(startCount - planetCount);
                  }
                }}
                className="page-link"
                to="#"
              >
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link
                onClick={() => {
                  if (startCount + planetCount < data.length) {
                    setStartCount(startCount + planetCount);
                  }
                }}
                className="page-link"
                to="#"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="row">
        {currentPageData.length > 0 ? (
          currentPageData.map((eachplanet, id) => {
            return (
              <div key={id} className="col-12 col-md-12 my-3">
                <div className="card planet-card mb-5" key={id}>
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={cardVariants}
                  >
                    <h3>Details of planet</h3>
                    <div className="planet-details col-md-4">
                      <p>
                        Name :<b className="text-danger"> {eachplanet.name}</b>
                      </p>
                      <p>
                        Climate :{" "}
                        <b className="text-dark">{eachplanet.climate}</b>
                      </p>
                      <p>
                        Rotation Period :{" "}
                        <b className="text-dark">
                          {eachplanet.rotation_period}
                        </b>
                      </p>
                      <p>
                        Terrain :
                        <b className="text-dark"> {eachplanet.terrain}</b>
                      </p>
                      <p>
                        Population :
                        <b className="text-dark"> {eachplanet.population}</b>
                      </p>
                    </div>
                    <Residents eachplanet={eachplanet} />
                  </motion.div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div
                className="spinner-border text-warning main-spinner"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting the Home component

export default Home;
