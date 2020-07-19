// import React, { useState, Fragment } from "react";

// import { makeStyles } from "@material-ui/styles";
// import { createMuiTheme } from "@material-ui/core";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// const ExpandIcon = ({ expanded }) =>
//   expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

// export default function NestedLists() {
//   const [items, setItems] = useState([
//     {
//       name: "Messages",
//       expanded: false,
//       children: [{ name: "First Message" }, { name: "Second Message" }]
//     },
//     {
//       name: "Contacts",
//       expanded: false,
//       children: [{ name: "First Contact" }, { name: "Second Contact" }]
//     }
//   ]);

//   const onClick = index => () => {
//     const newItems = [...items];
//     const item = items[index];
//     newItems[index] = { ...item, expanded: !item.expanded };
//     setItems(newItems);
//   };

//   return (
//     <List>
//       {items.map(({ Icon, ...item }, index) => (
//         <Fragment key={index}>
//           <ListItem button onClick={onClick(index)}>
//             <ListItemText primary={item.name} />
//             <ExpandIcon expanded={item.expanded} />
//           </ListItem>
//           <Collapse in={item.expanded}>
//             {item.children.map(child => (
//               <ListItem key={child.name} button dense>
//                 <ListItemText primary={child.name} />
//               </ListItem>
//             ))}
//           </Collapse>
//         </Fragment>
//       ))}
//     </List>
//   );
// }
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Today Tasks
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};
