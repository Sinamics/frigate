import { h, Fragment } from 'preact';
import VideoPlayer from '../../components/VideoPlayer';

const playOnHover = ({ apiHost, onEventHover }) => {
  if (!onEventHover) return null;
  console.log(onEventHover);
  return (
    <div className="absolute z-50 left-64 top-64 w-96">
      <VideoPlayer
        options={{
          autoplay: true,
          bigPlayButton: false,
          //   controlBar: false,
          sources: [
            {
              src: `${apiHost}/vod/event/${onEventHover.id}/index.m3u8`,
              type: 'application/vnd.apple.mpegurl',
            },
          ],
        }}
        seekOptions={{ forward: 10, back: 5 }}
        onReady={() => {}}
      />
    </div>
  );
};

export default playOnHover;
