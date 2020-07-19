// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { getResults, closure, runQueries, from } from "./makumba-query";
// import { makeStyles } from "@material-ui/core/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     maxWidth: 360
//   },
//   nested: {
//     paddingLeft: theme.spacing(4)
//   }
// }));

// const App = () => {
//   const classes = useStyles();
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = React.useState(false);

//   useEffect(() => {
//     async function getDataFirstLevel() {
//       const response = await from("Task t").map(data => (
//         <List
//           component="nav"
//           aria-labelledby="nested-list-subheader"
//           className={classes.root}
//         >
//           <ListItem>
//             <ListItemText primary={data("t.customer")} />
//             {open ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button className={classes.nested}>
//                 <ListItemText primary={"days: " + data("t.days")} />
//               </ListItem>
//               <ListItem button className={classes.nested}>
//                 <ListItemText primary={"start: " + data("t.startDate")} />
//               </ListItem>
//               <ListItem button className={classes.nested}>
//                 <ListItemText primary={"end: " + data("t.endDate")} />
//               </ListItem>
//             </List>
//           </Collapse>
//         </List>
//       ));
//       setQuery(response);
//       console.log(response);
//     }
//     getDataFirstLevel();
//   });

//   return query;
// };

// ReactDOM.render(<App />, document.getElementById("root"));

// Two Level React Rendering

import React from "react";
import usePromise from 'react-promise'
import * as ReactDOM from "react-dom";
import { Query } from "./query";
import { getResults, closure, runQueries, from } from "./makumba-query";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const response = await from("ProductionLine line").map(data => ({
      lineName: data("line.name"),
      tasks: from("Task t")
        .where("t.line=line")
        .map(data => ({
          customerName: data("t.customer"),
          end:  data("t.endDate"),
          startDate : data("t.startDate")
        }))
    }));
    console.log(response);
    this.setState({ data: response });
  }

  render() {
    return (
        <div>
          {
            this.state.data.map(elem => (
            <ul>
            <li>{elem.lineName}</li>
            <li>
              <div>
                <ul>
                  {
                    <UsePromiseSample val = {elem.tasks}/>
                  }
                </ul>
              </div>
            </li>
            </ul>
          ))
          }
        </div>
    );
  } 
}

const UsePromiseSample = (props) => {
  //console.log(props);
  const { resolved, loading, error } = usePromise(props.val);

  //console.log(resolved);


  if (loading) return <div>loading...</div>;
  if (error) return <div>error happened!</div>;
  if (!resolved) return null;

  return <div>
    { 

      props.val.then(value => {
        value.map(el => {
          el.map(newEl => {
            <ul>
            <li> {newEl.end} </li>
            <li> {newEl.startDate} </li>
            </ul>
          })
        })
      })
    }
    </div>;
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
