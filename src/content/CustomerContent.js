import clsx from "clsx";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, withRouter } from "react-router-dom";
import { useStyles } from "../style/ContentStyle";
import {
  Table,
  Snackbar,
  SnackbarContent,
  TableBody,
  TableCell,
  TableHead,
  Divider,
  TableRow,
  IconButton,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

import AddCustomer from './AddCustomer';

import { connect } from "react-redux";
import { getCustomer } from "../store/actions/actCustomers";


const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

function SnackbarAlert(props) {
  const classes = useStyles();
  const { className, message, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
    />
  );
}


function CustomerContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showCustomer, setShowCustomer] = useState([]);
  const [clickOpen, setClickOpen] = React.useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [validate, setValidate] = useState("");
  const [success, setSuccess] = useState("error");

  const fetchDataCustomer = async () => {
    const result = await props.dispatch(getCustomer())
        setShowCustomer(result.value.data.data);
  };

  useEffect(() => {
    fetchDataCustomer();
  });


  const deleteCustomer = (e) => {
      axios.delete(`http://127.0.0.1:8000/customer/${clickOpen}`, {
      headers: {
        'Access-Control-Allow-Origin': true,
      }
    })
      .then((result) => {
        if (result.data.status !== 400) {
        setValidate(result.data.data);
        setSuccess("success");
        setShowStatus(true);
        setTimeout(() => {
            props.history.push("/CustomerContent");
        }, 1000);
        handleClose();
        fetchDataCustomer();
        } else {
        setValidate(result.data.data);
        setShowStatus(true);
        }
      })
      .catch((error) => setShowStatus(false));
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setClickOpen(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowStatus(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showStatus}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarAlert
          variant={success}
          className={classes.margin}
          message={validate}
        />
      </Snackbar>

      
      <AddCustomer />
      <h2>Data Customer</h2>
      <Divider />
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nama</TableCell>
              <TableCell align="center">NO HP</TableCell>
              <TableCell align="center">Alamat</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">KTP</TableCell>
              <TableCell align="center">PIC Name</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>            
          </TableHead>

          {showCustomer.map((data, index) => {
            return (
            <TableBody>
              <TableRow key={index}>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.mobile}</TableCell>
                <TableCell align="center">{data.address}</TableCell>
                <TableCell align="center">{data.email}</TableCell>
                <TableCell align="center">
                  <Avatar src={data.ktp} />
                </TableCell>
                <TableCell align="center">{data.pic_name}</TableCell>
                <TableCell align="center">
                    <IconButton onClick={()=>handleClickOpen(data.id)} className={classes.button} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <Link to={"/customercontent/" + data.id}>
                    <IconButton className={classes.button} aria-label="delete">
                      <EditIcon />
                    </IconButton>
                    </Link>
                  </TableCell>
              </TableRow>
            </TableBody>
            )
          })}

          
        </Table>

        {/* --- MODAL DELETE --- */}
        <Dialog
          outline="none"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Data Customer"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure to Delete This Data
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={deleteCustomer} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    response: state.redCustomer.viewCustomer,
  };
};

export default withRouter(connect(mapStateToProps)(CustomerContent));
