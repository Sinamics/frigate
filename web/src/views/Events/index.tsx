import { h, Fragment } from 'preact';
import ActivityIndicator from '../../components/ActivityIndicator';
import Link from '../../components/Link';
import Select from '../../components/Select';
import produce from 'immer';
import { route } from 'preact-router';
import { useIntersectionObserver } from '../../hooks';
import { useApiHost, useConfig, useEvents } from '../../api';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'preact/hooks';
// import Filterable from './components/filterable';
import { reducer } from './reducer';
import Filters from './components/filters';
import Filter from './components/filter';
import PlayOnHover from './playOnHover';

const API_LIMIT = 25;

const initialState = Object.freeze({ events: [], reachedEnd: false, searchStrings: {}, deleted: 0 });

const defaultSearchString = (limit) => `include_thumbnails=0&limit=${limit}`;
function removeDefaultSearchKeys(searchParams) {
  searchParams.delete('limit');
  searchParams.delete('include_thumbnails');
  searchParams.delete('before');
}

export default function Events({ path: pathname, limit = API_LIMIT } = {}) {
  const apiHost = useApiHost();
  const [{ events, reachedEnd, searchStrings, deleted }, dispatch] = useReducer(reducer, initialState);
  const { searchParams: initialSearchParams } = new URL(window.location);
  const [viewEvent, setViewEvent] = useState(null);
  const [onEventHover, setOnEventHover] = useState({});
  const [searchString, setSearchString] = useState(`${defaultSearchString(limit)}&${initialSearchParams.toString()}`);
  const { data, status, deletedId } = useEvents(searchString);

  const scrollToRef = {};
  useEffect(() => {
    if (data && !(searchString in searchStrings)) {
      dispatch({ type: 'APPEND_EVENTS', payload: data, meta: { searchString } });
    }

    if (data && Array.isArray(data) && data.length + deleted < limit) {
      dispatch({ type: 'REACHED_END', meta: { searchString } });
    }

    if (deletedId) {
      dispatch({ type: 'DELETE_EVENT', deletedId });
    }
  }, [data, limit, searchString, searchStrings, deleted, deletedId]);

  const [entry, setIntersectNode] = useIntersectionObserver();

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      const { startTime } = entry.target.dataset;
      const { searchParams } = new URL(window.location);
      searchParams.set('before', parseFloat(startTime) - 0.0001);

      setSearchString(`${defaultSearchString(limit)}&${searchParams.toString()}`);
    }
  }, [entry, limit]);

  const lastCellRef = useCallback(
    (node) => {
      if (node !== null && !reachedEnd) {
        setIntersectNode(node);
      }
    },
    [setIntersectNode, reachedEnd]
  );

  const handleFilter = useCallback(
    (searchParams) => {
      dispatch({ type: 'RESET' });
      removeDefaultSearchKeys(searchParams);
      setSearchString(`${defaultSearchString(limit)}&${searchParams.toString()}`);
      route(`${pathname}?${searchParams.toString()}`);
    },
    [limit, pathname, setSearchString]
  );

  const viewEventHandler = (id) => {
    //Toggle event view
    if (viewEvent === id) return setViewEvent(null);

    //Set event id to be rendered.
    setViewEvent(id);
  };
  const onMouseEnter = (e) => {
    setOnEventHover({ id: null });
    setOnEventHover({ id: e.currentTarget.id });
  };
  const searchParams = useMemo(() => new URLSearchParams(searchString), [searchString]);
  console.log(viewEvent);
  return (
    <Fragment>
      <p className="text-center text-sm font-bold mt-3">Events</p>
      <div class="z-10 ">
        <button class="pl-16 bg-gray-800 flex items-center block p-0 w-full bg-white bg-gray-100 rounded-md w-44 text-xs">
          <span class="mr-2">Select Camera</span>
          <svg
            class="w-5 h-5 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="h-2/4 overflow-y-scroll overflow-x-hidden mx-1">
        {events.map(({ camera, id, label, start_time: startTime, end_time: endTime, top_score: score, zones }, i) => {
          const duration = Math.round(endTime - startTime).toFixed(0);
          const start = new Date(parseInt(startTime * 1000, 10));

          const end = new Date(parseInt(endTime * 1000, 10));
          const ref = i === events.length - 1 ? lastCellRef : undefined;
          return (
            <Fragment key={id}>
              {onEventHover.id === id ? <PlayOnHover apiHost={apiHost} onEventHover={onEventHover} /> : null}
              <div className="grid items-center" id={id} onMouseEnter={onMouseEnter}>
                <div className="p-1 flex items-center space-x-2 rounded-lg shadow-md hover:scale-105 transition transform duration-100 cursor-pointer">
                  <div>
                    <img
                      ref={(el) => (scrollToRef[id] = el)}
                      width="55"
                      height="55"
                      className="cursor-pointer"
                      style="min-height: 48px; min-width: 48px;"
                      src={`${apiHost}/api/events/${id}/thumbnail.jpg`}
                    />
                  </div>
                  <div>
                    <h1 className="text-xs font-bold mb-0">{label}</h1>
                    <p className="w-full text-xs">{camera}</p>
                    <p className="w-full text-xs">{`Date: ${start.toLocaleDateString()}`}</p>
                    <p className="w-full text-xs">{`Duration: ${duration} sec`}</p>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
