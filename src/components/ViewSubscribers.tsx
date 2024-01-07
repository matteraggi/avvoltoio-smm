import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Link from "next/link";

const ViewSubscribers = (props: any) => {
  const channel_id = props.channel_id;
  const { clients, setClients } = useContext(ClientsContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subscribersList, setSubscribersList] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any>();

  const getSubscribersCount = () => {
    const url =
      baseUrl +
      `api/channels/count-subscribers/smm/${clients.login}/${channel_id}`;

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
        setSubscribers(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAllSubscribers = () => {
    const url =
      baseUrl +
      `api/channels/get-subscribed/smm/${clients.login}/${channel_id}`;

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
        setSubscribersList(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getSubscribersCount();
    getAllSubscribers();
  }, []);

  return (
    <>
      <div className="flex align-bottom">
        <button
          className="mt-6 w-fit h-fit bg-[#4B2CA0] rounded-xl px-4 py-1 text-white"
          onClick={handleOpen}
        >
          {subscribers} Iscritti
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute w-58 h-[625px] bg-white border-2 border-solid border-black shadow-md shadow-black mt-36 right-1/4 left-1/4 overflow-y-scroll p-4">
            {subscribersList.length === 0 && <div>Nessun Iscritto</div>}
            {subscribersList.map((subscriber, index) => (
              <Link href={"/dashboard/feed/" + subscriber.login}>
                <div
                  className="flex justify-between border-solid border-[#4B2CA0] border-4 bg-white mb-3 rounded-lg p-3"
                  key={index}
                >
                  <h3>@{subscriber.login}</h3>
                  <h4>User</h4>
                </div>
              </Link>
            ))}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ViewSubscribers;
