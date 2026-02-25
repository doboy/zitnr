import React from "react"

export const GoalProgress = ({
  totalDonations,
  goal
}) => {
  const percent = Math.min(100, Math.round((totalDonations / goal) * 100));

  return (
    <div>
      <div className={`ui ${percent >= 100 ? "success" : "indicating"} progress`} data-percent={percent}>
        <div className="bar" style={{ width: `${percent}%`, transition: "width 0.3s ease" }}>
          <div className="progress">{percent}%</div>
        </div>
      </div>
      <h3 className="ui header">
        <div className="content">
          ${Math.min(goal, totalDonations).toFixed(2)} raised<br />
          <div className="sub header">
            Goal to cover the season: <strong>${goal}</strong>
          </div>
        </div>
      </h3>

    </div>

  )
}