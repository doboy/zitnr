import React, { useMemo } from "react";
import classnames from "classnames";
import { useRouter } from 'next/router';

import { parksById, Park, dateToString, MillerPark, GreenLakeParkEast, BeaconHillPlayfield, MountBakerPark, BitterLakePlayfield, RainierBeachPlayfield, MagnoliaPark, GreenLakeParkWest, LowerWoodlandPlayfield, IngrahamHS, GarfieldPlayfield, VolunteerPark, MadronaPlayground, SamSmithPark, MontlakePlayfield, RogersPlayfield, AYTCOutdoor, MadisonPark, ObservatoryPark, DavidRodgersPark, JeffersonParkLid, WallingfordPlayfield, LaurelhurstPlayfield, RainierPlayfield, HiawathaPlayfield, SolsticePark, DelridgePlayfield, DearbornPark, BryantPlayground, AlkiPlayfield, BallardHS, SewardPark, RiverviewPlayfield, DiscoveryPark, SealthHSComplex, MeadowbrookPlayfield, WaltHundleyPlayfield, SoundviewPlayfield, MagnoliaPlayfield, GilmanPlayfield, FroulaPlayground, BrightonPlayfield, LowerWoodlandPlayfieldTennis } from "zitnr-utils";

const MAIN_PARKS = [
  MillerPark,
  GreenLakeParkEast,
  MountBakerPark,
  BeaconHillPlayfield,
  BitterLakePlayfield,
  RainierBeachPlayfield,
  MagnoliaPark,
  GreenLakeParkWest,
  LowerWoodlandPlayfield,
]

const OTHER_PARKS = [
  IngrahamHS,
  GarfieldPlayfield,
  VolunteerPark,
  MadronaPlayground,
  SamSmithPark,
  MontlakePlayfield,
  RogersPlayfield,
  AYTCOutdoor,
  MadisonPark,
  ObservatoryPark,
  DavidRodgersPark,
  JeffersonParkLid,
  WallingfordPlayfield,
  LaurelhurstPlayfield,
  RainierPlayfield,
  HiawathaPlayfield,
  SolsticePark,
  DelridgePlayfield,
  DearbornPark,
  BryantPlayground,
  AlkiPlayfield,
  BallardHS,
  SewardPark,
  RiverviewPlayfield,
  DiscoveryPark,
  SealthHSComplex,
  MeadowbrookPlayfield,
  WaltHundleyPlayfield,
  SoundviewPlayfield,
  MagnoliaPlayfield,
  GilmanPlayfield,
  FroulaPlayground,
  BrightonPlayfield,
  LowerWoodlandPlayfieldTennis,
].sort((a, b) => a.name.localeCompare(b.name))

export const PARKS: Park[] = [
  ...MAIN_PARKS,
  ...OTHER_PARKS
]

import { CalendarEntry } from "../../types";
import { DayCalendar } from "../../components/DayCalendar";
import { timeToNumber } from "../../utils/timeToNumber";
import { getReservationsByParkId } from "../../utils/getReservationsByParkId";
import { Dropdown } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { courtEndTime, courtStartTime } from "../../utils/courtStartAndEndTime";

const DayCalendarWrapper = ({
  calendar,
  start,
  end,
  compact,
  showTimeline,
}: {
  start: number;
  end: number;
  calendar: CalendarEntry[];
  compact: boolean;
  showTimeline: boolean;
}) => {
  if (calendar.length == 0) {
    return (
      <div className="ui center aligned basic segment">No results found</div>
    );
  }

  const events = calendar
    .filter((entry) => entry.description != "not reserved")
    .map((entry) => {
      return {
        title: entry.description,
        location: entry.location,
        start: timeToNumber(entry.startTime),
        end: timeToNumber(entry.endTime),
        position: entry.index,
        widthDivisor: entry.widthDivisor,
        key: entry.startTime,
      };
    });

  return (
    <DayCalendar
      events={events}
      start={start}
      end={end}
      compact={compact}
      showTimeline={showTimeline}
    />
  );
};

export async function getServerSideProps(context) {
  const park = PARKS.find((p) => p.slug === context.params.slug);
  const parkId = park ? park.id : PARKS[0].id;
  const date = dateToString(new Date());

  // Fetch data from external API
  const res = await getReservationsByParkId(parkId, date);

  // Pass data to the page via props
  return { props: { initialEvents: res } };
};

const Calendar = ({initialEvents}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState(dateToString(new Date()));

  const router = useRouter();

  const parkId = React.useMemo(() => {
    const park = PARKS.find((p) => p.slug === router.query.slug);
    return park ? park.id : PARKS[0].id;
  }, [router.query.slug]);

  const [calendar, setCalendar] = React.useState<Array<CalendarEntry>>(initialEvents);

  const park: Park = React.useMemo(() => {
    return parksById[parkId];
  }, [parkId]);

  const isDateToday = useMemo(() => {
    return date == dateToString(new Date());
  }, [date]);

  const dayOfWeek = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    return d.getDay();
  }, [date]);

  const startTime = useMemo(() => {
    return courtStartTime(park, park.courts[0], dayOfWeek);
  }, [park, dayOfWeek]);

  const endTime = useMemo(() => {
    return courtEndTime(park, park.courts[0], dayOfWeek);
  }, [park]);


  React.useEffect(() => {
    if (!park) {
      setIsLoading(false);
      setCalendar([]);
      return;
    }

    getReservationsByParkId(park.id, date).then((calendars) => {
      setIsLoading(false);
      setCalendar(calendars);
    });
  }, [date, park]);

  const dropdownOptions = useMemo(() => {
    return PARKS.map((park) => ({
      key: park.id,
      text: park.name,
      value: park.id,
    }));
  }, []);

  return (
    <Layout title={`${park.name} Reservation Calendar`} selectedMenuItem="calendar" canonicalUrl={`http://zitnr.com/calendar/${park.slug}`}>
      <div className="ui container">
        <h5
          className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="calendar alternate icon"></i>
          <div className="content">
            Calendar
            <div className="sub header">Query court's reservation schedule</div>
          </div>
        </h5>

        <div className="very basic segment">
          <form className="ui small form">
            <div className="fields">
              <div className="inline field">
                <Dropdown selection options={dropdownOptions} value={park.id} onChange={(e, dropdownProps) => {
                  const parkId = dropdownProps.value;
                  if (parkId && parkId.toString() != park.id.toString()) {
                    router.push(`/calendar/${parksById[parkId.toString()].slug}`)
                    setIsLoading(true)
                  }
                }}/>
              </div>

              <div className="inline field">
                <div className="ui input">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setCalendar([]);
                      setIsLoading(true);
                    }}
                  />
                </div>
              </div>

              {!isDateToday && (
                <div className="inline field">
                  <button
                    type="button"
                    className="ui button"
                    onClick={() => {
                      const today = dateToString(new Date());

                      // Important to not use isDateToday because that value
                      // might be stale
                      if (date == today) {
                        return;
                      }

                      setDate(today);
                      setCalendar([]);
                      setIsLoading(true);
                    }}
                  >
                    Set to Today
                  </button>
                </div>
              )}
            </div>
          </form>

          <div
            className={classnames([
              "ui",
              { loading: isLoading },
              "basic segment",
            ])}
            style={{ marginTop: 0 }}
          >
            {park && (
              <DayCalendarWrapper
                compact
                calendar={calendar}
                start={timeToNumber(startTime)}
                end={endTime == "00:00:00" ? 24 : timeToNumber(endTime)}
                showTimeline={isDateToday}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;