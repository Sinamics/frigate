import { h } from 'preact';
import Heading from '../components/Heading';
import ActivityIndicator from '../components/ActivityIndicator';
import { useCallback, useEffect, useState } from 'preact/hooks';
import ButtonsTabbed from '../components/ButtonsTabbed';
import useSWR from 'swr';
import Button from '../components/Button';

export default function Logs() {
  const [logService, setLogService] = useState('frigate');
  const [logs, setLogs] = useState('frigate');

  const { data: frigateLogs, isLoading: frigateLoading } = useSWR('logs/frigate');
  const { data: go2rtcLogs, isLoading: go2rtcLoading } = useSWR('logs/go2rtc');
  const { data: nginxLogs, isLoading: nginxLoading } = useSWR('logs/nginx');

  const handleCopyLogs = useCallback(() => {
    async function copy() {
      await window.navigator.clipboard.writeText(logs);
    }
    copy();
  }, [logs]);

  useEffect(() => {
    switch (logService) {
      case 'frigate':
        setLogs(frigateLogs);
        break;
      case 'go2rtc':
        setLogs(go2rtcLogs);
        break;
      case 'nginx':
        setLogs(nginxLogs);
        break;
    }
  }, [frigateLogs, go2rtcLogs, nginxLogs, logService, setLogs]);

  return frigateLoading || go2rtcLoading || nginxLoading ? (
    <div className="h-screen flex flex-grow-1 justify-center items-center">
      <ActivityIndicator />
    </div>
  ) : (
    <>
      <div className="space-y-4 p-2 px-4 ">
        <Heading>Logs</Heading>

        <ButtonsTabbed
          viewModes={['frigate', 'go2rtc', 'nginx']}
          currentViewMode={logService}
          setViewMode={setLogService}
        />

        <Button className="" onClick={handleCopyLogs}>
          Copy to Clipboard
        </Button>
      </div>
      <div className="overflow-y-auto h-full pb-10 font-mono text-sm text-gray-900 dark:text-gray-100 rounded bg-gray-100 dark:bg-gray-800 p-2 whitespace-pre-wrap">
        {logs}
      </div>
    </>
  );
}
