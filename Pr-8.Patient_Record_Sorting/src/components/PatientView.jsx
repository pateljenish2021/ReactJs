import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientAdd from './PatientAdd';
import PatientEdit from './PatientEdit';
import { FaUserPlus } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import Loader from './Loader';

const PatientView = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
 
    const timeout = setTimeout(() => {
      const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
      setPatients(savedPatients);
      setLoading(false); 
    }, 2000);


    return () => clearTimeout(timeout);
  }, []);

  const filteredPatients = patients.filter((patient) => {
    return Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const fieldA = a[sortField]?.toString().toLowerCase();
    const fieldB = b[sortField]?.toString().toLowerCase();
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

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
  <div className='view-header'>
    <div>
      <div>
         {/* Single Dropdown with Submenus */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle id="dropdown-sort">
        <FaFilter /> 
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>Ascending</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortChange("name", "asc")}>
            Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("age", "asc")}>
            Age
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("bloodGroup", "asc")}>
            Blood Group
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("admissionDate", "asc")}>
            Admission Date
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Header>Descending</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortChange("name", "desc")}>
            Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("age", "desc")}>
            Age
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("bloodGroup", "desc")}>
            Blood Group
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("admissionDate", "desc")}>
            Admission Date
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
    </div>
 <div style={{marginLeft: "220px"}}>
 <h3 style={{fontFamily: "Kanit, sans-serif"}}>Patient List</h3>
 </div>
 <div>
 <Form.Control className="search-btn"
        type="text"
        placeholder="Search by any field..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
 </div>
  </div>
      {loading ?(<div> <Loader/></div>) : (
        <div className='card-container'>{
        sortedPatients.map((patient) => (
              <div className='view-card' onClick={() => handleView(patient)} key={patient.id} title='view details'>
                <div className='card-data'><span>Patient ID:</span>{patient.id}</div>
                <div className='card-data'><span>Patient Name:</span>{patient.name}</div>
                <div className='card-data'><span>Patient Age:</span>{patient.age}</div>
                <div className='card-data'><span>Patient Phone:</span>{patient.phone}</div>
                <div className='card-data'><span>Patient Disease:</span>{patient.disease}</div>
                <div className='card-data'><span>Admission Date:</span>{patient.admissionDate}</div>
                <div className='card-data'><span>Assigned Doctors:</span>{patient.assignedDoctors}</div>
                
              </div>
            ))}
            </div>
            )}
             {sortedPatients.length === 0 && (
            <div>
              <div className="no-patients">
                No Patients found..!!!
                <span>try searching for different characters</span>
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