"use client";
import { useContext, useState, useEffect } from "react";
import { ClientsContext } from "../context/clients.context";
import { baseUrl } from "../app/shared";
import { PostContext } from "../context/post.context";
import IconTakePhoto from "./IconTakePhoto";
import IconUploadImage from "./IconUploadImage";
import IconSetLocation from "./IconSetLocation";
interface charsType {
  remainingChars: number;
  type: string;
}

interface channelType {
  admin_add: boolean;
  destination: string;
  destination_id: string;
  destination_type: string;
  seen: number;
  _id: string;
}

const CreateSquealForm = () => {
  const [body, setBody] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [channelInput, setChannelInput] = useState("");
  const [channelsSuggested, setChannelsSuggested] = useState<channelType[]>([]);
  const [channelChosen, setChannelChosen] = useState<channelType[]>([]);
  const [remainingChars, setRemainingChars] = useState<charsType>();
  const { clients, setClients } = useContext(ClientsContext);
  const { post, setPost } = useContext(PostContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (channels) {
      squealDestination();
    }
    getRemainingChars();
  }, [channelInput]);

  useEffect(() => {
    getRemainingChars();
  }, [clients, body]);

  const postSqueal = (e) => {
    e.preventDefault();
    const url = baseUrl + "api/client-post/" + clients.login;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
      body: JSON.stringify({
        destination: channelChosen,
        body: body,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        setBody("");
        setChannels([]);
        return response.json();
      })
      .then((data) => {
        setChannels((channels) => [...channels, ...channelInput]);
        setPost(!post);
        console.log("post: ", post);
        console.log(data);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
  };

  const squealDestination = () => {
    const url =
      baseUrl +
      `api/squeals-destination/smm/` +
      clients.login +
      `?search=${channelInput}`;

    console.log(url);

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
        setChannelsSuggested(data);
        console.log(channelsSuggested);
      })
      .catch((error) => {
        console.log("Authorization failed : " + error.message);
        //stampa messaggio di errore
      });
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
        console.log(data);
        setRemainingChars({
          remainingChars: data.remainingChars - body.length,
          type: data.type,
        });
        console.log(data);
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  /*
  document.addEventListener("keydown", (e) => {
    const len = document.getElementsByTagName("ul").length;
    var index = 0;
    var prevIndex = 0;
    //down key
    if (e.key === "ArrowDown") {
      index++;
      prevIndex = index - 1;
      //condition for reaching at the end
      if (index > len - 1) {
        index = 0;
        prevIndex = len - 1;
      }
      document
        .getElementsByTagName("li")
        [index].classList.add("selected");
      if (prevIndex >= 0)
        document
          .getElementsByTagName("li")
          [prevIndex].classList.remove("selected");
    }

    //upkey
    else if (e.key === "ArrowUp") {
      index--;
      prevIndex = index + 1;
      //condition for reaching the beginning.
      if (index < 0) {
        index = len - 1;
      }
      document
        .getElementsByTagName("li")
        [index].classList.add("selected");
      document
        .getElementsByTagName("li")
        [prevIndex].classList.remove("selected");
    }

    //Enter key
    else if (e.key === "Enter") {
      for (
        let i = 0;
        i < document.getElementsByTagName("li").length;
        i++
      ) {
        document
          .getElementsByTagName("li")
          [i].classList.remove("selected");
      }
      document
        .getElementsByTagName("li")
        [index].classList.add("selected");
    }
  });
  */
  const handleInput = (e) => {
    setChannelInput(e);

    document.getElementById("list")?.classList.remove("notdisplayed");
  };

  return (
    <form className="bg-slate-300 rounded-xl p-6 w-8/12" onSubmit={postSqueal}>
      <p className="pb-3 text-2xl">Create a new squeal</p>
      <div className="w-full mb-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="pt-2 pb-2 pl-4 pr-4 bg-white rounded-t-lg dark:bg-gray-800">
          <span className="block text-sm font-medium text-gray-900 dark:text-white sr-only">
            Destinazione
          </span>

          <input
            id="dest"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg"
            placeholder="Destinations..."
            required
            onChange={(e) => handleInput(e.target.value)}
            value={channelInput}
            multiple
          ></input>
          {channelInput.length > 0 && (
            <ul id="list">
              {channelsSuggested.map((channel) => {
                const handleSuggestion = () => {
                  setChannelInput(channel.destination);
                  setChannelChosen((channelChosen) => [
                    ...channelChosen,
                    channel,
                  ]);
                  document
                    .getElementById("list")
                    ?.classList.add("notdisplayed");
                };

                return (
                  <li
                    key={channel.destination_id}
                    className="min-h-10 w-full border-b-[1px] border-solid border-l-grey-300 py-2 list-none"
                    onClick={handleSuggestion}
                    id="suggestions"
                  >
                    {channel.destination}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="body"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg"
            placeholder="Write a post..."
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Posta
          </button>
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <IconSetLocation></IconSetLocation>
              <span className="sr-only">Set location</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <IconUploadImage></IconUploadImage>
              <span className="sr-only">Upload image</span>{" "}
              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}{" "}
              {/*(change)="setFileData($event)"*/}
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <IconTakePhoto></IconTakePhoto>
              <span className="sr-only">Take photo</span>{" "}
              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}{" "}
              {/*(change)="setFileData($event)"*/}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>Caratteri rimanenti: {remainingChars?.remainingChars}</p>
        <div className="flex justify-between">
          <p>Hai finito i caratteri del {remainingChars?.type}</p>
          <button className="p-2 bg-red-600 rounded-xl">
            <p className="text-white font-semibold">Compra </p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateSquealForm;
