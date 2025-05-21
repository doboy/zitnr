import classNames from "classnames"
import React from "react"

export const BalanceStats = ({
  totalCost,
  totalDonations,
}) => {
  return (
    <div className="ui horizontal statistics">
      <div className={classNames("statistic", {
        red: totalDonations - totalCost < 0,
      })}>
        <div className="value">
          ${totalDonations - totalCost}
        </div>
        <div className="label">
          Balance
        </div>
      </div>
      <div className="statistic">
        <div className="value">
          ${totalDonations.toFixed(0)}
        </div>
        <div className="label">
          Donations received
        </div>
      </div>
      <div className="statistic">
        <div className="value">
          ${totalCost.toFixed(0)}
        </div>
        <div className="label">
          Total cost
        </div>
      </div>
    </div>

  )
}