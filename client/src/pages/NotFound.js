import React from 'react';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <main className="row">
      <div className="col-md-12">
        <div className="error-template">
          <h1>
            Oops!
          </h1>
          <h2>
            404 Not Found
          </h2>
          <div className="error-details">
            Sorry, an error has occured, Requested page not found!
          </div>
          <div className="error-actions">
            <a href="/" className="btn btn-primary btn-lg">
              Take Me Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
