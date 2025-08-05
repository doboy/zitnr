import React from "react";
import { BalanceStats } from "../components/BalanceStats";
import { useTransactions } from "../hooks/useTransactions";
import { Accordion } from "semantic-ui-react";
import Layout from "../components/Layout";
import Image from 'next/image';
import { PARKS } from "zitnr-utils";

const Home = ({ }: {}) => {
  const [isLoadingTransactions, totalCost, totalDonations] = useTransactions();

  return (
    <div>
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
            <a href="/donate" className="ui black button">DONATE</a>
          </div>
        </div>

      </Layout>
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
            <div className="ui segment medium centered image">
              <a href="/calendar/miller-playfield">
                <Image
                  alt="Reservation Calendar"
                  width={270}
                  height={199}
                  style={{ border: "1px solid #ddd", borderRadius: "4px" }}
                  className="ui segment medium centered image"
                  src="/reservation-calendar.png" />
              </a>
            </div>
            <br />
            <a href="/calendar/miller-playfield" className="ui black button">View Calendar</a>
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
                  <Image
                    alt="Miller Park"
                    width={300}
                    height={216}
                    style={{ border: "1px solid #ddd", borderRadius: "4px" }}
                    src="/miller-park.png" />

                </div>
              </div>
            </div>

            <br />
            <a href="/donate" className="ui black button">DONATE</a>
          </div>
        </div>

        <div className="ui divider" />
        <div className="ui basic segment">
          <div className="ui text container">
            <Faqs />
          </div>
        </div>

        <div className="ui divider" />
        <div className="ui vertical footer segment">
          <div className="ui container">
            <div className="ui grid">
              <div className="two wide column"></div>
              <div className="six wide computer column sixteen wide mobile column">
                <h4 className="ui header">Community</h4>
                <div className="ui link list">
                  <a className="item" href="/donate">Donate</a>
                  <a className="item" href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform" target="_blank">Contact Us</a>
                  <a className="item" href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform" target="_blank">Submit an issue</a>
                </div>
              </div>

              <div className="six wide computer column sixteen wide mobile column">
                <h4 className="ui header">Reservation Calendar</h4>
                  <div className="ui link list">
                    {PARKS.map((park, index) => {
                      if (index <= 4) {
                        return (
                          <a key={index} className="item" href={`/calendar/${park.slug}`}>
                            {park.name} Calendar
                          </a>
                        );
                      }
                    })}
                  </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
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

      <Accordion panels={FACTS} exclusive={false} styled>
      </Accordion>
    </>
  )
}

export default Home;