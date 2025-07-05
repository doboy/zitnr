import classNames from "classnames"
import React, { useEffect, useMemo } from "react"

const GOAL = 3500;

export const GoalProgress = ({
  totalDonations,
}) => {
  const progressRef = React.useRef<HTMLDivElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    $(progressRef.current).progress({});
    // @ts-ignore
    $(popupRef.current).popup({
      position: "top center",
      on: "hover",
      inline: true,
      hoverable: true,
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }} className="ui indicating progress" data-value={totalDonations} data-total={GOAL} ref={progressRef}>
        <div className="bar">
          <div className="progress"></div>
        </div>
      </div>

      <h3 className="ui header">
        <div className="content">
          ${totalDonations} raised<br />
          <div className="sub header">Season Goal: $3500 <i className="info circle icon" ref={popupRef} data-content="Goal for open play until Oct 1st!" />
          </div>
        </div>
      </h3>

    </div>

  )
}