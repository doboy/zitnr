import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import classnames from "classnames";
import { useRouter } from "next/router";

import {
  parksById,
  Park,
  dateToString,
  MillerPark,
  GreenLakeParkEast,
  BeaconHillPlayfield,
  MountBakerPark,
  BitterLakePlayfield,
  RainierBeachPlayfield,
  MagnoliaPark,
  GreenLakeParkWest,
  LowerWoodlandPlayfield,
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
} from "zitnr-utils";

const MAIN_PARKS = [
  MillerPark,
  GreenLakeParkEast,
  BeaconHillPlayfield,
  MountBakerPark,
  BitterLakePlayfield,
  RainierBeachPlayfield,
  MagnoliaPark,
  GreenLakeParkWest,
  LowerWoodlandPlayfield,
];

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
].sort((a, b) => a.name.localeCompare(b.name));

export const PARKS: Park[] = [...MAIN_PARKS, ...OTHER_PARKS];

import { CalendarEntry } from "../../types";
import { DayCalendar } from "../../components/DayCalendar";
import { timeToNumber } from "../../utils/timeToNumber";
import { getReservationsByParkId } from "../../utils/getReservationsByParkId";
import { Icon, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { NearbyParks, NearbyPark } from "../../components/NearbyParks";
import { calculateDistanceBetweenCoordsInMiles } from "../../utils/calculateDistanceBetweenCoordsInMiles";
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

const ParkDropdown = ({
  options,
  value,
  onChange,
}: {
  options: { key: number; text: string; value: number }[];
  value: number;
  onChange: (value: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedText = options.find((o) => o.value === value)?.text ?? "";

  const filtered = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.text.toLowerCase().includes(lower));
  }, [options, search]);

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className={classnames("ui selection search dropdown", {
        "active visible": open,
      })}
      onClick={() => {
        if (!open) {
          setOpen(true);
        }
      }}
    >
      <input
        ref={searchRef}
        className="search"
        autoComplete="off"
        tabIndex={0}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            close();
          }
        }}
      />
      <div className={classnames("text", { filtered: search })}>
        {selectedText}
      </div>
      <i className="dropdown icon" />
      {open && (
        <div className="menu transition visible" style={{ display: "block" }}>
          {filtered.map((option) => (
            <div
              key={option.key}
              className={classnames("item", {
                active: option.value === value,
              })}
              onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
                close();
              }}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NUM_NEARBY = 4;

function getNearbyParks(park: Park): {
  pickleball: NearbyPark[];
  tennis: NearbyPark[];
} {
  if (!park.location) return { pickleball: [], tennis: [] };

  const all = PARKS.filter((p) => p.id !== park.id && p.location)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      tennisCourtsCount: p.tennisCourtsCount,
      pickleballCourtsCount: p.pickleballCourtsCount,
      distance: calculateDistanceBetweenCoordsInMiles(
        park.location!.latitude,
        park.location!.longitude,
        p.location!.latitude,
        p.location!.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  return {
    pickleball: all
      .filter((p) => p.pickleballCourtsCount > 0)
      .slice(0, NUM_NEARBY),
    tennis: all
      .filter((p) => p.pickleballCourtsCount === 0)
      .slice(0, NUM_NEARBY),
  };
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;

  if (slug.endsWith(".")) {
    return {
      redirect: {
        destination: `/calendar/${slug.replace(/\.+$/, "")}`,
        permanent: true,
      },
    };
  }

  const park = PARKS.find((p) => p.slug === slug);
  const resolvedPark = park ?? PARKS[0];
  const date = dateToString(new Date());

  const res = await getReservationsByParkId(resolvedPark.id, date);
  const nearbyParks = getNearbyParks(resolvedPark);

  return { props: { initialEvents: res, nearbyParks } };
}

const Calendar = ({
  initialEvents,
  nearbyParks,
}: {
  initialEvents: any;
  nearbyParks: { pickleball: NearbyPark[]; tennis: NearbyPark[] };
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState(dateToString(new Date()));

  const router = useRouter();

  const parkId = React.useMemo(() => {
    const park = PARKS.find((p) => p.slug === router.query.slug);
    return park ? park.id : PARKS[0].id;
  }, [router.query.slug]);

  const [calendar, setCalendar] =
    React.useState<Array<CalendarEntry>>(initialEvents);

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

  const showMessage = React.useMemo(() => {
    return park.id == MillerPark.id;
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
    const pinned = [
      MillerPark.id,
      GreenLakeParkEast.id,
      BeaconHillPlayfield.id,
    ];
    return [...PARKS]
      .sort((a, b) => {
        const aPin = pinned.indexOf(a.id);
        const bPin = pinned.indexOf(b.id);
        if (aPin !== -1 && bPin !== -1) return aPin - bPin;
        if (aPin !== -1) return -1;
        if (bPin !== -1) return 1;
        const aHasPb = a.pickleballCourtsCount > 0;
        const bHasPb = b.pickleballCourtsCount > 0;
        if (aHasPb !== bHasPb) return aHasPb ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .map((park) => ({
        key: park.id,
        text:
          park.pickleballCourtsCount === 0
            ? `${park.name} (Tennis only)`
            : park.name,
        value: park.id,
      }));
  }, []);

  return (
    <Layout
      title={`${park.name} Reservation Calendar`}
      selectedMenuItem="calendar"
      canonicalUrl={`https://www.zitnr.com/calendar/${park.slug}`}
    >
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

        {park.address && (
          <div style={{ marginBottom: ".5rem", color: "gray" }}>
            <i className="map marker alternate icon"></i>
            {park.address}
          </div>
        )}
        <div style={{ marginBottom: ".5rem", color: "gray" }}>
          {park.pickleballCourtsCount > 0
            ? `${park.pickleballCourtsCount} pickleball court${park.pickleballCourtsCount !== 1 ? "s" : ""}`
            : `${park.tennisCourtsCount} tennis court${park.tennisCourtsCount !== 1 ? "s" : ""}`}
        </div>

        <div className="very basic segment">
          <form className="ui small form">
            <div className="fields">
              <div className="inline field">
                <ParkDropdown
                  options={dropdownOptions}
                  value={park.id}
                  onChange={(parkId) => {
                    if (parkId !== park.id) {
                      window.umami?.track("park-change", {
                        from: park.name,
                        to: parksById[parkId].name,
                      });
                      router.push(`/calendar/${parksById[parkId].slug}`);
                      setIsLoading(true);
                    }
                  }}
                />
              </div>

              <div className="inline field">
                <div className="ui input">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      window.umami?.track("date-change", {
                        park: park.name,
                        date: e.target.value,
                      });
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

          {showMessage && (
            <div className="ui visible green message">
              <p style={{ marginTop: 0 }}>
                Open play reservations starts on May 11th!{" "}
                <a href="/donate">Donate</a> to keep the reservations going!
              </p>
            </div>
          )}

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

          <Message info style={{ textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src="/whats-app-qr.png" alt="Join the Miller Park WhatsApp group" className="ui small image" />
              <div>Join the Miller Park WhatsApp group</div>
            </div>
          </Message>
        </div>

        <div className="ui basic segment">
          <NearbyParks
            pickleball={nearbyParks.pickleball}
            tennis={nearbyParks.tennis}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
