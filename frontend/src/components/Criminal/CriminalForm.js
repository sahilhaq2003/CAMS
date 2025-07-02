// src/components/Criminal/CriminalForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Criminal.css';

function CriminalForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    aliases: '',
    crimes: '',
    arrestHistory: [],
    linkedCases: '',
    photo: null,
  });

  useEffect(() => {
    if (id) {
      const fetchCriminal = async () => {
        const token = localStorage.getItem('token');
        try {
          const res = await axios.get(`http://localhost:5000/api/criminals/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = res.data;
          setFormData({
            name: data.name || '',
            aliases: data.aliases.join(', '),
            crimes: data.crimes.join(', '),
            arrestHistory: data.arrestHistory || [],
            linkedCases: data.linkedCases.join(', '),
            photo: null, // photo handled separately
          });
        } catch (err) {
          console.error('Error fetching criminal data:', err);
        }
      };
      fetchCriminal();
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Arrest history handlers
  const handleArrestChange = (index, field, value) => {
    const newHistory = [...formData.arrestHistory];
    newHistory[index] = { ...newHistory[index], [field]: value };
    setFormData(prev => ({ ...prev, arrestHistory: newHistory }));
  };

  const addArrestEntry = () => {
    setFormData(prev => ({
      ...prev,
      arrestHistory: [...prev.arrestHistory, { date: '', location: '', notes: '' }],
    }));
  };

  const removeArrestEntry = (index) => {
    const newHistory = formData.arrestHistory.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, arrestHistory: newHistory }));
  };

  const handlePhotoChange = e => {
    setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      name: formData.name,
      aliases: formData.aliases.split(',').map(a => a.trim()).filter(a => a),
      crimes: formData.crimes.split(',').map(c => c.trim()).filter(c => c),
      arrestHistory: formData.arrestHistory,
      linkedCases: formData.linkedCases.split(',').map(c => c.trim()).filter(c => c),
    };

    try {
      let res;
      if (id) {
        // Update criminal
        res = await axios.put(`http://localhost:5000/api/criminals/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create criminal
        res = await axios.post('http://localhost:5000/api/criminals', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const criminalId = id || res.data._id;

      if (formData.photo) {
        const formDataObj = new FormData();
        formDataObj.append('photo', formData.photo);

        await axios.put(
          `http://localhost:5000/api/criminals/${criminalId}/photo`,
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      alert('Criminal saved successfully!');
      navigate('/criminals');
    } catch (err) {
      console.error('Error saving criminal:', err);
      alert('Failed to save criminal.');
    }
  };

  return (
    <div className="criminal-container">
      <h2>{id ? 'Edit Criminal' : 'Add New Criminal'}</h2>

      <form className="criminal-form" onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Aliases (comma separated):
          <input type="text" name="aliases" value={formData.aliases} onChange={handleChange} />
        </label>

        <label>Crimes Committed (comma separated):
          <input type="text" name="crimes" value={formData.crimes} onChange={handleChange} />
        </label>

        <label>Linked Cases (IDs, comma separated):
          <input type="text" name="linkedCases" value={formData.linkedCases} onChange={handleChange} />
        </label>

        <fieldset style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <legend>Arrest History</legend>
          {formData.arrestHistory.map((entry, idx) => (
            <div key={idx} className="arrest-history-entry">
              <label>Date:
                <input
                  type="date"
                  value={entry.date}
                  onChange={e => handleArrestChange(idx, 'date', e.target.value)}
                />
              </label>

              <label>Location:
                <input
                  type="text"
                  value={entry.location}
                  onChange={e => handleArrestChange(idx, 'location', e.target.value)}
                />
              </label>

              <label>Notes:
                <textarea
                  value={entry.notes}
                  onChange={e => handleArrestChange(idx, 'notes', e.target.value)}
                />
              </label>

              <button type="button" onClick={() => removeArrestEntry(idx)} className="delete-btn">Remove</button>
            </div>
          ))}

          <button type="button" onClick={addArrestEntry} className="add-btn">Add Arrest Entry</button>
        </fieldset>

        <label>Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>

        <button type="submit">{id ? 'Update Criminal' : 'Add Criminal'}</button>
        <button type="button" onClick={() => navigate('/criminals')} className="cancel-btn">Cancel</button>
      </form>
    </div>
  );
}

export default CriminalForm;
