import React, { useState } from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiAlertCircle, FiFileText } from 'react-icons/fi';

const statusStyles = {
  Approved: { color: '#4fc3f7', icon: <FiCheckCircle /> },
  Pending: { color: '#fbbf24', icon: <FiClock /> },
  Rejected: { color: '#ff4d4f', icon: <FiXCircle /> },
  Error: { color: '#ffb4b4', icon: <FiAlertCircle /> },
};

const ClaimStatus = ({ claims }) => {
  const [claimId, setClaimId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [claimData, setClaimData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!claimId.trim()) {
      setError('Please enter a claim ID');
      return;
    }

    setLoading(true);
    setError(null);
    setClaimData(null);

    try {
      // Harmonize field extraction logic for claim lookup
      const foundClaim = claims.find(claim => {
        const idVariants = [claim.claimID, claim.ClaimID, claim.id];
        return idVariants.some(cid => cid && cid.toLowerCase() === claimId.trim().toLowerCase());
      });

      if (!foundClaim) {
        throw new Error('Claim not found. Please check your claim ID.');
      }

      console.log('Found claim:', foundClaim);
      
      setClaimData(foundClaim);
      
    } catch (err) {
      console.error('Error finding claim:', err);
      setError(err.message || 'Failed to find claim');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#ffc107';
      case 'uploaded':
        return '#ffc107';
      case 'review_required':
        return '#17a2b8';
      case 'auto_approved':
        return '#28a745';
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusDescription = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Your claim is being processed by our AI system.';
      case 'uploaded':
        return 'Your claim has been uploaded and is being processed.';
      case 'review_required':
        return 'Your claim requires manual review by our team.';
      case 'auto_approved':
        return 'Your claim has been automatically approved!';
      case 'approved':
        return 'Your claim has been approved!';
      case 'rejected':
        return 'Your claim has been rejected. Please contact support for details.';
      default:
        return 'Status information is being updated.';
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    if (!isNaN(dateValue)) {
      const num = Number(dateValue);
      if (num > 1e12) {
        return new Date(num).toLocaleString();
      } else {
        return new Date(num * 1000).toLocaleString();
      }
    }
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString();
  };

  const handleClaimFound = (claimData) => {
    // Just display the claim data in the component, don't navigate
    setClaimData(claimData);
  };

  const getStatusClass = (currentStatus) => {
    const safeStatus = (currentStatus || '').toLowerCase();
    switch (safeStatus) {
      case 'approved':
      case 'auto_approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
      case 'uploaded':
        return 'status-pending';
      case 'review_required':
      case 'under_review':
        return 'status-review';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="claim-status enhanced-card" style={{ padding: '2rem', margin: '2rem auto', maxWidth: 900 }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <span role="img" aria-label="search">🔍</span> Claim Status
      </h2>
      <p className="status-description" style={{ marginBottom: 24 }}>
        Enter your claim ID to check the current status of your insurance claim.
      </p>
      <form onSubmit={handleSubmit} className="status-form" style={{ marginBottom: 32 }}>
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label htmlFor="claimId">Claim ID</label>
          <input
            type="text"
            id="claimId"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            placeholder="Enter your claim ID (e.g., CLAIM-1421B556D7)"
            className="form-input"
            disabled={loading}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #333', marginTop: 4 }}
          />
        </div>
        {error && (
          <div className="error-message" style={{ marginBottom: 16 }}>
            <p>{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={!claimId.trim() || loading}
          className="submit-button"
          style={{ padding: '0.5rem 1.5rem', borderRadius: 6 }}
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </form>
      {claimData && (() => {
        // Harmonize field extraction for display
        const claimId = claimData.claimID || claimData.ClaimID || claimData.id || 'N/A';
        const patientName = claimData.patientName || claimData.PatientName || 'N/A';
        const policyId = claimData.policyId || 'N/A';
        const policyValue = claimData.policyValue || claimData.PolicyValue || 'N/A';
        const userId = claimData.userID || claimData.UserID || 'N/A';
        const filename = claimData.filename || claimData.Filename || 'N/A';
        const status = claimData.status || claimData.Status || 'N/A';
        const createdAt = claimData.createdAt || claimData.CreatedAt || claimData.timestamp || claimData.Timestamp || claimData.date || null;
        const s3Key = claimData.s3Key || claimData.S3Key || null;
        const style = statusStyles[status] || { color: '#b6c2d1', icon: <FiFileText /> };
        return (
          <div className="status-result" style={{ marginTop: 32, marginBottom: 32 }}>
            <div className="status-card" style={{ background: '#181f2a', borderRadius: 12, padding: 32, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)', border: '1px solid #222' }}>
              <div className="status-header" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <h4 style={{ fontSize: 24, margin: 0 }}>Claim <span style={{ color: style.color }}>#{claimId}</span></h4>
                <span className={`status-badge ${getStatusClass(status)}`} style={{ fontSize: 16, padding: '4px 16px', borderRadius: 16 }}>{status.replace('_', ' ')}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '16px 0 24px 0' }} />
              <p className="status-description" style={{ marginBottom: 32, fontSize: 18 }}>{getStatusDescription(status)}</p>
              <div className="claim-details" style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>Patient Name:</label> <span>{patientName}</span></div>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>Policy ID:</label> <span>{policyId}</span></div>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>Policy Value:</label> <span>{policyValue}</span></div>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>User ID:</label> <span>{userId}</span></div>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>Document:</label> <span>{filename}</span></div>
                <div className="detail-item" style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 18px' }}><label>Submitted:</label> <span>{formatDate(createdAt)}</span></div>
              </div>
                          </div>
          </div>
        );
      })()}
      <div className="help-section" style={{ marginTop: 40 }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><span role="img" aria-label="help">❓</span> Need Help?</h4>
        <p style={{ fontSize: 15 }}>
          Can't find your claim ID? Check your email for the confirmation message, or contact our support team at{' '}
          <a href="mailto:support@insuraai.com">support@insuraai.com</a>
        </p>
      </div>
    </div>
  );
};

export default ClaimStatus; 