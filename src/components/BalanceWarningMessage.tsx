import React from "react"
import { HandlePageChangeType } from "../types"

export const BalanceWarningMessage = ({
  totalCost,
  totalDonations,
  handlePageChange,
}: {
  totalCost: number
  totalDonations: number
  handlePageChange: HandlePageChangeType
}) => {
  if (totalDonations - totalCost >= 0) {
    return null
  };

  if (window.location.hash === "#donate") {
    return (
      <div className="ui warning message">
        This reservation costs exceeds our current donation balance. Your support helps keep courts open to all—please consider donating!
      </div>
    )

  }

  return (
    <div className="ui warning message">
      This reservation costs exceeds our current donation balance. Your support helps keep courts open to all—please consider &nbsp;
      <a style={{ cursor: "pointer" }} onClick={() => handlePageChange("#donate")}>donating!</a>
    </div>
  )
}