import React, { useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../utils/firebaseApp';
import { parksById } from '../utils/parksById';

const CourtStatusReportForm = ({ parkId, fetchLastReport, setError, setShowReportForm }) => {
  const [status, setStatus] = useState('');
  const [stacks, setStacks] = useState(0);
  const [reservedCourts, setReservedCourts] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: userlatitude, longitude: userLongitude } = position.coords;
      const { location: parkLocation } = parksById[parkId];
      const distance = calculateDistance(userlatitude, userLongitude, parkLocation.latitude, parkLocation.longitude);

      if (distance > 1) {
        setError('You must be within 1 mile of the park to report status.');
        return;
      }

      try {
        await addDoc(collection(getFirestore(firebaseApp), 'courtStatus'), {
          status,
          stacks,
          reservedCourts,
          timestamp: new Date().toISOString(),
          parkId // Include parkId in the report
        });

        setSubmissionMessage('Report submitted successfully!');
        setShowReportForm(false);
        setStatus('');
        setStacks(0);
        setReservedCourts(0);
        setError('');
        fetchLastReport(); // Refresh last report
      } catch (error) {
        setError(`Submission failed: ${error.message}`);
        setSubmissionMessage('');
      }
    }, (error) => {
      setError(`Unable to retrieve your location. ${error.message}`);
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  };

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <h3 className="ui header">Report Court Status</h3>
      <div className="field">
        <label>What are the court conditions?</label>
        <select
          className="ui dropdown"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>Wet/Dry</option>
          <option value="Wet">Wet</option>
          <option value="Dry">Dry</option>
        </select>
      </div>
      <div className="field">
        <label>How many stacks are there?</label>
        <input
          type="number"
          value={stacks}
          onChange={(e) => setStacks(Number(e.target.value))}
          required
        />
      </div>
      <div className="field">
        <label>How many courts are reserved?</label>
        <input
          type="number"
          value={reservedCourts}
          onChange={(e) => setReservedCourts(Number(e.target.value))}
          required
        />
      </div>
      <button className="ui button primary" type="submit">Submit</button>
      {submissionMessage && <div className="ui message">{submissionMessage}</div>}
    </form>
  );
};

export default CourtStatusReportForm;