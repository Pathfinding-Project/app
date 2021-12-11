import { blueGrey } from "@material-ui/core/colors";
import { getColor, hex } from "../colors";
import { NodeOptionsMapper as Options } from "../planar-renderer/Draw";

export const shadowColor = hex(blueGrey["100"]);
export const color = hex(blueGrey["500"]);

export const shadowOptions: Options<"cx" | "cy" | "x1" | "y1" | "x2" | "y2"> = (
  {
    variables: { cx = 0, cy = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, ...v } = {},
  } = {},
  s
) => ({
  ...v,
  a: s?.to?.({ x: cx, y: cy }),
  b: s?.to?.({ x: x1, y: y1 }),
  c: s?.to?.({ x: x2, y: y2 }),
  color: shadowColor,
  fillAlpha: 0,
});

export const progressOptions: Options<"cx" | "cy" | "x1" | "y1" | "x2" | "y2"> =
  (
    {
      type,
      variables: { cx = 0, cy = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, ...v } = {},
    } = {},
    s
  ) => ({
    ...v,
    a: s?.to?.({ x: cx, y: cy }),
    b: s?.to?.({ x: x1, y: y1 }),
    c: s?.to?.({ x: x2, y: y2 }),
    color: getColor(type),
    fill: color,
    fillAlpha: 0.08,
  });