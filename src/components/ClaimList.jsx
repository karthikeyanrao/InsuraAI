import React from 'react';

const ClaimList = ({ claims, onClaimSelect, selectedClaimId }) => {
  const getStatusClass = (status) => {
    // Ensure status is a string and handle case-insensitivity
    const safeStatus = (status || '').toLowerCase();
    switch (safeStatus) {
      case 'approved':
      case 'auto_approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      case 'review_required':
      case 'under_review':
        return 'status-review';
      default:
        return 'status-default';
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    // If it's a number or a string that looks like a number, treat as Unix timestamp (seconds)
    if (!isNaN(dateValue)) {
      // Some backends may send timestamps as strings, so convert to number
      const num = Number(dateValue);
      // Heuristic: if it's 10 digits, it's seconds; if 13, it's ms
      if (num > 1e12) {
        return new Date(num).toLocaleString();
      } else {
        return new Date(num * 1000).toLocaleString();
      }
    }
    // Otherwise, try to parse as ISO string
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString();
  };

  return (
    <div className="claim-list">
      <h2>Claims</h2>
      {claims.length === 0 ? (
        <p className="no-claims">No claims found.</p>
      ) : (
        <div className="claims-grid">
          {claims.map(claim => {
            // Use the correct field names from the backend response
            const status = claim.status || 'N/A';
const claimId = claim.claimID || claim.ClaimID || 'N/A';
const policyId = claim.policyId || 'N/A'; // Correct field name from backend
const policyValue = claim.policyValue || 'N/A';
const userId = claim.userID || claim.UserID || 'N/A';
const filename = claim.filename || claim.Filename || 'N/A';
const patientName = claim.patientName || claim.PatientName || 'N/A';
const createdAt = claim.createdAt || claim.CreatedAt || claim.timestamp || claim.date || null;


            return (
              <div
                key={claimId}
                className={`claim-card ${selectedClaimId === claimId ? 'selected' : ''}`}
                onClick={() => onClaimSelect(claim)}
              >
                <div className="claim-header">
                  <h3>Claim #{claimId}</h3>
                  <span className={`status-badge ${getStatusClass(status)}`}>
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <div className="claim-details">
                  <p><strong>Name:</strong> {patientName}</p>
                  <p><strong>Policy ID:</strong> {policyId}</p>
                  <p><strong>Policy Value:</strong> {policyValue}</p>   
                  <p><strong>User ID:</strong> {userId}</p>
                 
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClaimList; 