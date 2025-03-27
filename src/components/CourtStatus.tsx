import React from "react";
import { CourtReport } from "../types";
import { readableTime } from "../utils/readableTime";
import { dateToTime } from "zitnr-utils";

const CourtStatus = ({ lastReport }: { lastReport: CourtReport | null }) => {
  const reportTime = lastReport
    ? dateToTime(new Date(lastReport.reportedAtISO))
    : undefined;

  return (
    <div className="ui center aligned container">
      {lastReport ? (
        <div className="ui message">
          <div className="ui header">
            {lastReport.stacks} {lastReport.stacks === 1 ? "stack" : "stacks"}{" "}
            and courts are "{lastReport.status.toLowerCase()}"
          </div>
          <p>Reported At: {readableTime(reportTime)}</p>
        </div>
      ) : (
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          No reports at the moment
        </p>
      )}
    </div>
  );
};

export default CourtStatus;
