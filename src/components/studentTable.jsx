import React from 'react';

function StudentTable({
    students = [],  // Default empty array if undefined
    loading,
    currentPage,
    totalStudents,
    rowsPerPage,
    onPageChange,
    onSearch,
    onDelete,
    onRefresh
  }) {
    const formatStatus = (status) => {
      return status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('_', ' ') || '';
    };
  
    const handleSearchChange = (e) => {
      onSearch(e.target.value);
      onPageChange(1);
    };
  
    const totalPages = Math.ceil(totalStudents / rowsPerPage);
  
    return (
      <div className="tab-content active">
        <div className="table-container">
          <div className="table-header">
            <h2>Student Records</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search students..."
                onChange={handleSearchChange}
              />
              <button className="btn" onClick={onRefresh}>
                Refresh Data
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
      {loading ? (
        <tr>
          <td colSpan="7">Loading...</td>
        </tr>
      ) : students.length === 0 ? (
        <tr>
          <td colSpan="7">No students found</td>
        </tr>
      ) : (
        students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>  {/* Changed from student_id to id */}
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>  {/* Changed from contact to phone */}
            <td className={`status-${student.status}`}>
              {formatStatus(student.status)}
            </td>
            <td>
              <button className="action-btn edit-btn">Edit</button>
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(student.id)} 
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default StudentTable;