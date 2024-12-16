import React, { useState, useEffect } from "react";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import { Container, Row, Col, Modal } from "react-bootstrap";

const PatientRecord = () => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem("patients");
    return savedPatients ? JSON.parse(savedPatients) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "view"
  const [currentPatient, setCurrentPatient] = useState(null);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // Add new patient
  const addPatient = (patient) => {
    setPatients([...patients, { id: Date.now(), ...patient }]);
  };

  // Edit patient
  const editPatient = (updatedPatient) => {
    setPatients(patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)));
    closeModal();
  };

  // Delete patient
  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  // Open modal
  const openModal = (patient, type) => {
    setCurrentPatient(patient);
    setModalType(type);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentPatient(null);
  };

  return (
    <Container className="my-4">
     
      <Row>
        <Col md={4}>
          <PatientForm onAddPatient={addPatient} />
        </Col>
        <Col md={7} style={{ marginLeft: "auto" }}>
          <PatientList
            patients={patients}
            onEditPatient={(patient) => openModal(patient, "edit")}
            onViewPatient={(patient) => openModal(patient, "view")}
            onDeletePatient={deletePatient}
          />
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "edit" ? "Edit Patient" : "View Patient"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "view" ? (
            <>
              <p><strong>Name:</strong> {currentPatient?.name}</p>
              <p><strong>Age:</strong> {currentPatient?.age}</p>
              <p><strong>Gender:</strong> {currentPatient?.gender}</p>
              <p><strong>Date of Birth:</strong> {currentPatient?.dob}</p>
              <p><strong>Blood Group:</strong> {currentPatient?.bloodGroup}</p>
              <p><strong>Phone:</strong> {currentPatient?.phone}</p>
              <p><strong>Address:</strong> {currentPatient?.address}</p>
              <p><strong>Disease:</strong> {currentPatient?.disease}</p>
              <p><strong>Admission Date:</strong> {currentPatient?.admissionDate}</p>
              <p>
                <strong>Assigned Doctors:</strong>{" "}
                {currentPatient?.assignedDoctors?.join(", ") || "None"}
              </p>
            </>
          ) : (
            <PatientForm
              editingPatient={currentPatient}
              onEditPatient={editPatient}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PatientRecord;