import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

const PatientForm = ({ onAddPatient, onEditPatient, editingPatient }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    phone: "",
    address: "",
    disease: "",
    admissionDate: "",
    assignedDoctors: [],
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Brown", "Dr. Miller", "Dr. Davis"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    }
  }, [editingPatient]);

  // Validation Function
  const validateForm = (data) => {
    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.name.trim()) errors.name = "Name is required.";
    if (!data.age || isNaN(data.age) || data.age <= 0) errors.age = "Valid age is required.";
    if (!data.gender) errors.gender = "Gender is required.";
    if (!data.dob) errors.dob = "Date of birth is required.";
    if (!data.bloodGroup) errors.bloodGroup = "Blood group is required.";
    if (!data.phone.match(phoneRegex)) errors.phone = "Phone number must be 10 digits.";
    if (!data.address.trim()) errors.address = "Address is required.";
    if (!data.disease.trim()) errors.disease = "Disease is required.";
    if (!data.admissionDate) errors.admissionDate = "Admission date is required.";
    if (data.assignedDoctors.length === 0)
      errors.assignedDoctors = "At least one doctor must be assigned.";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        assignedDoctors: checked
          ? [...prev.assignedDoctors, value]
          : prev.assignedDoctors.filter((doc) => doc !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowAlert(true);
      return;
    }

    if (editingPatient) {
      onEditPatient(formData);
    } else {
      onAddPatient(formData);
    }

    setShowAlert(false);
    setFormData({
      name: "",
      age: "",
      gender: "",
      dob: "",
      bloodGroup: "",
      phone: "",
      address: "",
      disease: "",
      admissionDate: "",
      assignedDoctors: [],
    });
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
      <h4 className="mb-3">{editingPatient ? "Edit Patient" : "Add New Patient"}</h4>
      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      {/* Age */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          isInvalid={!!errors.age}
        />
        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
      </Form.Group>

      {/* Gender */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Gender</Form.Label>
        <div>
          <Form.Check
            inline
            label="Male"
            name="gender"
            type="radio"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="Female"
            name="gender"
            type="radio"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
        </div>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </Form.Group>

      {/* Date of Birth */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          isInvalid={!!errors.dob}
        />
        <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
      </Form.Group>

      {/* Blood Group */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Blood Group</Form.Label>
        {bloodGroups.map((group) => (
          <Form.Check
            key={group}
            inline
            label={group}
            type="radio"
            name="bloodGroup"
            value={group}
            checked={formData.bloodGroup === group}
            onChange={handleChange}
          />
        ))}
        {errors.bloodGroup && <div className="text-danger">{errors.bloodGroup}</div>}
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      {/* Address */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
      </Form.Group>

      {/* Disease */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Disease</Form.Label>
        <Form.Control
          type="text"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          isInvalid={!!errors.disease}
        />
        <Form.Control.Feedback type="invalid">{errors.disease}</Form.Control.Feedback>
      </Form.Group>

      {/* Admission Date */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Admission Date</Form.Label>
        <Form.Control
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
          isInvalid={!!errors.admissionDate}
        />
      </Form.Group>

      {/* Assigned Doctors */}
      <Form.Group className="mb-3">
        <Form.Label style={{ display: "block", fontWeight: "bold" }}>Assigned Doctors</Form.Label>
        {doctors.map((doctor) => (
          <Form.Check
            key={doctor}
            label={doctor}
            type="checkbox"
            value={doctor}
            checked={formData.assignedDoctors.includes(doctor)}
            onChange={handleChange}
          />
        ))}
      </Form.Group>

      <Button type="submit" variant="success">
        {editingPatient ? "Update Patient" : "Add Patient"}
      </Button>
    </Form>
  );
};

export default PatientForm;