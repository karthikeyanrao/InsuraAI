import React from 'react';
import { FiFilter, FiCheckCircle, FiClock, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const StatusFilter = ({ selectedStatus, onStatusChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Claims', icon: <FiFilter /> },
    { value: 'pending', label: 'Pending', icon: <FiClock /> },
    { value: 'review_required', label: 'Review Required', icon: <FiAlertCircle /> },
    { value: 'approved', label: 'Approved', icon: <FiCheckCircle /> },
    { value: 'rejected', label: 'Rejected', icon: <FiXCircle /> }
  ];

  return (
    <div style={{ 
      background: '#181f2a', 
      borderRadius: 12, 
      padding: '1.5rem', 
      marginBottom: '1.5rem', 
      border: '1px solid #232b3b',
      boxShadow: '0 2px 8px rgba(80,200,255,0.05)'
    }}>
      <label htmlFor="status-select" style={{ 
        color: '#fff', 
        fontWeight: 600, 
        fontSize: 16, 
        marginBottom: 8, 
        display: 'block' 
      }}>
        Filter by Status
      </label>
      <select
        id="status-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: 8,
          border: '1px solid #232b3b',
          background: '#232b3b',
          color: '#fff',
          fontSize: 15,
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#4fc3f7'}
        onBlur={(e) => e.target.style.borderColor = '#232b3b'}
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value} style={{ background: '#232b3b', color: '#fff' }}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter; 