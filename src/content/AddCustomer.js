import clsx from "clsx";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import { useStyles } from "../style/StyleAdd";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";

import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { connect } from "react-redux";
import { postCustomer } from "../store/actions/actCustomers";

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

function AddCustomer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [validate, setValidate] = useState("");
  const [success, setSuccess] = useState("error");

  const initialFormState = {
    name: "",
    mobile: "",
    address: "",
    email: "",
    ktp: "",
    pic_name: "",
  };
  const [saveCustomer, setSaveCustomer] = useState(initialFormState);

  const addCustomer = (e) => {
    e.preventDefault();
    props
      .dispatch(postCustomer(saveCustomer))
      .then((result) => {
        if (result.value.data.status !== 400) {
        setValidate(result.value.data.data);
        setSuccess("success");
        setShowStatus(true);
        handleClose();
        setTimeout(() => {
            props.history.push("/");
        }, 1000);
        } else {
        setValidate(result.value.data.data);
        setShowStatus(true);
        }
      })
      .catch((error) => setShowStatus(false));
  };

  
  const onChangeSaveCustomer = (e) => {
    e.persist();
    setSaveCustomer({ ...saveCustomer, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowStatus(false);
  };

  return (
    <div>
      
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

    
        <Button onClick={handleClickOpen} variant="contained" color="primary">
            Add Data
        </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Customer Data</DialogTitle>
        <Divider />
        <DialogContent>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography variant="h6">Name</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Name"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 13 }}
                    name="name"
                    type="text"
                    value={saveCustomer.name}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant="h6">Np HP</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="No HP"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 13 }}
                    name="mobile"
                    type="number"
                    value={saveCustomer.mobile}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant="h6">Alamat</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Alamat"
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    inputProps={{ maxLength: 255 }}
                    name="address"
                    type="text"
                    value={saveCustomer.address}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant="h6">Email</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Email"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 50 }}
                    name="email"
                    type="text"
                    value={saveCustomer.email}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>


              <tr>
                <td>
                  <Typography variant="h6">Upload KTP</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Upload"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    name="ktp"
                    type="file"
                    value={saveCustomer.ktp}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant="h6">Pic Name</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Pic Name"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 15 }}
                    name="pic_name"
                    type="text"
                    value={saveCustomer.pic_name}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>


              <tr>
                <td>
                  <Typography variant="h6">Pic Name</Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                  <TextField
                    id="outlined-dense"
                    placeholder="Pic Name"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    inputProps={{ maxLength: 15 }}
                    name="pic_name"
                    type="text"
                    value={saveCustomer.pic_name2}
                    onChange={onChangeSaveCustomer}
                  />
                </td>
              </tr>

            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addCustomer}
            className={classes.buttonModal}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.redCustomer.viewCustomer,
  };
};

export default withRouter(connect(mapStateToProps)(AddCustomer));
