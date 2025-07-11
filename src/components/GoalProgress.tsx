import classNames from "classnames"
import React, { useEffect, useMemo } from "react"

export const GoalProgress = ({
  totalDonations,
  goal
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
      <div style={{ marginBottom: "1rem" }} className="ui indicating progress" data-value={totalDonations} data-total={goal} ref={progressRef}>
        <div className="bar">
          <div className="progress"></div>
        </div>
      </div>

      <h3 className="ui header">
        <div className="content">
          ${Math.min(goal, totalDonations)} raised<br />
          <div className="sub header">
            Goal to cover the season: <strong>${goal}</strong>
          </div>
        </div>
      </h3>

    </div>

  )
}