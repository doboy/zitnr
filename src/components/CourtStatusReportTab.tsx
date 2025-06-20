import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import { dateToString, MillerPark, PARKS, parksById } from "zitnr-utils";

import { firebaseApp } from "../utils/firebaseApp";
import CourtStatus from "./CourtStatus";
import { CalendarEntry, CourtReport } from "../types";
import CourtStatusReportForm from "./CourtStatusReportForm";
import { getTodaysLatestCourtReportByParkId } from "../utils/getTodaysLatestCourtReportByParkId";
import ReservationStatus from "./ReservationStatus";
import { getReservationsByParkId } from "../utils/getReservationsByParkId";
import { calculateDistanceBetweenCoordsInMiles } from "../utils/calculateDistanceBetweenCoordsInMiles";
import { COURT_STATUS_DATABASE_NAME } from "../utils/constants";

export type SubmissionStatus = {
  show?: boolean;
  success: boolean;
  message: string;
};

const CourtStatusReportTab = () => {
  const [lastReport, setLastReport] = useState<CourtReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultParkId = MillerPark.id;
  const [parkId, setParkId] = useState(defaultParkId.toString());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEntry[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const locationWarningStorageKey = "isLocationWarningDismissed";
  const [isLocationWarningDismissed, setIsLocationWarningDismissed] = useState(
    localStorage.getItem(locationWarningStorageKey) === "true" ? true : false,
  );
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus | null>(null);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [submissionTimeout, setSubmissionTimeout] =
    useState<NodeJS.Timeout | null>(null); // Timeout state to clear message

  const db = getFirestore(firebaseApp);

  const fetchLastReport = async () => {
    const report = await getTodaysLatestCourtReportByParkId(db, Number(parkId));
    if (report) {
      setLastReport(report);
    } else {
      setLastReport(null);
    }
  };

  const fetchCurrentReservations = async () => {
    const response = await getReservationsByParkId(
      Number(parkId),
      dateToString(new Date()),
    );
    setCalendarEvents(response);
  };

  const handleShowReportForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      updateReportSubmissionStatus({
        success: false,
        message: "Geolocation is not supported by your browser.",
        show: true,
      });
      return;
    }

    // if (!position) {
    //   navigator.geolocation.getCurrentPosition(
    //     async (position) => {
    //       const { latitude: userlatitude, longitude: userLongitude } =
    //         position.coords;
    //       const { location: parkLocation } = parksById[parkId];
    //       const distance = calculateDistanceBetweenCoordsInMiles(
    //         userlatitude,
    //         userLongitude,
    //         parkLocation.latitude,
    //         parkLocation.longitude,
    //       );
    //       setPosition(position);
    //       if (distance > 1) {
    //         updateReportSubmissionStatus({
    //           success: false,
    //           message:
    //             "You must be within 1 mile of the park to report status.",
    //           show: true,
    //         });
    //         return;
    //       }
    //     },
    //     (error) => {
    //       updateReportSubmissionStatus({
    //         success: false,
    //         message: `Unable to retrieve your location. ${error.message}`,
    //         show: true,
    //       });
    //     },
    //   );
    // }

    setShowReportForm(!showReportForm);
    setSubmissionStatus(null); // Reset the submission status when reopening the form
  };

  const loadReservationsAndCourtStatus = async () => {
    setIsLoading(true);
    try {
      await fetchCurrentReservations();
      await fetchLastReport();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReservationsAndCourtStatus();
  }, [parkId]);

  const handleFormSubmit = async (status: string, stacks: number) => {
    try {
      // if (!position) {
      //   throw new Error("Unable to retrieve your location.");
      // }

      // const { latitude: userLatitude, longitude: userLongitude } =
      //   position.coords;
      // const { location: parkLocation } = parksById[parkId];
      // const distance = calculateDistanceBetweenCoordsInMiles(
      //   userLatitude,
      //   userLongitude,
      //   parkLocation.latitude,
      //   parkLocation.longitude,
      // );

      // if (window.location.hostname == "zitnr.com" && distance > 1) {
      //   throw new Error(
      //     "You must be within 1 mile of the park to report status.",
      //   );
      // }

      await addDoc(
        collection(getFirestore(firebaseApp), COURT_STATUS_DATABASE_NAME),
        {
          status,
          stacks,
          reportedAtISO: new Date().toISOString(),
          parkId,
        },
      );

      updateReportSubmissionStatus({
        success: true,
        message: "Report submitted successfully!",
        show: true,
      });
      fetchLastReport(); // Refresh last report
      setShowReportForm(false);
    } catch (error) {
      updateReportSubmissionStatus({
        success: false,
        message: `Submission failed: ${error.message}`,
        show: true,
      });
    }
  };

  const updateReportSubmissionStatus = (submissionStatus: SubmissionStatus) => {
    // Clear any existing timeout
    if (submissionTimeout) {
      clearTimeout(submissionTimeout);
    }

    setSubmissionStatus(submissionStatus);
    // Set a new timeout to hide the message after 3 seconds
    const timeout = setTimeout(() => {
      setSubmissionStatus(null);
    }, 5000);
    setSubmissionTimeout(timeout);
  };

  return (
    <div className="ui container">
      <h5
        className="ui small header"
        style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
      >
        <i className="cloud icon"></i>
        <div className="content">
          Court Conditions and Stack Status
          <div className="sub header">
            Query current court's conditions and number of stacks and report
            status
          </div>
        </div>
      </h5>

      {/* Park Selection */}
      <div className="inline field">
        <div
          className="ui selection dropdown"
          ref={(ref) => {
            // @ts-ignore
            $(ref).dropdown({
              onChange: function (value) {
                setParkId(value.toString());
              },
            });
          }}
        >
          <input type="hidden" name="parkId" value={parkId} />
          <i className="dropdown icon"></i>
          <div className="default text">Select Park</div>
          <div className="menu">
            {PARKS.filter((park) => !!park.location).map((park) => (
              <div
                key={park.id}
                className="item"
                data-value={park.id}
                onClick={() => setParkId(park.id.toString())}
              >
                {park.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={classnames([
          "ui",
          { loading: isLoading },
          "very basic segment",
        ])}
      >
        {/* Submission Status Message */}
        {submissionStatus && submissionStatus.show && (
          <div
            className={`ui message ${submissionStatus.success ? "green" : "red"}`}
          >
            <i
              className="close icon"
              onClick={() =>
                updateReportSubmissionStatus({
                  message: "",
                  success: true,
                  show: false,
                })
              }
            ></i>
            {submissionStatus.message}
          </div>
        )}

        {!showReportForm && (
          <>
            <div
              className="ui container"
              style={{ marginTop: "1rem", width: "500px" }}
            >
              {/* <div>
                <h5 className="ui header">Reservation Status</h5>
                <ReservationStatus calendarEvents={calendarEvents} />
              </div>

              <div className="divided grid" /> */}

              <div style={{ marginTop: "2rem" }}>
                <h5 className="ui header">Court Status</h5>
                <div className="ui center aligned">
                  <CourtStatus lastReport={lastReport} />
                </div>
              </div>
            </div>

            <div className="ui center aligned container very basic segment">
              <button
                className="ui button primary"
                onClick={handleShowReportForm}
              >
                {showReportForm ? "Cancel Report" : "Add a report"}
              </button>
            </div>
          </>
        )}
        {showReportForm && (
          <div>
            {/* {!isLocationWarningDismissed && (
              <div className="ui warning message">
                <i
                  className="close icon"
                  onClick={() => {
                    localStorage.setItem(locationWarningStorageKey, "true");
                    setIsLocationWarningDismissed(true);
                  }}
                ></i>
                Note: You need to allow location access to report court status.
                You must be within 1 mile of the court.
              </div>
            )} */}
            <CourtStatusReportForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowReportForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtStatusReportTab;
