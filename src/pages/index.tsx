import React from "react";
import { HandlePageChangeType } from "../types";
import { BalanceStats } from "../components/BalanceStats";
import { useTransactions } from "../hooks/useTransactions";
import { Accordion } from "semantic-ui-react";
import Layout from "../components/Layout";

const Home = ({ handlePageChange }: { handlePageChange?: HandlePageChangeType }) => {
  const [isLoadingTransactions, totalCost, totalDonations] = useTransactions();

  React.useEffect(() => {
    document.title = 'Zack is the new Randy';
  }, []);

  return (
    <Layout title="Zack is the new Randy" selectedMenuItem="home">
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
    </Layout>
  );
};

const FACTS = [{
  title: "Why are we fundraising?",
  content: "We are fundraising to cover the costs of reserving courts for open play at Miller Park. If we do not reserve the courts, the courts may be reserved by private groups and not available for open play."
}, {
  title: "Do I need a reservation to play?",
  content: "During open play, no reservation is needed. Just show up at the park during the scheduled open play hours and join in on the fun!"
}, {
  title: "How does open play work?",
  content: "Simply stack your paddles in line based on your level of play. When it's your turn, you will be called to the court to play a game with the players in your stack of 4. To share the courts fairly, players play a game to 11 points and then rotate out."
}
// , {
//   title: "Which direction do I stack?",
//   content: <img className="ui large centered image" src="./public/stacking-diagram.png" />
// }
]


const Faqs = () => {
  return (
    <>
      <h1 className="ui centered aligned header">
        Frequently Asked Questions
      </h1>

      <Accordion panels={FACTS} exclusive={false} centered styled>
      </Accordion>
    </>
  )
}

export default Home;