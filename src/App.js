
import React, { useState, useEffect } from 'react';
import './css/App.css'
import StudentForm from './components/StudentForm';
import StudentTable from './components/studentTable';
import axios from 'axios'

function App() {
  const [activeTab, setActiveTab] = useState('form');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchTerm]);

 

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
       `http://localhost:5000/students/get/all-students` 
      );
      
      // Use response.data.data instead of response.data.students
      setStudents(response.data.data || []);
      
      // If your backend doesn't return total count, you might need to:
      // 1. Modify your backend to include it, or
      // 2. Use response.data.data.length for client-side pagination
      setTotalStudents(response.data.data?.length || 0);
      
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddStudent = async (studentData) => {
    try {
      // Transform data to match backend expectations
      const requestData = {
        first_name: studentData.firstName,
        last_name: studentData.lastName,
        email: studentData.email,
        phone: studentData.contact,  // or 'contact_number' depending on backend
        status: studentData.status,
        // Include other required fields
      };
  
      const response = await axios.post(
        'http://localhost:5000/students/create/new-student',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
  
      // Check for successful response
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        fetchStudents(); // Refresh the student list
        return { success: true, message: 'Student created successfully' };
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Failed to create student' 
        };
      }
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      
      return { 
        success: false,
        message: error.response?.data?.message || 
                'Server error occurred while creating student'
      };
    }
  };

  
  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchStudents();
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management System</h1>
        <p>Add or view student information</p>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Registration Form
        </button>
        <button 
          className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
          onClick={() => setActiveTab('table')}
        >
          Student Records
        </button>
      </div>
      
      {activeTab === 'form' && (
        <StudentForm onAddStudent={handleAddStudent} />
      )}
      
      {activeTab === 'table' && (
        <StudentTable
          students={students}
          loading={loading}
          currentPage={currentPage}
          totalStudents={totalStudents}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onSearch={setSearchTerm}
          onDelete={handleDeleteStudent}
          onRefresh={fetchStudents}
        />
      )}
    </div>
  );
}

export default App;



