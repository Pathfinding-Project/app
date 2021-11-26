import { Transport } from "client/Transport";
import { Label } from "components/generic/Label";
import { useSnackbar } from "components/generic/Snackbar";
import { getRenderer } from "components/specimen-renderer/getRenderer";
import { useConnectionResolver } from "hooks/useConnectionResolver";
import { useMapContent } from "hooks/useMapContent";
import { find } from "lodash";
import { ParamsOf } from "protocol/Message";
import { PathfindingTask } from "protocol/SolveTask";
import { useAsyncAbortable as useAsync } from "react-async-hook";
import { useFeatures } from "slices/features";
import { useLoadingState } from "slices/loading";
import { useSpecimen } from "slices/specimen";
import { useUIState } from "slices/UIState";
import { hashAsync as hash } from "workers/async";

async function solve(
  map: string,
  params: Omit<ParamsOf<PathfindingTask>, "mapURI">,
  call: Transport["call"]
) {
  if (map) {
    for (const mapURI of [
      `hash:${await hash(map)}`,
      `map:${encodeURIComponent(map)}`,
    ] as const) {
      const p = { ...params, mapURI };
      const specimen = await call("solve/pathfinding", p);
      if (specimen) return { ...p, specimen, map };
    }
  }
}

export function SpecimenService() {
  const usingLoadingState = useLoadingState("specimen");
  const notify = useSnackbar();
  const [{ formats: format }] = useFeatures();
  const [{ algorithm, start, end }, setUIState] = useUIState();
  const resolve = useConnectionResolver();
  const [, setSpecimen] = useSpecimen();

  const { result: map } = useMapContent();

  useAsync(
    (signal) =>
      usingLoadingState(async () => {
        if (map?.format && map?.content) {
          const [, defaults] = getRenderer(map.format);
          try {
            const entry = find(format, { id: map.format });
            if (entry) {
              const connection = resolve({ url: entry.source });
              if (connection) {
                const solution = await solve(
                  map.content,
                  {
                    algorithm,
                    format: map.format,
                    instances: [
                      {
                        end: end ?? defaults(map.content)?.end,
                        start: start ?? defaults(map.content)?.start,
                      },
                    ],
                  },
                  connection.call
                );
                if (solution && !signal.aborted) {
                  setSpecimen(solution);
                  setUIState({ step: 0, playback: "paused", breakpoints: [] });
                  notify(
                    <Label
                      primary="Solution generated."
                      secondary={`${solution.specimen.eventList?.length} steps`}
                    />
                  );
                }
              }
            } else
              notify(
                `No solver is available for the map format (${map.format}).`
              );
          } catch (e) {
            notify(`${e}`);
          }
        }
      }),
    [
      algorithm,
      start,
      end,
      map,
      notify,
      usingLoadingState,
      format,
      resolve,
      setSpecimen,
    ]
  );

  return <></>;
}
