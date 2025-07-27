import classNames from "classnames"
import React, { useEffect, useMemo } from "react"
import { Progress } from "semantic-ui-react";

export const GoalProgress = ({
  totalDonations,
  goal
}) => {
  const progressRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      <Progress value={totalDonations} total={goal} indicating />
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