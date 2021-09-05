import { h, Fragment } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useState, useMemo } from 'preact/hooks';
import { Tr, Td, Tbody } from '../../../components/Table';
import Filterable from './filterable';
import Event from '../../Event';
import { useSearchString } from '../../../hooks/useSearchString';
import { useClickOutside } from '../../../hooks/useClickOutside';

const EventsRow = memo(
  ({
    id,
    apiHost,
    start_time: startTime,
    end_time: endTime,
    scrollToRef,
    lastRowRef,
    handleFilter,
    pathname,
    limit,
    camera,
    label,
    top_score: score,
    zones,
  }) => {
    const [viewEvent, setViewEvent] = useState(null);
    const { searchString, removeDefaultSearchKeys } = useSearchString(limit);
    const searchParams = useMemo(() => new URLSearchParams(searchString), [searchString]);

    const innerRef = useClickOutside(() => {
      setViewEvent(null);
    });

    const viewEventHandler = useCallback(
      (id) => {
        //Toggle event view
        if (viewEvent === id) return setViewEvent(null);
        //Set event id to be rendered.
        setViewEvent(id);
      },
      [viewEvent]
    );

    const duration = Math.round(endTime - startTime).toFixed(0);
    const start = new Date(parseInt(startTime * 1000, 10));

    const end = new Date(parseInt(endTime * 1000, 10));
    const ref = i === events.length - 1 ? lastCellRef : undefined;
    return (
      <Fragment key={id}>
        <div className="grid items-center">
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

        {/*  <Tr data-testid={`event-${id}`} className={`${viewEvent === id ? 'border-none' : ''}`}>
              <Td className="w-40">
                <a
                  onClick={() => viewEventHandler(id)}
                  ref={ref}
                  data-start-time={startTime}
                  data-reached-end={reachedEnd}
                >
                  <img
                    ref={(el) => (scrollToRef[id] = el)}
                    width="150"
                    height="150"
                    className="cursor-pointer"
                    style="min-height: 48px; min-width: 48px;"
                    src={`${apiHost}/api/events/${id}/thumbnail.jpg`}
                  />
                </a>
              </Td>
              <Td>
                <Filterable
                  onFilter={handleFilter}
                  pathname={pathname}
                  searchParams={searchParams}
                  paramName="camera"
                  name={camera}
                />
              </Td>
              <Td>
                <Filterable
                  onFilter={handleFilter}
                  pathname={pathname}
                  searchParams={searchParams}
                  paramName="label"
                  name={label}
                />
              </Td>
              <Td>{(score * 100).toFixed(2)}%</Td>
              <Td>
                <ul>
                  {zones.map((zone) => (
                    <li>
                      <Filterable
                        onFilter={handleFilter}
                        pathname={pathname}
                        searchParams={searchString}
                        paramName="zone"
                        name={zone}
                      />
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>{start.toLocaleDateString()}</Td>
              <Td>{start.toLocaleTimeString()}</Td>
              <Td>{end.toLocaleTimeString()}</Td>
            </Tr>
            {viewEvent === id ? (
              <Tr className="border-b-1">
                <Td colSpan="8">
                  <Event eventId={id} close={() => setViewEvent(null)} scrollRef={scrollToRef} />
                </Td>
              </Tr>
            ) : null} */}
      </Fragment>
    );
  }
);

export default EventsRow;
