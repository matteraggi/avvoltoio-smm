import React from "react";

export default function Home() {
  return (
    <section className="homepage">
      <div className="dashboard">
        <h2>Maurizio Benazzi</h2>
      </div>
      <div className="sidebar">
        <ul>
          <li tabIndex={0}>
            <div className="box">
              <h3>El Ninho</h3>
            </div>
          </li>
          <li tabIndex={0}>
            <div className="box">
              <h3>Maurizio Benazzi</h3>
            </div>
          </li>
          <li tabIndex={0}>
            <div className="box">
              <h3>El Pibe de Oro</h3>
            </div>
          </li>
          <li tabIndex={0}>
            <div className="box">
              <h3>Nello Taver</h3>
            </div>
          </li>
          <li tabIndex={0}>
            <div className="box">
              <h3>Bello Figo</h3>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
