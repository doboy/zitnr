import classnames from "classnames";
import React, { useState } from "react";
import { COURT_STATUS_STRINGS, CourtStatus } from "../types";

const CourtStatusReportForm = ({ onSubmit, onCancel }) => {
  const [status, setStatus] = useState<CourtStatus>(undefined);
  const [stacks, setStacks] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(status, stacks);
    setIsLoading(false);
  };

  return (
    <form
      className={classnames("ui form", { loading: isLoading })}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>What are the court conditions?</label>
        <div
          className="grouped fields"
          onChange={(event) => {
            // @ts-ignore
            setStatus(event.target.value);
          }}
        >
          {COURT_STATUS_STRINGS.map((statusOption) => {
            return (
              <div className="field" key={statusOption}>
                <div className="ui radio checkbox">
                  <input
                    id={`status-${statusOption}`}
                    type="radio"
                    value={statusOption}
                    checked={status == statusOption}
                  />
                  <label htmlFor={`status-${statusOption}`}>
                    {statusOption}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
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
      <button className="ui right floated button primary" type="submit">
        Submit
      </button>
      <button className="ui right floated black button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CourtStatusReportForm;
