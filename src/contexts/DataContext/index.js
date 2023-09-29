import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const jsonData = await api.loadData();

      // Find the event with the maximum date
      if (jsonData?.events?.length > 0) {
        let latestEvent = jsonData.events[0];
        jsonData.events.map((event) => {
          const currentDate = new Date(event.date);
          const latestDate = new Date(latestEvent.date);
          if (currentDate > latestDate) {
            latestEvent = event;
          }
          return event;
        });

        setLast(latestEvent);
      }

      setData(jsonData);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;