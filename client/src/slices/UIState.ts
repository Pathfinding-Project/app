import { makeTemplate } from "components/script-editor/makeTemplate";
import { templates } from "components/script-editor/templates";
import { values } from "lodash";
import { Feature, FeatureDescriptor } from "protocol/FeatureQuery";
import { ParamsOf } from "protocol/Message";
import { Parameters, PathfindingTask } from "protocol/SolveTask";
import { Trace, TraceEventType } from "protocol/Trace";
import { createSlice } from "./createSlice";

export type Map = Partial<
  Feature & {
    format: string;
    source?: string;
  }
>;

type InputState = {
  algorithm?: string;
  map?: Map;
  parameters?: Parameters;
};

export type Comparator = {
  key: string;
  apply: (value: number, reference: number) => boolean;
};

export type Breakpoint = {
  key: string;
  property?: string;
  reference?: number;
  condition?: Comparator;
  active?: boolean;
  type?: TraceEventType;
};

type DebugOptionsState = {
  code?: string;
  monotonicF?: boolean;
  monotonicG?: boolean;
  breakpoints?: Breakpoint[];
};

type BusyState = {
  busy?: { [K in string]: string };
};

type SpecimenState = {
  start?: number;
  end?: number;
};

export type Specimen = {
  specimen?: Trace;
  map?: string;
  error?: string;
} & Partial<ParamsOf<PathfindingTask>>;

export type UploadedTrace = FeatureDescriptor & {
  content?: Trace;
  /**
   * Uniquely identifies a trace.
   */
  key?: string;
};

export type UIState = InputState &
  DebugOptionsState &
  SpecimenState &
  BusyState;

export const [useUIState, UIStateProvider] = createSlice<
  UIState,
  Partial<UIState>
>({
  code: makeTemplate(values(templates)),
  busy: {},
});
