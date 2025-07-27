import React from "react";
import { HandlePageChangeType } from "../types";
import { BalanceStats } from "../components/BalanceStats";
import { useTransactions } from "../hooks/useTransactions";

export const Home = ({ handlePageChange }: { handlePageChange?: HandlePageChangeType }) => {
  const [isLoadingTransactions, totalCost, totalDonations] = useTransactions();

  React.useEffect(() => {
    document.title = 'Zack is the new Randy';
  }, []);

  console.log("Home page loaded");

  return (
    <>
      <div className="ui basic segment">
        <div className="ui center aligned text container">
          <h1 className="ui header">
            Welcome to z.i.t.n.r.!
          </h1>
          <div>
            We're a non-profit using donations to reserve courts for open play at <strong>Miller Park</strong><br /><br />
            Open play schedule is <br />
            <strong>Monday-Friday: 5:45-8:15 PM.</strong><br />
            <strong>Monday, Wednesday, Friday: 10:00-12:00 PM.</strong><br /><br />
            It costs <strong>$37.50</strong> per day — help keep the games going by donating today.
          </div>
          <br />
          <button onClick={() => handlePageChange("#donate")} className="ui black button">DONATE</button>
        </div>
      </div>

      <div className="white-bg">
        <div className="ui divider" />
        <div className="ui basic center aligned segment">
          <div className="ui center aligned text container">
            <h1 className="ui header">
              Check reservation schedule
            </h1>
            <div>
              Plan your next session with our <strong>FREE</strong> easy to use calendar view. <br />
              See when courts are available for open play in <strong>40+ parks</strong>.<br />
            </div>
            <br />
            <span>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePageChange("#calendar");
                }} className="ui segment medium centered image" src="./public/reservation-calendar.png" />
            </span>
            <br />
            <button onClick={() => handlePageChange("#calendar")} className="ui black button">View Calendar</button>
          </div>
        </div>

        <div className="ui divider" />
        <div className="ui basic center aligned segment">
          <div className="ui center aligned text container">
            <h1 className="ui header">
              Open Play - Capitol Hill
            </h1>
            <div>
              Donations are used to reserve courts for open play at <strong>Capitol Hill, Miller Park</strong>.
            </div>
            <br />

            <div className="ui stackable two column grid">
              <div className="column">
                <BalanceStats isLoading={isLoadingTransactions} totalCost={totalCost} totalDonations={totalDonations} />
              </div>
              <div className="column">
                <div>
                  <img
                    className="ui medium centered image" src="./public/miller-park.png" />
                </div>
              </div>
            </div>

            <br />
            <button onClick={() => handlePageChange("#donate")} className="ui black button">DONATE</button>
          </div>
        </div>

        <div className="ui divider" />
        <div className="ui basic segment">
          <div className="ui text container">
            <Faqs />
          </div>
        </div>

        {/* <div className="ui divider" />
        <div className="ui  vertical footer segment">
          <div className="ui center aligned container">
            <div className="ui stackable grid">
              <div className="three wide column">
                <h4 className="ui header">Community</h4>
                <div className="ui link list">
                  <a className="item" href="https://www.transifex.com/organization/semantic-org/" target="_blank">Help Translate</a>
                  <a className="item" href="https://github.com/Semantic-Org/Semantic-UI/issues" target="_blank">Submit an Issue</a>
                  <a className="item" href="https://gitter.im/Semantic-Org/Semantic-UI" target="_blank">Join our Chat</a>
                  <a className="item" href="/cla.html" target="_blank">CLA</a>
                </div>
              </div>
              <div className="three wide column">
                <h4 className="ui header">Calendar</h4>
                <div className="ui link list">
                  <a className="item" href="https://github.com/Semantic-Org/Semantic-UI" target="_blank">Miller Playfield Reservation Calendar</a>
                  <a className="item" href="http://forums.semantic-ui.com" target="_blank">Green Lake Park East Reservation Calendar</a>
                  <a className="item" href="?parkId=1379#calendar" target="_blank">Rainier Beach Playfield Reservation Calendar</a>
                  <a className="item" href="http://forums.semantic-ui.com" target="_blank">Beacon Hill Reservation Calendar</a>
                  <a className="item" href="http://forums.semantic-ui.com" target="_blank">Bitter Lake Reservation Calendar</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

const Faqs = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      $(ref.current).accordion({
        exclusive: false,
        duration: 200,
      });
    }
  }, []);

  return (
    <>
      <h1 className="ui centered aligned header">
        Frequently Asked Questions
      </h1>

      <div ref={ref} className="ui fluid styled accordion">
        <div className="title">
          <i className="dropdown icon"></i>
          Why are we fundraising?
        </div>
        <div className="content">
          <p className="transition hidden">
            We are fundraising to cover the costs of reserving courts for open play at Miller Park.
            If we do not reserve the courts, the courts may be reserved by private groups and not available for open play.
          </p>
        </div>
        <div className="title">
          <i className="dropdown icon"></i>
          Do I need a reservation to play?
        </div>
        <div className="content">
          <p className="transition hidden">
            During open play, no reservation is needed. Just show up at the park during the scheduled open play hours and join in on the fun!
          </p>
        </div>
        <div className="title">
          <i className="dropdown icon"></i>
          How does open play work?
        </div>
        <div className="content">
          <p className="transition hidden">
            Simply stack your paddles in line based on your level of play.
            When it's your turn, you will be called to the court to play a game with the players in your stack of 4.
            To share the courts farily, players play a game to 11 points and then rotate out.
          </p>
        </div>
        <div className="title">
          <i className="dropdown icon"></i>
          Which direction do I stack?
        </div>
        <div className="content">
          <p className="transition hidden">
            See this diagram for how to stack your paddle:
            <img className="ui large centered image" src="./public/stacking-diagram.png" />

          </p>
        </div>
      </div>

      <div>
      </div>
      <br />
    </>
  )
}