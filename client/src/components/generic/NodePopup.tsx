import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { ClickInfo } from "components/render/renderer/generic/NodesMap";

export type NodePopupProps = ClickInfo;

export function NodePopup(props: NodePopupProps) {
  return props.point ? (
    <>
      <Paper
        sx={{
          width: 200,
          maxWidth: "100%",
          position: "absolute",
          zIndex: "tooltip",
          top: props.point?.y ?? 0,
          left: props.point?.x,
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Event {props.node?.[0].id}
            </ListSubheader>
          }
        >
          {Object.entries(props.node?.[0] ?? {}).map((eventProp) => {
            return (
              <ListItem
                sx={{ paddingTop: 0, paddingBottom: 0 }}
                key={eventProp[0]}
              >
                <ListItemText sx={{ fontWeight: "medium" }}>
                  {eventProp[0]}
                </ListItemText>
                <Typography>{eventProp[1]}</Typography>
              </ListItem>
            );
          })}
          <Divider />
          <ListSubheader>Other States</ListSubheader>
          {props.nodes?.map((event) => {
            return (
              <ListItem
                component="div"
                disablePadding
                key={`${event.type}${event.pId}${event.id}`}
              >
                <ListItemButton
                  sx={{ paddingTop: 0, paddingBottom: 0 }}
                  onClick={() => {}}
                >
                  <ListItemText
                    primary={`${event.type}`}
                    secondary={`${event.id}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  ) : (
    <></>
  );
}