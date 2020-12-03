import React from "react";
import { Link } from "react-router-dom";


import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Star from "@material-ui/icons/Star";

import {
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";


export const sidebar = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <AssignmentInd />
      </ListItemIcon>
      <ListItemText primary="Customer Data" />
    </ListItem>
    <ListItem button component={Link} to="/polabintang">
      <ListItemIcon>
        <Star />
      </ListItemIcon>
      <ListItemText primary="Pola Bintang" />
    </ListItem>
  </div>
);
