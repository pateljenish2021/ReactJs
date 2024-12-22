import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientAdd from './PatientAdd';
import PatientEdit from './PatientEdit';
import { FaUserPlus } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import Loader from './Loader';

const PatientView = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    const timeout = setTimeout(() => {
      const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
      setPatients(savedPatients);
      setLoading(false); 
    }, 2000);


    return () => clearTimeout(timeout);
  }, []);


  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);
  }, []);


  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();
    const handleAdd = () => {
    navigate('/add');    
    };
    const handleEdit = () => {
    navigate('/edit');    
    };

  return (
    
    <div>
        <div class='header'>
    <button className="one-btn" onClick={handleAdd} element={<PatientAdd />}><span className="text-underline"><p><FaUserPlus /></p>Add Patient</span></button>
    <div class='title'>
      <h4>city hospital</h4> 
    </div>
    <button className="two-btn" onClick={handleEdit} element={<PatientEdit />}><span className="text-underline"><p><FaUserEdit /></p>Edit Patient</span></button>
  </div>
  <h3 style={{fontFamily: "Kanit, sans-serif"}}>Patient List</h3>
          
            <div className='list'>
            <div className='list-bar'>#</div>
            <div className='list-bar'>Name</div>
            <div className='list-bar'>Age</div>
            <div className='list-bar'>Phone</div>
            <div className='list-bar'>Disease</div>
            <div className='list-bar'>Admission Date</div>
            <div className='list-bar'>Assigned Doctors</div>
            
            </div>
            {loading ?( <Loader />) :
          patients.length > 0 ? (
            patients.map((patient, index) => (
              <div className='list l-data list-hover' onClick={() => handleView(patient)} key={patient.id} title='view details'>
                <div className='list-bar list-data'>{index + 1}</div>
                <div className='list-bar lis-data'>{patient.name}</div>
                <div className='list-bar lis-data'>{patient.age}</div>
                <div className='list-bar lis-data'>{patient.phone}</div>
                <div className='list-bar lis-data'>{patient.disease}</div>
                <div className='list-bar lis-data'>{patient.admissionDate}</div>
                <div className='list-bar lis-data'>{patient.assignedDoctors}</div>
                
              </div>
            ))
          ) : (
            <div>
              <div colSpan="7" className="text-center">
                No Patients Found
              </div>
            </div>
          )}
           

      {/* Patient Details Modal */}
      <div className="modal-container">
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <div className='patient-details'>
              <p><span>Name:</span> {selectedPatient.name}</p>
              <p><span>Age:</span> {selectedPatient.age}</p>
              <p><span>Gender:</span> {selectedPatient.gender}</p>
              <p><span>Date of Birth:</span> {selectedPatient.dob}</p>
              <p><span>Blood Group:</span> {selectedPatient.bloodGroup}</p>
              <p><span>Phone:</span> {selectedPatient.phone}</p>
              <p><span>Address:</span> {selectedPatient.address}</p>
              <p><span>Disease:</span> {selectedPatient.disease}</p>
              <p><span>Admission Date:</span> {selectedPatient.admissionDate}</p>
              <p><span>Assigned Doctors:</span> {selectedPatient.assignedDoctors.join(', ')}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default PatientView;