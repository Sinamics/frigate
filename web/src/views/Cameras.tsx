import { h, FunctionalComponent, Fragment } from 'preact';
import ActivityIndicator from '../components/ActivityIndicator';
import Card from '../components/Card';
import CameraImage from '../components/CameraImage';
import ClipIcon from '../icons/Clip';
import MotionIcon from '../icons/Motion';
import SnapshotIcon from '../icons/Snapshot';
import { useDetectState, useRecordingsState, useSnapshotsState } from '../api/mqtt';
import { useConfig, FetchStatus } from '../api';
import { useMemo } from 'preact/hooks';

interface ICamera {
  path: string;
  default: boolean;
}

const Cameras: FunctionalComponent<ICamera> = () => {
  const { data: config, status } = useConfig();
  const [firstcam, firstConfig] = Object.entries(config.cameras)[1];

  return status !== FetchStatus.LOADED ? (
    <ActivityIndicator />
  ) : (
    <Fragment>
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4">
        <div className="row-span-3 col-span-2">
          <Camera name={firstcam} conf={firstConfig} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 row-auto col-auto gap-4">
          {Object.entries(config.cameras).map(([camera, conf]) => (
            <div className="">
              <Camera name={camera} conf={conf} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default Cameras;

interface ICameras {
  name: string;
  conf: any;
}

const Camera: FunctionalComponent<ICameras> = ({ name, conf }) => {
  const { payload: detectValue, send: sendDetect } = useDetectState(name);
  const { payload: recordValue, send: sendRecordings } = useRecordingsState(name);
  const { payload: snapshotValue, send: sendSnapshots } = useSnapshotsState(name);
  const href = `/cameras/${name}`;
  const buttons = useMemo(() => {
    const result = [{ name: 'Events', href: `/events?camera=${name}` }];
    if (conf.record.enabled) {
      result.push({ name: 'Recordings', href: `/recording/${name}` });
    }
    return result;
  }, [name, conf.record.enabled]);
  const icons = useMemo(
    () => [
      {
        name: `Toggle detect ${detectValue === 'ON' ? 'off' : 'on'}`,
        icon: MotionIcon,
        color: detectValue === 'ON' ? 'blue' : 'gray',
        onClick: () => {
          sendDetect(detectValue === 'ON' ? 'OFF' : 'ON');
        },
      },
      {
        name: `Toggle recordings ${recordValue === 'ON' ? 'off' : 'on'}`,
        icon: ClipIcon,
        color: recordValue === 'ON' ? 'blue' : 'gray',
        onClick: () => {
          sendRecordings(recordValue === 'ON' ? 'OFF' : 'ON');
        },
      },
      {
        name: `Toggle snapshots ${snapshotValue === 'ON' ? 'off' : 'on'}`,
        icon: SnapshotIcon,
        color: snapshotValue === 'ON' ? 'blue' : 'gray',
        onClick: () => {
          sendSnapshots(snapshotValue === 'ON' ? 'OFF' : 'ON');
        },
      },
    ],
    [detectValue, sendDetect, recordValue, sendRecordings, snapshotValue, sendSnapshots]
  );

  return (
    <Card buttons={buttons} href={href} header={name} icons={icons} media={<CameraImage camera={name} stretch />} />
  );
};
