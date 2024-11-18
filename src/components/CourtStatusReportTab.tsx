import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../utils/firebaseApp';
import CourtStatus from './CourtStatus';
import { CourtReport } from '../types';
import PARKS from '../utils/parks';
import { parksById } from '../utils/parksById';
import CourtStatusReportForm from './CourtStatusReportForm';
import { getCourtReportByParkId } from '../utils/getCourtReportByParkId';

const CourtStatusReportTab = () => {
  const [lastReport, setLastReport] = useState<CourtReport | null>(null);
  const [error, setError] = useState('');
  
  // Set the default parkId to the ID of "Miller Park" using parksById
  const defaultParkId = Object.values(parksById).find(park => park.name === "Miller Park")?.id || PARKS[0].id;
  const [parkId, setParkId] = useState(defaultParkId.toString());
  const [showReportForm, setShowReportForm] = useState(false);

  const db = getFirestore(firebaseApp);

  const fetchLastReport = async () => {
    const report = await getCourtReportByParkId(db);
    if (report) {
      setLastReport(report);
    } else {
      setLastReport(null);
    }
  };

  useEffect(() => {
    fetchLastReport();
  }, [parkId]);

  return (
    <div className="ui container">
      <h5 className="ui small header" style={{marginTop: ".5rem", marginBottom: ".5rem"}}>
        <i className="calendar alternate icon"></i>
        <div className="content">
          Court Conditions and Stack Status
          <div className="sub header">
            Query current court's conditions and number of stacks and report status
          </div>
        </div>
      </h5>
      <div className="inline field">
        <div className="ui selection dropdown" ref={(ref) => {
            // @ts-ignore
            $(ref).dropdown({
                onChange: function (value) {
                    setParkId(value.toString());
                }
            });
        }}>
          <input type="hidden" name="parkId" value={parkId} />
          <i className="dropdown icon"></i>
          <div className="default text">Select Park</div>
          <div className="menu">
            {PARKS.map((park) => (
              <div key={park.id} className="item" data-value={park.id} onClick={() => setParkId(park.id.toString())}>
                {park.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && (
        <div className="ui visible red message">
          <i className="close icon" onClick={() => setError(null)}></i>
          <p style={{marginTop: 0}}>{error}</p>
        </div>
      )}
      <div style={{margin: "2rem"}}>
        <div className="ui center aligned container">
            <CourtStatus
            lastReport={lastReport} 
            />
        </div>
        {showReportForm && (
            <div style={{margin: "2rem"}}>
                <CourtStatusReportForm
                    parkId={parkId}
                    fetchLastReport={fetchLastReport}
                    setError={setError}
                    setShowReportForm={setShowReportForm}
                />
            </div>
        )}
        <div className="ui center aligned container" style={{marginTop: "2rem"}}>
            <button className="ui button primary" onClick={() => setShowReportForm(!showReportForm)}>
                {showReportForm ? 'Cancel Report' : 'Submit a Report'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CourtStatusReportTab;