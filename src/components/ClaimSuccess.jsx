import React from 'react';
import { FiCheckCircle, FiFileText, FiDollarSign, FiShield, FiClock, FiEye, FiPlus, FiMail } from 'react-icons/fi';

const ClaimSuccess = ({ claimData, onViewClaim, onSubmitAnother }) => {
  // Harmonize field extraction with other components
  const claimId = claimData?.claimID || claimData?.ClaimID || claimData?.claimId || claimData?.id || 'N/A';
  const policyId = claimData?.policyId || claimData?.PolicyId || claimData?.policyID || 'N/A';
  const userId = claimData?.userId || claimData?.UserId || claimData?.userID || claimData?.UserID || 'N/A';
  const filename = claimData?.filename || claimData?.Filename || 'N/A';
  const createdAt = claimData?.createdAt || claimData?.CreatedAt || claimData?.timestamp || claimData?.Timestamp || claimData?.date || new Date();

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '3rem auto', 
      padding: '2.5rem', 
      borderRadius: 18, 
      background: '#181f2a', 
      border: '1px solid #232b3b',
      boxShadow: '0 2px 16px rgba(80,200,255,0.10)'
    }}>
      
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          fontSize: 54, 
          marginBottom: '1rem',
          color: '#4fc3f7',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <FiCheckCircle />
        </div>
        <h2 style={{ 
          color: '#4fc3f7', 
          marginBottom: '0.75rem',
          fontSize: '1.75rem',
          fontWeight: '700'
        }}>Claim Submitted Successfully!</h2>
        <p style={{ 
          fontSize: '1rem', 
          color: '#b6c2d1',
          lineHeight: '1.5'
        }}>Your claim has been processed and is now being reviewed by our AI system.</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1.25rem',
          fontSize: '1.25rem',
          color: '#fff',
          fontWeight: '600'
        }}>
          <FiFileText color="#4fc3f7" /> Claim Summary
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gap: '0.75rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            background: '#22293a', 
            borderRadius: 8, 
            padding: '1rem',
            border: '1px solid #232b3b'
          }}>
            <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Claim ID:</label>
            <span style={{ 
              color: '#4fc3f7', 
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>{claimId}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            background: '#22293a', 
            borderRadius: 8, 
            padding: '1rem',
            border: '1px solid #232b3b'
          }}>
            <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Policy ID:</label>
            <span style={{ color: '#fff' }}>{policyId}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            background: '#22293a', 
            borderRadius: 8, 
            padding: '1rem',
            border: '1px solid #232b3b'
          }}>
            <label style={{ fontWeight: '500', color: '#b6c2d1' }}>User ID:</label>
            <span style={{ color: '#fff' }}>{userId}</span>
          </div>
          
        
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            background: '#22293a', 
            borderRadius: 8, 
            padding: '1rem',
            border: '1px solid #232b3b'
          }}>
            <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Submitted:</label>
            <span style={{ color: '#fff', fontSize: '0.9rem' }}>{formatDate(createdAt)}</span>
          </div>
        </div>

        {claimData?.extractedInfo && (
          <div style={{ 
            background: 'rgba(79, 195, 247, 0.07)', 
            borderRadius: 10, 
            padding: '1.5rem', 
            border: '1px solid #4fc3f7',
            marginTop: '1.5rem'
          }}>
            <h4 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem',
              color: '#4fc3f7',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              <FiShield color="#4fc3f7" /> AI Extracted Information
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {claimData.extractedInfo.claimType && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0'
                }}>
                  <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Claim Type:</label>
                  <span style={{ color: '#fff' }}>{claimData.extractedInfo.claimType}</span>
                </div>
              )}
              
              {claimData.extractedInfo.amount && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0'
                }}>
                  <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Estimated Amount:</label>
                  <span style={{ color: '#4fc3f7', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiDollarSign size={14} />{claimData.extractedInfo.amount.toLocaleString()}
                  </span>
                </div>
              )}
              
              {claimData.extractedInfo.riskLevel && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0'
                }}>
                  <label style={{ fontWeight: '500', color: '#b6c2d1' }}>Risk Level:</label>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: 6, 
                    fontSize: '0.85rem',
                    background: '#232b3b',
                    color: '#fff',
                    border: '1px solid #4fc3f7'
                  }}>
                    {claimData.extractedInfo.riskLevel}
                  </span>
                </div>
              )}
              
              {claimData.extractedInfo.description && (
                <div style={{ 
                  padding: '0.5rem 0',
                  borderTop: '1px solid #232b3b',
                  marginTop: '0.5rem',
                  paddingTop: '1rem'
                }}>
                  <label style={{ fontWeight: '500', color: '#b6c2d1', display: 'block', marginBottom: '0.5rem' }}>Description:</label>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#b6c2d1', lineHeight: '1.4' }}>{claimData.extractedInfo.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        background: '#22293a', 
        borderRadius: 10, 
        padding: '1.5rem', 
        marginBottom: '2rem', 
        border: '1px solid #232b3b'
      }}>
        <h4 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem',
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}>
          <FiClock color="#4fc3f7" /> What happens next?
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '1.5rem', 
          fontSize: '0.95rem',
          color: '#b6c2d1',
          lineHeight: '1.6'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>Our AI system will analyze your claim document</li>
          <li style={{ marginBottom: '0.5rem' }}>Risk assessment will be completed automatically</li>
          <li style={{ marginBottom: '0.5rem' }}>You'll receive updates on your claim status</li>
          <li>Final decision will be made based on policy and risk factors</li>
        </ul>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem'
      }}>
        {onViewClaim && (
          <button 
            onClick={() => onViewClaim(claimId)}
            style={{ 
              flex: 1, 
              padding: '0.875rem 1.5rem', 
              borderRadius: 10, 
              background: '#4fc3f7', 
              color: '#fff', 
              border: 'none', 
              fontWeight: '600', 
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onMouseOver={(e) => e.target.style.background = '#66d9ff'}
            onMouseOut={(e) => e.target.style.background = '#4fc3f7'}
          >
            <FiEye /> View Claim Details
          </button>
        )}
        
        {onSubmitAnother && (
          <button 
            onClick={onSubmitAnother}
            style={{ 
              flex: 1, 
              padding: '0.875rem 1.5rem', 
              borderRadius: 10, 
              background: 'transparent', 
              color: '#4fc3f7', 
              border: '1px solid #4fc3f7', 
              fontWeight: '600', 
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(79, 195, 247, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            <FiPlus /> Submit Another Claim
          </button>
        )}
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '1.25rem', 
        background: '#22293a', 
        borderRadius: 8, 
        border: '1px solid #232b3b'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#b6c2d1' }}>
          <strong style={{ color: '#fff' }}>Need help?</strong> Contact our support team at{' '}
          <a href="mailto:support@insuraai.com" style={{ 
            color: '#4fc3f7',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}>
            <FiMail size={14} />support@insuraai.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClaimSuccess;