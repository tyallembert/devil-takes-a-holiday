import React, { useEffect, useState } from 'react';
import { updateSiteContent } from '../../../utils/queries';
import { Check, LoaderPinwheel, X } from 'lucide-react';

const TimeChange = ({ content }) => {
  const [originalData, setOriginalData] = useState(content);
  const [formData, setFormData] = useState(content);
  const [submissionState, setSubmissionState] = useState("editing");

  // Handle changes in input values
  const handleChange = (index, field, value) => {
    const updatedFormData = { 
      ...formData, 
      value: formData.value.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      ) 
    };
    setFormData(updatedFormData);
  };
  
  const handleSetClosed = (index) => {
    const updatedFormData = { 
      ...formData, 
      value: formData.value.map((entry, idx) =>
        idx === index ? { ...entry, open: 'closed', close: 'closed' } : entry
      ) 
    };
    setFormData(updatedFormData);
  };

  // Handle form submission (e.g., saving updated times)
  const handleSubmit = (event) => {
    event.preventDefault();
    // For demonstration, log the updated form data (this would be sent to the backend in a real app)
    console.log('Updated form data:', formData);
    setSubmissionState("loading");
    updateSiteContent(formData).then((success) => {
        if(success) {
          console.log("Successfully updated")
          setSubmissionState("success")
          setOriginalData(formData)
        } else {
          console.log("Failed to update")
          setSubmissionState("fail")
        }
    });
  };

  useEffect(() => {
    if(submissionState === "success" || submissionState === "fail") {
      setTimeout(() => {
        setSubmissionState("editing")
      }, 2000)
    }
  }, [submissionState])

  // Render the form
  return (
    <div className="content">
      <h2>Manage Hours</h2>
      {formData.key === 'times' && formData.value.length > 0 ? (
        <form className="timeForm" onSubmit={handleSubmit}>
          <div className='daysContainer'>
            {/* Loop through all days */}
            {formData.value.map((entry, index) => (
              <div key={index} className="dayEntry">
                  <p className='title'>{entry.day}</p>
                  <button 
                  type="button" 
                  className={`closedButton 
                    ${entry.close === "closed" 
                    && entry.open === "closed" ? "closed": ""}`} 
                  onClick={() => handleSetClosed(index)}>
                    Closed
                  </button>
                  <div className="input">
                      <label>Open</label>
                      <input
                      type="time"
                      value={entry.open || ''}
                      onChange={(e) => handleChange(index, 'open', e.target.value)}
                      />
                  </div>
                  <div className="input">
                      <label>Close</label>
                      <input
                      type="time"
                      value={entry.close || ''}
                      onChange={(e) => handleChange(index, 'close', e.target.value)}
                      />
                  </div>
              </div>
            ))}
          </div>
          <div className="buttonsContainer">
            {
              submissionState === "loading" ? <button className='submitButton' type="submit"><LoaderPinwheel className='loading'/></button>:
              submissionState === "success" ? <button className='submitButton success' type="submit"><Check /></button>:
              submissionState === "fail" ? <button className='submitButton fail' type="submit"><X /> Failed to Submit</button>:
              <button className='submitButton' type="submit">Save Changes</button>
            }
            <button className='submitButton' type="button" onClick={() => setFormData(originalData)}>Cancel</button>
          </div>
        </form>
      ) : (
        <p>No times available to edit.</p>
      )}
    </div>
  );
};

export default TimeChange;
