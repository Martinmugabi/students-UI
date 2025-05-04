import React, { useState} from 'react';

  function StudentForm({ onAddStudent }) {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      status: ''
    });

   
    // Add these state declarations
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setErrorMessage(''); // Clear previous errors
      
      const result = await onAddStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contact: formData.contact,
        status: formData.status
      });
  
      setSubmitting(false);
  
      if (result.success) {
        setSuccessMessage(result.message || 'Student added successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          contact: '',
          status: ''
        });
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.message || 'Failed to add student');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    };
  
  return (
    <div className="tab-content active">
      <div className="form-container">
        {successMessage && (
          <div className="success-message">
            Student information saved successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                placeholder="Enter student ID"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Student Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="graduated">Graduated</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
          
          <div className="btn-container">
            <button type="submit" className="btn">Save Student</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;