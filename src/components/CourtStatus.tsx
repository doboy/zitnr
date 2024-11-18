import React from 'react';
import { CourtReport } from '../types';

const CourtStatus = ({ lastReport }: { lastReport: CourtReport | null }) => {
  return (
    <>
      {lastReport ? (
        <div className="ui message">
          <h3>Current Park Status</h3>
          <p>{lastReport.stacks} {lastReport.stacks === 1 ? 'stack' : 'stacks'} of the park are {lastReport.status}</p>
          <p>Reported At: {new Date(lastReport.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p style={{
            fontSize: "2rem"
        }}>No reports at the moment</p>
      )}
    </>
  );
};

export default CourtStatus;