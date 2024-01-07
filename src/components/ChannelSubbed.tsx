import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconClose from "../../public/IconClose";
import { TextField } from "@mui/material";
import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import Link from "next/link";

const ChannelSubbed = (props: any) => {
  const channelSubbed = props.channelSubbed;
  const user = props.user;
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [channel, setChannel] = React.useState([]);
  const { clients, setClients } = React.useContext(ClientsContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
    getRemainingChars();
  };

  const getRemainingChars = () => {
    const url = baseUrl + `api/channels/sub/get/smm/${clients.login}/${user}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setChannel(data);
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  return (
    <React.Fragment>
      <p
        className="py-2 px-5 bg-[#4B2CA0] text-white rounded-2xl text-[22px] pointer"
        onClick={handleClickOpen("paper")}
      >
        {channelSubbed} canali seguiti
      </p>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        transitionDuration={300}
      >
        <div className="flex items-center justify-center border border-dashed">
          <div className="flex-1"></div>
          <DialogTitle
            id="scroll-dialog-title"
            className="text-center flex-1 text-2xl"
          >
            Canali Seguiti
          </DialogTitle>
          <DialogActions className="flex-1">
            <Button onClick={handleClose}>
              <IconClose />
            </Button>
          </DialogActions>
        </div>

        <DialogContent dividers={scroll === "paper"}>
          {channel.map((item: any) => (
            <Link href={`/dashboard/feed/channel/${item.channel._id}`}>
              <div className="flex items-center justify-between mb-5 p-2 border-2 border-[#4B2CA0] rounded-xl">
                <div>
                  <p className="text-xl">{item.channel.name}</p>
                </div>
                <div>
                  <p
                    className={
                      item.channel.type == "PRIVATEGROUP"
                        ? "bg-red-600 text-white rounded-xl text-[18px] px-3 py-1"
                        : " bg-green-700 text-white rounded-xl text-[18px] px-3 py-1"
                    }
                  >
                    {item.channel.type}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ChannelSubbed;
