import {
  PlaceOutlined as DestinationIcon,
  TripOriginOutlined as StartIcon,
} from "@mui/icons-material";
import { MapPicker } from "components/app-bar/Input";
import { NodeList } from "components/render/renderer/generic/NodeList";
import { getParser } from "components/renderer";
import { ParsedMap } from "components/renderer/map-parser/Parser";
import { useEffectWhen } from "hooks/useEffectWhen";
import { useMapContent } from "hooks/useMapContent";
import { useParsedMap } from "hooks/useParsedMap";
import { filter, isUndefined, reduce, round, set, startCase } from "lodash";
import { produce, withProduce } from "produce";
import { useMemo } from "react";
import { Map } from "slices/UIState";
import { useLayer, Layer } from "slices/layers";
import { LayerSource, inferLayerName } from "./LayerSource";
import { Option } from "./Option";
import { QueryLayerData } from "./queryLayerSource";

export type MapLayerData = {
  map?: Map;
  parsedMap?: ParsedMap;
};

export type MapLayer = Layer<MapLayerData>;

export const mapLayerSource: LayerSource<"map", MapLayerData> = {
  key: "map",
  inferName: (layer) =>
    layer?.source?.map
      ? `${layer.source.map.name} (${startCase(layer.source.map.format)})`
      : "Untitled Map",
  editor: withProduce(({ value, produce }) => {
    return (
      <>
        <Option
          label="Source"
          content={
            <MapPicker
              value={value?.source?.map}
              onChange={(v) => produce((d) => set(d, "source.map", v))}
            />
          }
        />
      </>
    );
  }),
  renderer: ({ layer }) => {
    const { nodes } = layer?.source?.parsedMap ?? {};
    const nodes2 = useMemo(() => [nodes ?? []], [nodes]);
    return <NodeList nodes={nodes2} />;
  },
  steps: ({ children }) => <>{children?.([])}</>,
  service: withProduce(({ value, produce }) => {
    const { result: mapContent } = useMapContent(value?.source?.map);
    const { result: parsedMap } = useParsedMap(mapContent);
    useEffectWhen(
      () => void produce((v) => set(v, "source.parsedMap", parsedMap)),
      [parsedMap, produce],
      [parsedMap]
    );
    return <></>;
  }),
  getSelectionInfo: ({ children, event, layer: key }) => {
    const { layer, setLayer, layers } = useLayer<MapLayerData>(key);
    const { parsedMap } = layer?.source ?? {};
    const { point, node } = useMemo(() => {
      if (parsedMap && event) {
        const hydratedMap = getParser(layer?.source?.map?.format)?.hydrate?.(
          parsedMap
        );
        if (hydratedMap) {
          const point = event?.world && hydratedMap.snap(event.world);
          if (point) {
            const node = event?.world && hydratedMap.nodeAt(point);
            return { point, node };
          }
        }
      }
      return {};
    }, [parsedMap, event]);
    const menu = useMemo(() => {
      const filteredLayers = filter(layers, {
        source: { type: "query" },
      }) as Layer<QueryLayerData>[];
      return {
        ...(layer &&
          point &&
          !isUndefined(node) && {
            [layer.key]: {
              primary: inferLayerName(layer),
              items: {
                point: {
                  primary: "Point",
                  secondary: `(${round(point.x, 2)}, ${round(point.y, 2)})`,
                },
                ...reduce(
                  filteredLayers,
                  (prev, next) => ({
                    ...prev,
                    [`${next.key}-a`]: {
                      primary: `Set as source`,
                      secondary: inferLayerName(next),
                      action: () =>
                        setLayer(
                          produce(layer, (l) => {
                            set(l, "source.start", node);
                            set(l, "source.query", undefined);
                            set(l, "source.mapLayerKey", layer.key);
                            set(l, "source.trace", undefined);
                          })
                        ),
                      icon: <StartIcon sx={{ transform: "scale(0.5)" }} />,
                    },
                    [`${next.key}-b`]: {
                      primary: `Set as destination`,
                      secondary: inferLayerName(next),
                      action: () =>
                        setLayer(
                          produce(layer, (l) => {
                            set(l, "source.end", node);
                            set(l, "source.query", undefined);
                            set(l, "source.mapLayerKey", layer.key);
                            set(l, "source.trace", undefined);
                          })
                        ),
                      icon: <DestinationIcon />,
                    },
                  }),
                  {}
                ),
              },
            },
          }),
      };
    }, [point, node, layer, layers, setLayer]);
    return <>{children?.(menu)}</>;
  },
};
