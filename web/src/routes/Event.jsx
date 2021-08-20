import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { route } from 'preact-router';
import ActivityIndicator from '../components/ActivityIndicator';
import Button from '../components/Button';
import Clip from '../icons/Clip';
import ArrowDown from '../icons/ArrowDropdown';
import Delete from '../icons/Delete';
import Snapshot from '../icons/Snapshot';
import Dialog from '../components/Dialog';
import Heading from '../components/Heading';
import Link from '../components/Link';
import VideoPlayer from '../components/VideoPlayer';
import { FetchStatus, useApiHost, useEvent, useDelete } from '../api';
import { Table, Thead, Tbody, Th, Tr, Td } from '../components/Table';

export default function Event({ eventId }) {
  const apiHost = useApiHost();
  const { data, status } = useEvent(eventId);
  const [showDialog, setShowDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(FetchStatus.NONE);
  const setDeleteEvent = useDelete();

  const handleClickDelete = () => {
    setShowDialog(true);
  };

  const handleDismissDeleteDialog = () => {
    setShowDialog(false);
  };

  const handleClickDeleteDialog = useCallback(async () => {
    let success;
    try {
      success = await setDeleteEvent(eventId);
      setDeleteStatus(success ? FetchStatus.LOADED : FetchStatus.ERROR);
    } catch (e) {
      setDeleteStatus(FetchStatus.ERROR);
    }

    if (success) {
      setDeleteStatus(FetchStatus.LOADED);
      setShowDialog(false);
      route('/events', true);
    }
  }, [eventId, setShowDialog, setDeleteEvent]);

  if (status !== FetchStatus.LOADED) {
    return <ActivityIndicator />;
  }

  const startime = new Date(data.start_time * 1000);
  const endtime = new Date(data.end_time * 1000);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center">
        <Heading className="flex-grow">
          {data.camera} {data.label} <span className="text-sm">{startime.toLocaleString()}</span>
        </Heading>
        <div className="space-x-4">
          <Button className="self-start" onClick={() => setShowDetails(!showDetails)} color="gray">
            <ArrowDown className="w-6" />
            {`${showDetails ? 'Hide event Details' : 'View event Details'}`}
          </Button>
          <Button className="self-start" color="red" onClick={handleClickDelete}>
            <Delete className="w-6" /> Delete event
          </Button>
        </div>
        {showDialog ? (
          <Dialog
            onDismiss={handleDismissDeleteDialog}
            title="Delete Event?"
            text={
              deleteStatus === FetchStatus.ERROR
                ? 'An error occurred, please try again.'
                : 'This event will be permanently deleted along with any related clips and snapshots'
            }
            actions={[
              deleteStatus !== FetchStatus.LOADING
                ? { text: 'Delete', color: 'red', onClick: handleClickDeleteDialog }
                : { text: 'Deleting…', color: 'red', disabled: true },
              { text: 'Cancel', onClick: handleDismissDeleteDialog },
            ]}
          />
        ) : null}
      </div>

      {showDetails ? (
        <Table class="w-full">
          <Thead>
            <Th>Key</Th>
            <Th>Value</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Camera</Td>
              <Td>
                <Link href={`/cameras/${data.camera}`}>{data.camera}</Link>
              </Td>
            </Tr>
            <Tr index={1}>
              <Td>Timeframe</Td>
              <Td>
                {startime.toLocaleString()} – {endtime.toLocaleString()}
              </Td>
            </Tr>
            <Tr>
              <Td>Score</Td>
              <Td>{(data.top_score * 100).toFixed(2)}%</Td>
            </Tr>
            <Tr index={1}>
              <Td>Zones</Td>
              <Td>{data.zones.join(', ')}</Td>
            </Tr>
          </Tbody>
        </Table>
      ) : null}

      {data.has_clip ? (
        <Fragment>
          <Heading size="lg">Clip</Heading>
          <div className="outer-max-width m-auto">
            <div className="aspect-ratio-box w-full relative">
              <div className="absolute w-full top-0 left-0">
                <VideoPlayer
                  options={{
                    sources: [
                      {
                        src: `${apiHost}/vod/event/${eventId}/index.m3u8`,
                        type: 'application/vnd.apple.mpegurl',
                      },
                    ],
                    poster: data.has_snapshot
                      ? `${apiHost}/clips/${data.camera}-${eventId}.jpg`
                      : `data:image/jpeg;base64,${data.thumbnail}`,
                  }}
                  seekOptions={{ forward: 10, back: 5 }}
                  onReady={(player) => {}}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4 justify-center">
            <Button color="blue" href={`${apiHost}/api/events/${eventId}/clip.mp4?download=true`} download>
              <Clip className="w-6" /> Download Clip
            </Button>
            <Button color="blue" href={`${apiHost}/api/events/${eventId}/snapshot.jpg?download=true`} download>
              <Snapshot className="w-6" /> Download Snapshot
            </Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Heading size="sm">{data.has_snapshot ? 'Best Image' : 'Thumbnail'}</Heading>
          <img
            src={
              data.has_snapshot
                ? `${apiHost}/clips/${data.camera}-${eventId}.jpg`
                : `data:image/jpeg;base64,${data.thumbnail}`
            }
            alt={`${data.label} at ${(data.top_score * 100).toFixed(1)}% confidence`}
          />
        </Fragment>
      )}
    </div>
  );
}
