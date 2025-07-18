import classNames from "classnames"
import React from "react"

export const BalanceStats = ({
  totalCost,
  totalDonations,
  isLoading,
}) => {
  return (
    <div className="ui horizontal statistics">
      <div className={classNames("statistic", {
        red: totalDonations - totalCost < 0,
      })}>
        <div className="value">
          ${isLoading ? <div className="ui active inline loader"></div> : (totalDonations - totalCost).toFixed(0)}
        </div>
        <div className="label">
          Balance
        </div>
      </div>
      <div className="statistic">
        <div className="value">
        ${isLoading ? <div className="ui active inline loader"></div> : totalDonations.toFixed(0)}
        </div>
        <div className="label">
          Donations received
        </div>
      </div>
      <div className="statistic">
        <div className="value">
        ${isLoading ? <div className="ui active inline loader"></div> : totalCost.toFixed(0)}
        </div>
        <div className="label">
          Total cost
        </div>
      </div>
    </div>
  )
}