"use client"; // This is a client component 👈🏽

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const clients = ["El Ninho", "Maurizio Benazzi"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Cambia Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        {clients.map((clients) => (
          <ListItem disableGutters key={clients}>
            <ListItemButton onClick={() => handleListItemClick(clients)}>
              <ListItemAvatar>
              <Avatar alt="" src="/squealerimage.png" />
              </ListItemAvatar>
              <ListItemText primary={clients} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

const SidebarMobile = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(clients[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="sidebar-mobile">
      <Typography variant="subtitle1" component="div">
        Selezionato: {selectedValue}
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cambia Cliente
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default SidebarMobile;
