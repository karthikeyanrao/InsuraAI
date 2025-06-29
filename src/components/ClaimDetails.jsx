import React from 'react';

const ClaimDetails = ({ claim }) => {
  if (!claim) {
    return (
      <div className="claim-details placeholder">
        <h2>Select a Claim</h2>
        <p>Choose a claim from the list to see the details.</p>
      </div>
    );
  }
 const claimId = claim.claimID || claim.ClaimID || claim.id || 'N/A';
  const patientName = claim.patientName || claim.PatientName || 'N/A';
  const policyId = claim.policyId || 'N/A';
  const policyValue = claim.policyValue || claim.PolicyValue || 'N/A';
  const userId = claim.userID || claim.UserID || 'N/A';
  const filename = claim.filename || claim.Filename || 'N/A';
  const status = claim.status || claim.Status || 'N/A';
  const createdAt = claim.createdAt || claim.CreatedAt || claim.timestamp || claim.Timestamp || claim.date || null;
   const documentUrl = claim.documentUrl || claim.document_url || claim.fileUrl || claim.file_url || null;



  const getDocumentUrl = () => {
    if (documentUrl) return documentUrl;
    
    
    return null;
  };

  const documentUrlToUse = getDocumentUrl();

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

  const handleDownloadReport = () => {
    const reportData = {
      claimId,
      patientName,
      policyId,
      policyValue,
      userId,
      status,
      submittedOn: formatDate(createdAt),
      filename,
      summary: claim.summary || 'No summary available',
      riskScore: claim.riskScore || 'N/A',
      riskLevel: claim.riskLevel || 'N/A',
      reason: claim.reason || '',
      reviewedAt: claim.reviewedAt ? formatDate(claim.reviewedAt) : '',
      uploadedBy: claim.uploadedBy || '',
      claimName: claim.claimName || '',
      ocrText: claim.ocrText || claim.extractedText || ''
    };

    const generatePDFContent = () => {
      const styleMain = 'font-family:Arial,sans-serif; font-size:15px; color:#22223b; margin:0px;margin-top:-650px;margin-left:50px; padding:0; width:700px;';
      const styleHeader = 'text-align:center; border-bottom:2px solid #4fc3f7; padding-bottom:8px; margin-bottom:12px; margin-top:0;';
      const styleSection = 'margin-bottom:14px;';
      const styleTable = 'width:100%; border-collapse:collapse; margin-bottom:10px;';
      const styleTh = 'text-align:left; background:#f0f4f8; padding:8px 12px; border:1px solid #d1d5db; font-weight:bold;';
      const styleTd = 'padding:8px 12px; border:1px solid #d1d5db;';
      const styleSectionTitle = 'font-size:18px; color:#22223b; margin-bottom:10px; font-weight:bold;';
      const styleBadge = `display:inline-block; padding:3px 12px; border-radius:12px; font-size:12px; font-weight:bold; background:${reportData.status.toLowerCase()==='approved'?'#d4edda':reportData.status.toLowerCase()==='rejected'?'#f8d7da':reportData.status.toLowerCase()==='pending'?'#fff3cd':'#cce5ff'}; color:${reportData.status.toLowerCase()==='approved'?'#155724':reportData.status.toLowerCase()==='rejected'?'#721c24':reportData.status.toLowerCase()==='pending'?'#856404':'#004085'};`;
      const styleRisk = `display:inline-block; padding:3px 12px; border-radius:12px; font-size:12px; font-weight:bold; background:${reportData.riskLevel==='HIGH'?'#f8d7da':reportData.riskLevel==='MEDIUM'?'#fff3cd':'#d4edda'}; color:${reportData.riskLevel==='HIGH'?'#721c24':reportData.riskLevel==='MEDIUM'?'#856404':'#155724'};`;
      const styleBox = 'background:#f8fafc; border:1px solid #d1d5db; border-radius:6px; padding:14px; margin-bottom:10px;';
      const styleH1 = 'color:#22223b; margin:0; font-size:24px; font-weight:bold;';
      const styleH2 = 'color:#4fc3f7; margin:0; font-size:16px; font-weight:600;';
      const styleLabel = 'font-weight:bold; color:#22223b;';
      return `
        <div style="${styleMain}">
          <div style="${styleHeader}">
            <h1 style="${styleH1}">Insurance Claim Report</h1>
            <div style="color:#4fc3f7; font-size:13px; margin-top:4px;">Generated on ${new Date().toLocaleString()}</div>
            <div style="color:#7f8c8d; font-size:13px;">Report ID: ${reportData.claimId}</div>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Claim Information</div>
            <table style="${styleTable}">
              <tr><th style="${styleTh}">Claim ID</th><td style="${styleTd}">${reportData.claimId}</td><th style="${styleTh}">Claim Name</th><td style="${styleTd}">${reportData.claimName}</td></tr>
              <tr><th style="${styleTh}">Status</th><td style="${styleTd}"><span style="${styleBadge}">${reportData.status.replace('_',' ')}</span></td><th style="${styleTh}">Submitted On</th><td style="${styleTd}">${reportData.submittedOn}</td></tr>
              <tr><th style="${styleTh}">Reviewed At</th><td style="${styleTd}">${reportData.reviewedAt || 'Not reviewed yet'}</td><th style="${styleTh}">Uploaded By</th><td style="${styleTd}">${reportData.uploadedBy || 'N/A'}</td></tr>
            </table>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Patient & Policy Details</div>
            <table style="${styleTable}">
              <tr><th style="${styleTh}">Patient Name</th><td style="${styleTd}">${reportData.patientName}</td><th style="${styleTh}">Policy ID</th><td style="${styleTd}">${reportData.policyId}</td></tr>
              <tr><th style="${styleTh}">Policy Value</th><td style="${styleTd}">Rs${reportData.policyValue}</td><th style="${styleTh}">User ID</th><td style="${styleTd}">${reportData.userId}</td></tr>
            </table>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Document Information</div>
            <table style="${styleTable}">
              <tr><th style="${styleTh}">Document Filename</th><td style="${styleTd}">${reportData.filename}</td><th style="${styleTh}">Document Type</th><td style="${styleTd}">${reportData.filename.split('.').pop().toUpperCase()}</td></tr>
            </table>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">AI Analysis Results</div>
            <table style="${styleTable}">
              <tr><th style="${styleTh}">Risk Score</th><td style="${styleTd}">${reportData.riskScore}/100</td><th style="${styleTh}">Risk Level</th><td style="${styleTd}"><span style="${styleRisk}">${reportData.riskLevel}</span></td></tr>
            </table>
            <div style="${styleBox}"><span style="${styleLabel}">Risk Assessment:</span> This claim has been classified as <b>${reportData.riskLevel}</b> risk based on AI analysis. ${reportData.riskScore !== 'N/A' ? `Risk score: ${reportData.riskScore}/100` : ''}</div>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Extracted Text & Summary</div>
            <div style="${styleBox}"><span style="${styleLabel}">AI Extracted Summary:</span><br>${reportData.summary || '<i>No summary available</i>'}</div>
            <div style="${styleBox}"><span style="${styleLabel}">OCR/Extracted Text:</span><br>${reportData.ocrText ? `<pre style='white-space:pre-wrap; font-size:13px;'>${reportData.ocrText}</pre>` : '<i>No OCR/extracted text available</i>'}</div>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Review Notes</div>
            <div style="${styleBox}">${reportData.reason ? reportData.reason : '<i>No review notes provided</i>'}</div>
          </div>

          <div style="${styleSection}">
            <div style="${styleSectionTitle}">Footer</div>
            <div style="${styleBox}">
              <p>This report was automatically generated by InsuraAI System</p>
              <p>For questions or support, please contact our team</p>
              <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      `;
    };
  
    const generatePDF = async () => {
      try {
        if (typeof window.html2pdf === 'undefined') {
          const reportContent = JSON.stringify(reportData, null, 2);
          const blob = new Blob([reportContent], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `claim-report-${claimId}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert('PDF generation not available. Downloaded JSON report instead. Please install html2pdf library for PDF generation.');
          return;
        }
        const content = generatePDFContent();
        const element = document.createElement('div');
        element.innerHTML = content;
        document.body.appendChild(element);
        const opt = {
          margin: 0,
          filename: `insurance-claim-report-${claimId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        await window.html2pdf().set(opt).from(element).save().then(() => {
          document.body.removeChild(element);
        });
      } catch (error) {
        console.error('PDF generation error:', error);
        const reportContent = JSON.stringify(reportData, null, 2);
        const blob = new Blob([reportContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `claim-report-${claimId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('PDF generation failed. Downloaded JSON report instead.');
      }
    };
    generatePDF();
  };

  return (
    <div className="claim-details enhanced-card">
      <div className="detail-header">
        <h2><span role="img" aria-label="file">📄</span> Claim Details</h2>
        <span className={`status-badge ${getStatusClass(status)}`}>{status.replace('_', ' ')}</span>
      </div>
      <div className="detail-grid">
        <div className="detail-item"><strong>Claim ID:</strong> <span className="claim-id">{claimId}</span></div>
        <div className="detail-item"><strong>Patient Name:</strong> <span>{patientName}</span></div>
        <div className="detail-item"><strong>Policy ID:</strong> <span>{policyId}</span></div>
        <div className="detail-item"><strong>Policy Value:</strong> <span>{policyValue}</span></div>
        <div className="detail-item"><strong>User ID:</strong> <span>{userId}</span></div>
        <div className="detail-item"><strong>Status:</strong> <span className={`status-badge ${getStatusClass(status)}`}>{status.replace('_', ' ')}</span></div>
        <div className="detail-item"><strong>Submitted On:</strong> <span>{formatDate(createdAt)}</span></div>
        <div className="detail-item full-width"><strong>Uploaded Document:</strong> <span>{filename}</span></div>
      </div>
      <div className="detail-actions">
             <button 
          className="action-button secondary" 
          onClick={handleDownloadReport}
        >
          <span role="img" aria-label="download">⬇️</span> Download Report
        </button>
      </div>
    </div>
  );
};

export default ClaimDetails; 