import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { ClientsContext } from "@/context/clients.context";
import { baseUrl } from "@/app/shared";
import IconClose from "../../public/IconClose";
import { TextField } from "@mui/material";
import { SocketioContext } from "@/context/socketio.context";

interface charsType {
  remainingChars: number;
  type: string;
}

export default function Comments(props: any) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const { clients, setClients } = useContext(ClientsContext);
  const [comments, setComments] = React.useState<any[]>([]);
  const [bodyComment, setBodyComment] = React.useState("");
  const [posted, setPosted] = React.useState(false);
  const { socket, setSocket } = useContext(SocketioContext);
  const [remainingChars, setRemainingChars] = React.useState<charsType>({
    remainingChars: 0,
    type: "",
  });

  const commentSqueal = (e: any) => {
    e.preventDefault();
    getRemainingChars();
    const url = baseUrl + "api/client-post/" + clients.login;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
      body: JSON.stringify({
        destination: props.squealDestinations,
        body: bodyComment,
        squeal_id_response: props.squeal_id,
        img: null,
        img_content_type: null,
        geoloc: null,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        setBodyComment("");
        setPosted(true);
        return response.json();
      })
      //ricaricare tutto quando posto
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
  };

  const getComments = () => {
    const url =
      baseUrl + `api/squeal-comments/${props.squeal_id}/${clients.login}`;

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
        setPosted(false);
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
    getComments();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRemainingChars = () => {
    const url = baseUrl + "api/client-chars/" + clients.login;

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
        setRemainingChars({
          remainingChars: data.remainingChars - bodyComment.length,
          type: data.type,
        });
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    getComments();
  }, [posted]);

  function timeDifference(current: any, previous: any) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return "about " + Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return "about " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  return (
    <React.Fragment key={props.squeal_id}>
      {props.num_comments > 0 ? (
        <p
          onClick={handleClickOpen("paper")}
          className="pointer text-[16px] font-medium inline-flex me-2 text-[#B4ACAC]"
        >
          Visualizza {props.num_comments}{" "}
          {props.num_comments > 1 ? "commenti" : "commento"}
        </p>
      ) : (
        <p
          onClick={handleClickOpen("paper")}
          className="pointer text-[16px] font-medium inline-flex me-2 text-[#B4ACAC]"
        >
          Rispondi allo Squeal
        </p>
      )}
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
            Commenti
          </DialogTitle>
          <DialogActions className="flex-1">
            <Button onClick={handleClose}>
              <IconClose />
            </Button>
          </DialogActions>
        </div>
        {comments.length > 0 ? (
          <DialogContent dividers={scroll === "paper"}>
            {comments.map((comment: any) => {
              const currentDate = Date.now();
              return (
                <div
                  id={comment.squeal._id}
                  key={comment.squeal._id}
                  className="p-3 border-b-2 mb-6 flex flex-col"
                >
                  <div className="flex justify-between">
                    <div className="flex mb-3">
                      <img
                        className="w-10 h-10 rounded-full mr-3"
                        src="/squealerimage.png"
                        alt="Rounded avatar"
                      />
                      <h4 className="text-black">@{comment.userName}</h4>
                    </div>
                    <p className="text-[#D9D9D9] text-[18px]">
                      {timeDifference(currentDate, comment.squeal.timestamp)}
                    </p>
                  </div>

                  <p className="font-normal">{comment.squeal.body}</p>
                </div>
              );
            })}
          </DialogContent>
        ) : (
          <p className="ml-6 mt-6">Non ci sono commenti</p>
        )}
        <form
          className="flex px-[24px] mt-3 items-center"
          onSubmit={commentSqueal}
        >
          <TextField
            id="standard-multiline-flexible"
            label="Scrivi qualcosa"
            multiline
            maxRows={4}
            variant="standard"
            className="py-4 px-2 w-full"
            color="primary"
            required
            onChange={(e) => setBodyComment(e.target.value)}
            value={bodyComment}
          />
          <button
            type="submit"
            className="inline-flex items-center py-1.5 px-4 text-[14px] font-medium text-center text-white bg-[#4B2CA0] rounded-3xl focus:ring-4 focus:ring-blue-200 "
          >
            Posta
          </button>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
