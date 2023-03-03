import { useSpecimen } from "slices/specimen";
import { useUIState } from "slices/UIState";
import { Event, Nodes } from "protocol/Render";
import { createNodes, createStepNodes } from "./Nodes";
import { useMemo, createContext, useContext, ReactNode, useState, useCallback } from "react";
import { NodePopup } from "components/generic/NodePopup";

export type ClickInfo = {
  node?: Event[];
  nodes?: Event[];
  point?: {
    x: number;
    y: number;
  };
  remove?: () => void;
  overlay?: any;
}

type NodesMapContextType = {
  nodes?: Nodes;        // nodes state at current step
  nodesAll?: Nodes;     // all nodes converted from eventlist
  eventsAll?: Event[];  // original eventList
  current?: Event;      // current event
  click?: ClickInfo | undefined;
  setClick?: (info: ClickInfo | undefined) => void;
}

const NodesMapContext = createContext<NodesMapContextType>({});

export const useNodesMap = () => useContext(NodesMapContext);

export function NodesMap({children}:{children: ReactNode}) {
  const [{eventList}] = useSpecimen();
  const [{step}] = useUIState();

  const [click, setClickRaw] = useState<ClickInfo>();

  const setClick = useCallback((c: ClickInfo|undefined) => {
    if (!c) {
      click?.remove?.();
    }
    setClickRaw(c);
  }, [click]);

  const nodesAll = useMemo(() => {
    if (eventList) {
      return createNodes(eventList);
    }
  }, [eventList]);
  const nodes = useMemo(() => {
    if (eventList) {
      return createStepNodes(eventList, step??0);
    }
  }, [eventList, step])
  return (
    <NodesMapContext.Provider value={{
      nodes, 
      nodesAll, 
      eventsAll:eventList, 
      current: eventList?.[step??0],
      click,
      setClick,
    }}>
      <NodePopup {...click} />
      {children}
    </NodesMapContext.Provider>
  )
}