import { getClient } from "client/getClient";
import {
  SnackbarLabel as Label,
  useSnackbar,
} from "components/generic/Snackbar";
import { getRenderer } from "components/specimen-renderer/getRenderer";
import { ParamsOf } from "protocol/Message";
import { PathfindingTask } from "protocol/SolveTask";
import { useAsyncAbortable as useAsync } from "react-async-hook";
import { useLoading } from "slices/loading";
import { useSpecimen } from "slices/specimen";
import { useUIState } from "slices/UIState";

async function getMap(map: string) {
  const client = await getClient();
  return (await client.call("features/map", { id: map }))?.content;
}

export function SpecimenService() {
  const notify = useSnackbar();
  const [, setLoading] = useLoading();
  const [, setSpecimen] = useSpecimen();
  const [{ algorithm, map, start, end }, setUIState] = useUIState();

  useAsync(
    async (signal) => {
      setLoading({ specimen: true });
      if (algorithm && map?.id && map?.type) {
        const mapURI = await getMap(map.id);
        if (mapURI) {
          const client = await getClient();
          const [, defaults] = getRenderer(map.type);

          const params: ParamsOf<PathfindingTask> = {
            algorithm,
            end: end ?? defaults(mapURI)?.end,
            start: start ?? defaults(mapURI)?.start,
            mapType: map?.type,
            mapURI,
          };

          try {
            const specimen = await client.call("solve/pathfinding", params);
            if (!signal.aborted) {
              setSpecimen({ specimen, ...params });
              setUIState({ step: 0, playback: "paused", breakpoints: [] });
              notify(
                <Label
                  primary="Solution generated."
                  secondary={`${specimen?.eventList?.length} steps`}
                />
              );
            }
          } catch (e) {
            notify(`${e}`);
          }
        }
      }
      setLoading({ specimen: false });
    },
    [algorithm, start, end, map?.id, map?.type, getClient, setLoading, notify]
  );

  return <></>;
}
