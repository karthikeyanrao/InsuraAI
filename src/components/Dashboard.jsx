import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileUpload from './FileUpload';
import ClaimSuccess from './ClaimSuccess';
import ClaimStatus from './ClaimStatus';
import ClaimList from './ClaimList';
import ClaimDetails from './ClaimDetails';
import StatusFilter from './StatusFilter';
import { fetchClaims } from '../api/claims';
import { FiFilePlus, FiSearch, FiList, FiAlertCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('upload');
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Load claims when statusFilter changes
  useEffect(() => {
    if (currentView === 'claims') {
      loadClaims();
    }
  }, [statusFilter, currentView]);

  const handleUploadSuccess = (data) => {
    setSuccessData(data);
    setCurrentView('success');
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    };

  const handleViewClaim = (claimId) => {
      setCurrentView('claims');
  };

  const handleSubmitAnother = () => {
    setCurrentView('upload');
    setSuccessData(null);
  };

  const handleClaimFound = (claimData) => {
    setSelectedClaim(claimData);
    setCurrentView('claims');
  };

  const loadClaims = async () => {
    try {
      setLoading(true);
      setError(null);
      const claimsData = await fetchClaims(statusFilter);
      
      if (Array.isArray(claimsData)) {
        setClaims(claimsData);
      } else if (claimsData.claims) {
        setClaims(claimsData.claims);
      } else if (claimsData.body) {
        const parsedBody = typeof claimsData.body === 'string' 
          ? JSON.parse(claimsData.body) 
          : claimsData.body;
        setClaims(Array.isArray(parsedBody) ? parsedBody : parsedBody.claims || []);
      } else {
        setClaims([]);
      }
    } catch (err) {
      console.error('Error loading claims:', err);
      setError(err.message || 'Failed to load claims from API');
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimSelect = (claim) => {
    setSelectedClaim(claim);
  };

  const handleCloseDetails = () => {
    setSelectedClaim(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
    setSelectedClaim(null);
    // The useEffect will automatically reload claims with the new filter
  };

  const renderView = () => {
    switch (currentView) {
      case 'upload':
        return (
          <FileUpload 
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        );
      
      case 'success':
        return (
          <ClaimSuccess 
            claimData={successData}
            onViewClaim={handleViewClaim}
            onSubmitAnother={handleSubmitAnother}
          />
        );
      
      case 'status':
        return (
          <ClaimStatus 
            claims={claims}
          />
        );
      
      case 'claims':
        return (
          <div className="claims-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="controls" style={{ marginBottom: 18 }}>
              <StatusFilter 
                selectedStatus={statusFilter}
                onStatusChange={handleStatusChange}
              />
            </div>
            
            <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32 }}>
              <div className="claims-section" style={{ background: '#181f2a', borderRadius: 18, boxShadow: '0 2px 16px rgba(80,200,255,0.10)', padding: '2rem', border: '1px solid #232b3b', minHeight: 500 }}>
                {loading ? (
                  <div className="loading" style={{ textAlign: 'center', color: '#4fc3f7', fontWeight: 500, fontSize: 18 }}>
                    <FiAlertCircle size={28} style={{ marginBottom: 8 }} /> Loading claims...
                  </div>
                ) : (
                  <ClaimList
                    claims={claims}
                    onClaimSelect={handleClaimSelect}
                    selectedClaimId={selectedClaim?.id}
                  />
                )}
              </div>
              
              <div className="details-section" style={{ background: '#232b3b', borderRadius: 18, boxShadow: '0 2px 16px rgba(80,200,255,0.10)', padding: '2rem', border: '1px solid #232b3b', minHeight: 500 }}>
                <ClaimDetails
                  claim={selectedClaim}
                  onClose={handleCloseDetails}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return <FileUpload onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />;
    }
  };

  return (
    <div className="dashboard" style={{ background: 'linear-gradient(135deg, #101624 0%, #232b3b 100%)', minHeight: '100vh' }}>
      <Header />
      
      <main className="main-content">
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          <div className="nav-tabs" style={{ display: 'flex', gap: 18, marginBottom: 32 }}>
            <button
              className={`nav-tab ${currentView === 'upload' ? 'active' : ''}`}
              onClick={() => setCurrentView('upload')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 2rem', borderRadius: 10, border: 'none', background: currentView === 'upload' ? '#4fc3f7' : '#232b3b', color: currentView === 'upload' ? '#fff' : '#b6c2d1', fontWeight: 600, fontSize: 16, boxShadow: currentView === 'upload' ? '0 2px 8px rgba(80,200,255,0.12)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <FiFilePlus size={20} /> Submit Claim
            </button>
            <button
              className={`nav-tab ${currentView === 'status' ? 'active' : ''}`}
              onClick={() => setCurrentView('status')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 2rem', borderRadius: 10, border: 'none', background: currentView === 'status' ? '#4fc3f7' : '#232b3b', color: currentView === 'status' ? '#fff' : '#b6c2d1', fontWeight: 600, fontSize: 16, boxShadow: currentView === 'status' ? '0 2px 8px rgba(80,200,255,0.12)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <FiSearch size={20} /> Check Status
            </button>
            <button
              className={`nav-tab ${currentView === 'claims' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('claims');
                loadClaims();
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 2rem', borderRadius: 10, border: 'none', background: currentView === 'claims' ? '#4fc3f7' : '#232b3b', color: currentView === 'claims' ? '#fff' : '#b6c2d1', fontWeight: 600, fontSize: 16, boxShadow: currentView === 'claims' ? '0 2px 8px rgba(80,200,255,0.12)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <FiList size={20} /> View Claims
            </button>
          </div>

          {error && (
            <div className="error-message" style={{ background: '#2a2323', color: '#ffb4b4', border: '1px solid #4fc3f7', borderRadius: 10, padding: '1.5rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <FiAlertCircle size={24} style={{ flexShrink: 0 }} />
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Error</h2>
                <p style={{ margin: 0 }}>{error}</p>
                <button onClick={loadClaims} style={{ marginTop: 10, background: '#4fc3f7', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Try Again</button>
              </div>
            </div>
          )}

          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 