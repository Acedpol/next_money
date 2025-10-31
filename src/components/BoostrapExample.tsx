"use client";

import BootstrapClient from "@/lib/BootstrapClient";

export default function BootstrapExample() {

  return (
    <> 
    <BootstrapClient />
    <div className="container text-center mt-5">
      <h1 className="mb-3 animate__animated animate__fadeInDown text-primary">
        <i className="fas fa-coins me-2"></i>Next Money Dashboard
      </h1>

      <button
        type="button"
        className="btn btn-success animate__animated animate__pulse animate__infinite"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fas fa-chart-line me-2"></i> Ver resumen
      </button>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-4">
            <h5 className="modal-title text-success">
              <i className="fas fa-check-circle me-2"></i>¡Todo en orden!
            </h5>
            <p>Bootstrap + Animate.css + FontAwesome funcionando ✅</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
