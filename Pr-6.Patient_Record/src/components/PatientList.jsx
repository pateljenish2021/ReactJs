import React from "react";
import { Table, Button } from "react-bootstrap";

const PatientList = ({ patients, onEditPatient, onViewPatient, onDeletePatient }) => {
  return (
    <>
      <h3 className="my-3">Patient Records</h3>
      {patients.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Disease</th>
              <th>Admission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.disease}</td>
                <td>{patient.admissionDate}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onViewPatient(patient)}
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEditPatient(patient)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeletePatient(patient.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No patients found.</p>
      )}
    </>
  );
};

export default PatientList;