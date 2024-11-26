import React, { useState } from 'react';
import { CourtStatus } from '../types';

const CourtStatusReportForm = ({ onSubmit }) => {
  const [status, setStatus] = useState('');
  const [stacks, setStacks] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(status, stacks);
  };

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <h5 className="ui header">Report Court Status</h5>
      <div className="field">
        <label>What are the court conditions?</label>
        <select
          className="ui dropdown"
          value={status || ""}
          onChange={(e) => setStatus(e.target.value as CourtStatus)}
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
          min={1}
          onChange={(e) => setStacks(Number(e.target.value))}
          required
        />
      </div>
      <button className="ui button primary" type="submit">Submit</button>
    </form>
  );
};

export default CourtStatusReportForm;
