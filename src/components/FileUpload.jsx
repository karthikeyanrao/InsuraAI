import React, { useState } from 'react';
import { API_CONFIG } from '../config/api';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

const FileUpload = ({ onUploadSuccess, onUploadError }) => {
  const [file, setFile] = useState(null);
  const [policyId, setPolicyId] = useState('');
  const [userId, setUserId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a valid file type: PDF, JPEG, or PNG');
        setFile(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    if (!policyId.trim()) {
      setError('Please enter a Policy ID');
      return;
    }
    if (!userId.trim()) {
      setError('Please enter a User ID');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('claimName', `Policy ${policyId} - User ${userId}`);
      formData.append('policyID', policyId.trim());
      formData.append('userID', userId.trim());
      const response = await fetch(`${API_CONFIG.BASE_URL}upload`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(`Server returned invalid JSON: ${response.status} ${response.statusText}`);
      }
      if (!response.ok) {
        throw new Error(result.error || result.message || `Upload failed: ${response.status} ${response.statusText}`);
      }
      setFile(null);
      setPolicyId('');
      setUserId('');
      if (onUploadSuccess) onUploadSuccess(result);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
      if (onUploadError) onUploadError(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileChange(event);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload" style={{ background: '#181f2a', borderRadius: 18, boxShadow: '0 2px 16px rgba(80,200,255,0.10)', padding: '2.5rem 2rem', maxWidth: 920, margin: '2rem auto', border: '1px solid #232b3b' }}>
      <h2 style={{ color: '#4fc3f7', fontWeight: 700, fontSize: 26, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}><FiUpload size={28} /> Submit Insurance Claim</h2>
      <div style={{ background: 'rgba(80,200,255,0.07)', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: 18, border: '1px solid #232b3b', color: '#b6c2d1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <FiCheckCircle color="#4fc3f7" />
          <strong>What happens after you submit?</strong>
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
          <li>Your document is securely uploaded to our cloud.</li>
          <li>Our AI will analyze your claim and extract details automatically.</li>
          <li>You will receive a confirmation and can track your claim status.</li>
        </ul>
      </div>
      <div style={{ background: '#22293a', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 18, border: '1px solid #232b3b', color: '#b6c2d1' }}>
        <div style={{ fontWeight: 500, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}><FiAlertCircle color="#fbbf24" /> Requirements:</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
          <li>File must be PDF, JPEG, or PNG (max 10MB)</li>
          <li>Policy ID and User ID are required</li>
          <li>One file per claim</li>
        </ul>
      </div>
      <p className="upload-description">
        Upload your claim document and provide the required information. Our AI system will process your claim automatically.
      </p>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="policyId">Policy ID *</label>
          <input
            type="text"
            id="policyId"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="form-input"
            placeholder="Enter your policy ID"
            disabled={uploading}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #232b3b', background: '#232b3b', color: '#fff', marginTop: 6 }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label htmlFor="userId" style={{ color: '#fff', fontWeight: 500 }}>User ID *</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-input"
            placeholder="Enter your user ID"
            disabled={uploading}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #232b3b', background: '#232b3b', color: '#fff', marginTop: 6 }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Document *</label>
          <div
            className={`file-drop-zone ${file ? 'has-file' : ''} ${uploading ? 'uploading' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="file-input"
              disabled={uploading}
              required
            />
            {!file ? (
              <div className="drop-zone-content" style={{ color: '#b6c2d1' }}>
                <div className="upload-icon" style={{ fontSize: 38, marginBottom: 8 }}><FiFile /></div>
                <p>Drag and drop your file here, or click to browse</p>
                <p className="file-types" style={{ fontSize: 13, color: '#4fc3f7' }}>Supported: PDF, JPEG, PNG (max 10MB)</p>
              </div>
            ) : (
              <div className="file-info" style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                <div className="file-icon" style={{ fontSize: 28, color: '#4fc3f7' }}><FiFile /></div>
                <div className="file-details">
                  <p className="file-name" style={{ color: '#fff', fontWeight: 600 }}>{file.name}</p>
                  <p className="file-size" style={{ color: '#b6c2d1', fontSize: 13 }}>{formatFileSize(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="remove-file"
                    title="Remove file"
                    style={{ background: 'none', border: 'none', color: '#ff4d4f', fontSize: 22, marginLeft: 8, cursor: 'pointer' }}
                  >
                    <FiXCircle />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {error && (
          <div className="error-message" style={{ background: '#2a2323', color: '#ffb4b4', border: '1px solid #4fc3f7', borderRadius: 10, padding: '1rem', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FiAlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        {uploading && (
          <div className="upload-progress" style={{ marginBottom: 18 }}>
            <div className="progress-bar" style={{ background: '#232b3b', borderRadius: 8, overflow: 'hidden', height: 8, marginBottom: 8 }}>
              <div 
                className="progress-fill" 
                style={{ width: `100%`, background: 'linear-gradient(90deg, #4fc3f7 0%, #38bdf8 100%)', height: 8 }}
              ></div>
            </div>
            <p style={{ color: '#4fc3f7', fontWeight: 500, fontSize: 15, margin: 0 }}>Processing your claim with AI...</p>
          </div>
        )}
        <button
          type="submit"
          disabled={!file || !policyId.trim() || !userId.trim() || uploading}
          className="submit-button"
          style={{ width: '100%', background: '#4fc3f7', color: '#fff', border: 'none', borderRadius: 10, padding: '0.9rem', fontWeight: 700, fontSize: 17, marginTop: 8, cursor: uploading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(80,200,255,0.10)', transition: 'all 0.2s' }}
        >
          {uploading ? 'Processing...' : <><FiUpload style={{ marginRight: 8 }} /> Submit Claim</>}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
