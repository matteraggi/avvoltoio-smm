"use client";
import { useContext, useState, useEffect } from "react";
import { ClientsContext } from "../context/clients.context";
import { baseUrl } from "../app/shared";
import { PostContext } from "../context/post.context";
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
  const [channels, setChannels] = useState("");
  const [channelsSuggested, setChannelsSuggested] = useState<channelType[]>([]);
  const [remainingChars, setRemainingChars] = useState<charsType>();
  const { clients, setClients } = useContext(ClientsContext);
  const { post, setPost } = useContext(PostContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (channels) {
      squealDestination();
    }
  }, [channels]);

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
        destination: [
          {
            destination_id: "654681bc85be4d7c41c13ae7",
            destination: channels,
            destination_type: "PUBLICGROUP",
          },
        ],
        body: body,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        setBody("");
        setChannels("");
        return response.json();
      })
      .then((data) => {
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
      `?search=${channels}`;

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
        setRemainingChars(data);
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  const numberOfChars = () => {
    getRemainingChars();
    if (remainingChars) {
      return remainingChars.remainingChars;
    }
    return null;
  };

  const typeOfChars = () => {
    getRemainingChars();
    if (remainingChars) {
      return remainingChars.type;
    }
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
            onChange={(e) => setChannels(e.target.value)}
            value={channels}
            multiple
          ></input>
          {channels.length > 0 && (
            <div>
              {channelsSuggested.map((channel) => {
                const handleSuggestion = () => {
                  setChannels(channel.destination);
                  document.getElementById("suggestions")!.style.display =
                    "none";
                };
                return (
                  <div id="suggestions">
                    <li
                      key={channel.destination_id}
                      className="min-h-10 w-full border-b-[1px] border-solid border-l-grey-300 py-2 list-none"
                      onClick={handleSuggestion}
                      id="suggestedItem"
                    >
                      {channel.destination}
                    </li>
                  </div>
                );
              })}
            </div>
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
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              <span className="sr-only">Set location</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <span className="sr-only">Upload image</span>{" "}
              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}{" "}
              {/*(change)="setFileData($event)"*/}
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-camera-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />{" "}
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />{" "}
              </svg>
              <span className="sr-only">Take photo</span>{" "}
              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}{" "}
              {/*(change)="setFileData($event)"*/}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>Caratteri rimanenti: {}</p>
        <div className="flex justify-between">
          <p>Hai finito i caratteri del {}</p>
          <button className="p-2 bg-red-600 rounded-xl">
            <p className="text-white font-semibold">Compra</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateSquealForm;
