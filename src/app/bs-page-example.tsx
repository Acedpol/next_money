"use client";
import BootstrapClient from "@/lib/BootstrapClient";

export default function ExamplePage() {

  return (
    <>
    <BootstrapClient />
    <div className="container mt-5">
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Abrir Modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-4">
            <h5 className="modal-title">Hola desde Bootstrap 🚀</h5>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
