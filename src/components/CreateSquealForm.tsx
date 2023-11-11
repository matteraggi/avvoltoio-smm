"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { ClientsContext } from "../context/clients.context";
import { baseUrl } from "../app/shared";
import { PostContext } from "../context/post.context";
import IconTakePhoto from "../../public/IconTakePhoto";
import IconUploadImage from "../../public/IconUploadImage";
import IconSetLocation from "../../public/IconSetLocation";
import { Toast } from "primereact/toast";

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
  const image = useRef<string | null>(null);
  const imageType = useRef<string | null>(null);
  const [url, setUrl] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [channelInput, setChannelInput] = useState("");
  const [channelsSuggested, setChannelsSuggested] = useState<channelType[]>([]);
  const [channelChosen, setChannelChosen] = useState<channelType[]>([]);
  const [remainingChars, setRemainingChars] = useState<charsType>({
    remainingChars: 0,
    type: "",
  });
  const { clients, setClients } = useContext(ClientsContext);
  const { post, setPost } = useContext(PostContext);
  const [error, setError] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (channels) {
      squealDestination();
    }
    getRemainingChars();
  }, [channelInput, url]);

  useEffect(() => {
    getRemainingChars();
  }, [clients, body]);

  const postSqueal = (e: any) => {
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
        img: image.current,
        img_content_type: imageType.current,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        setBody("");
        setChannels([]);
        image.current = null;
        imageType.current = null;
        setUrl("");
        return response.json();
      })
      //ricaricare tutto quando posto
      .then((data) => {
        setChannels((channels) => [...channels, ...channelInput]);
        setPost(!post);
        console.log("post: ", post);
        console.log(data);
        /*toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Post added",
          life: 3000,
        });*/
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
        setRemainingChars({
          remainingChars: data.remainingChars - body.length,
          type: data.type,
        });
      })
      .catch((error) => {
        console.log("Authorization failed: " + error.message);
        //stampa messaggio di errore
      });
  };

  const handleInput = (e: any) => {
    setChannelInput(e);

    document.getElementById("list")?.classList.remove("notdisplayed");
  };

  const charsStyleName = (style: string | undefined) => {
    if (style === "DAY") {
      return " del giorno";
    } else if (style === "WEEK") {
      return " della settimana";
    } else if (style === "MONTH") {
      return " del mese";
    }
  };

  const setFileData = (event: any): void => {
    const eventTarget: HTMLInputElement | null =
      event.target as HTMLInputElement | null;
    console.log(event.target);
    if (eventTarget?.files?.[0]) {

      const file: File = eventTarget.files[0];
      if (!file.type.startsWith("image/")) {
        // message serivce errpr
        return;
      } else {
        toBase64(file, (base64Data: string) => {
          image.current = base64Data;
          imageType.current = file.type;
          setUrl(`data: ${imageType.current}  ;base64, ${image.current}`);
        });
      }
    } else {
      // message service no file selected
    }
  };

  const toBase64 = (
    file: File,
    callback: (base64Data: string) => void
  ): void => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof e.target?.result === "string") {
        const base64Data: string = e.target.result.substring(
          e.target.result.indexOf("base64,") + "base64,".length
        );
        callback(base64Data);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const removeImage = () => {
    image.current = null;
    imageType.current = null;
    setUrl("");
  };

  return (
    <>
      <Toast ref={toast} />
      <form
        className="bg-slate-300 rounded-xl p-6 w-8/12"
        onSubmit={postSqueal}
      >
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
            {image.current && <img src={url} />}
            {image.current && <p onClick={removeImage}>Rimuovi</p>}
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
                className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <IconSetLocation />
                <span className="sr-only">Set location</span>
              </button>
              <label
                htmlFor="file-upload"
                className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <IconUploadImage />
                <span className="sr-only">Upload image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  accept="image/*"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setFileData(e)}
                />
              </label>

              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}
              {/*(change)="setFileData($event)"*/}

              <button
                type="button"
                className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <IconTakePhoto />
                <span className="sr-only">Take photo</span>
                {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}
                {/*(change)="setFileData($event)"*/}
              </button>
            </div>
          </div>
        </div>
        <div>
          {remainingChars!.remainingChars > 0 ? (
            <p>Caratteri rimanenti: {remainingChars?.remainingChars}</p>
          ) : (
            <div className="flex">
              <p>
                Hai finito i caratteri {charsStyleName(remainingChars?.type)}
              </p>
              <button className="p-1 bg-red-600 rounded-xl ml-6 ">
                <p className="text-white font-semibold text-md">Compra </p>
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateSquealForm;
