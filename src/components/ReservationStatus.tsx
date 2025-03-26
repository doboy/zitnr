import React from "react";
import { readableTime } from "../utils/readableTime";

interface ReservationStatusProps {
  calendarEvents: Array<{
    description: string;
    startTime: string;
    endTime: string;
    icon: string;
  }>;
}

const ReservationStatus: React.FC<ReservationStatusProps> = ({
  calendarEvents,
}) => {
  const currentTime = new Date();
  const currentTimeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // To ensure it matches "HH:MM:SS" format
  });

  // Filter events where endTime is greater than currentTime
  const upcomingEvent = calendarEvents
    .filter((entry) => {
      return entry.endTime > currentTimeString;
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime))[0]; // Only take the first event

  return (
    <div className="ui center aligned container">
      {upcomingEvent ? (
        <div
          className={`ui message ${upcomingEvent.description === "open play - z.i.t.n.r." || upcomingEvent.icon === "green check" ? "green" : "red"}`}
        >
          <div className="ui header">
            {upcomingEvent.description} until{" "}
            {readableTime(upcomingEvent.endTime)}
          </div>
        </div>
      ) : (
        <div className="ui message green">
          <p>No upcoming reservations</p>
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;
