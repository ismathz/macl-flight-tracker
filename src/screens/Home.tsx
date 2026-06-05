import { useState } from "react";
import { useFlights } from "../api";
import DirectionSwitcher from "../components/DirectionSwitcher";
import FlightCard from "../components/FlightCard";
import FlightCardSkeleton from "../components/FlightCardSkeleton";
import SearchField from "../components/SearchField";
import { Button, GridList, GridListItem } from "react-aria-components";
import { ArrivalStatus, DepartureStatus, Flight } from "../lib/types";
import StatusFilter from "../components/StatusFilter";
import FlightDetails from "../components/FlightDetails";
import { Moon, Sun } from "@phosphor-icons/react";
import useDebounce from "../lib/hooks/useDebounce";
import { useThemeStore } from "../store/themeStore";

const Home = () => {
  const [direction, setDirection] = useState<"arrival" | "departure">(
    "arrival"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [status, setStatus] = useState<ArrivalStatus | DepartureStatus | "">(
    ""
  );

  const { data: flights, isLoading } = useFlights({
    direction,
    search: debouncedSearchTerm,
    status,
  });

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isFlightDetailsOpen, setIsFlightDetailsOpen] = useState(false);

  const { toggleTheme, isDarkMode } = useThemeStore();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-text-base text-xl">Flights</h1>
        <div className="flex justify-end mb-4">
          <Button
            onPress={() => toggleTheme()}
            className="px-2 py-1 rounded-lg bg-bg-base border border-border-base text-text-base hover:bg-bg-subtle cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      <DirectionSwitcher
        value={direction}
        onChange={(value) => {
          setDirection(value);
          setStatus("");
        }}
      />

      <SearchField
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        placeholder="Search flights, destinations, airlines"
      />
      <StatusFilter
        value={status}
        onChange={(value: ArrivalStatus | DepartureStatus | "") =>
          setStatus(value)
        }
        direction={direction}
      />

      {isLoading ? (
        <div
          className="space-y-2"
          role="status"
          aria-busy="true"
          aria-label="Loading flights"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <FlightCardSkeleton key={index} />
          ))}
        </div>
      ) : !flights?.length ? (
        <div className="p-4 text-text-subtle">No flights found</div>
      ) : (
        <GridList aria-label="Flights" className="space-y-2">
          {flights.map((flight) => (
            <GridListItem
              key={flight.id}
              onAction={() => {
                setSelectedFlight(flight);
                setIsFlightDetailsOpen(true);
              }}
              className="cursor-pointer rounded-lg focus:outline-border-active"
              aria-label={`Flight ${flight.flightNumber}`}
            >
              <FlightCard flight={flight} />
            </GridListItem>
          ))}
        </GridList>
      )}
      {selectedFlight && (
        <FlightDetails
          isOpen={isFlightDetailsOpen}
          flight={selectedFlight!}
          onOpenChange={() => setIsFlightDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
