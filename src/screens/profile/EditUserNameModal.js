import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import './EditUserNameModal.css';

function getModalStyle() {
  const top = 33;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '20%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function EditUserNameModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [fullname, setFullname] = React.useState('');

  function fullNameChangeHandler(e) {
    setFullname(e.target.value);
    props.updateClickHandler(e.target.value);
  }



  return (
      <div>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.editUserModal}
            onClose={props.handleClose}
            onBackdropClick={props.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit</h2>
            <FormControl id="fullname-formcontrol" required>
              <InputLabel htmlFor="fullname">Full Name</InputLabel>
              <Input id="fullname" type="text" fullname={fullname} onChange={fullNameChangeHandler}/>
              {!fullname?<FormHelperText>
                <span className="red">required</span>
              </FormHelperText>: null}
            </FormControl>
            <div style={{marginTop:'1rem'}}>
            <Button variant="contained" color="primary" disabled={!fullname} onClick={props.submitClickHandler}>Update</Button>
            </div>
          </div>
        </Modal>
      </div>
  );

}
