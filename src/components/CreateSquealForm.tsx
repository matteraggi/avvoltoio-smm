"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { ClientsContext } from "../context/clients.context";
import { baseUrl } from "../app/shared";
import IconUploadImage from "../../public/IconUploadImage";
import IconSetLocation from "../../public/IconSetLocation";
import IconClose from "../../public/IconClose";
import { GeolocContext } from "@/context/geoloc.context";
import { useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import Map from "./Map";
import Image from "next/image";

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

type OpenOrNot = false | true;

const CreateSquealForm = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDTiBSWt4Ft7tUnZdmrmyZMsFr1MeWzSsM",
  });
  const { geoloc, setGeoloc } = useContext(GeolocContext);
  const [open, setOpen] = useState<OpenOrNot>(false);
  const [body, setBody] = useState("");
  const image = useRef<string | null>(null);
  const imageType = useRef<string | null>(null);
  const maxLenght = useRef<number>(0);
  const [url, setUrl] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [channelInput, setChannelInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string[]>([]);
  const [channelsSuggested, setChannelsSuggested] = useState<channelType[]>([]);
  const [channelChosen, setChannelChosen] = useState<channelType[]>([]);
  const [remainingChars, setRemainingChars] = useState<charsType>({
    remainingChars: 0,
    type: "",
  });
  const { clients, setClients } = useContext(ClientsContext);
  const [error, setError] = useState(false);
  const [seed, setSeed] = useState(0);

  /*
  var subject = new Subject<any>();
  const geo = useRef(false);
  var loader: Loader;
  */

  useEffect(() => {
    if (channels) {
      squealDestination();
    }
    getRemainingChars();
  }, [channelInput, url]);

  useEffect(() => {
    getRemainingChars();
  }, [clients, body]);

  useEffect(() => {
    setChannelChosen([]);
  }, [clients]);

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
        geoloc: {
          latitude: geoloc.latitude,
          longitude: geoloc.longitude,
          accuracy: geoloc.accuracy,
          speed: geoloc.speed,
          heading: geoloc.heading,
          timestamp: Date.now(),
          refresh: geoloc.refresh, //mettere bool deciso da uno switch
        },
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
        props.setFeedArray([data].concat(props.feedArray));
        console.log(props.feedArray);
        toast.success("Hai Squealato!", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
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
      `?search=${urlInput}`;

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
        maxLenght.current = data.remainingChars;
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

  const handleInput = (e: any) => {
    setChannelInput(e);
    var eSplit = e.split("");
    if (eSplit[0] === "#") {
      eSplit[0] = "%23";
    }
    e = eSplit.join("");
    setUrlInput(e);

    document.getElementById("list")?.classList.remove("notdisplayed");
  };

  const charsStyleName = (style: string | undefined) => {
    if (style === "DAY") {
      return "del giorno";
    } else if (style === "WEEK") {
      return "della settimana";
    } else if (style === "MONTH") {
      return "del mese";
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

  const showChange = () => {
    setSeed(Math.random());
  };

  const maxChars = () => {
    if (maxLenght.current === 0) {
      return (maxLenght.current = 10);
    } else {
      return maxLenght.current;
    }
  };

  const openMap = () => {
    setOpen(!open);
  };

  const closeMap = () => {
    setOpen(!open);
    setGeoloc({
      latitude: null,
      longitude: null,
      accuracy: null,
      speed: null,
      heading: null,
      timestamp: null,
      refresh: null,
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <form className="bg-white rounded-xl p-6 w-1/2" onSubmit={postSqueal}>
        <p className="pb-3 text-2xl">Create a new squeal</p>
        <div className="w-full mb-3 border border-gray-200 rounded-lg bg-[#F4F4F4]">
          <div
            className="mt-2 mb-2 ml-4 mr-4 bg-[#F4F4F4] rounded-t-lg "
            key={seed}
          >
            <span className="block text-sm font-medium text-gray-900  sr-only">
              Destinazione
            </span>
            <div className="flex mb-2">
              {channelChosen.length > 0 &&
                channelChosen.map((channel) => {
                  const cancelDestination = () => {
                    const index = channelChosen.indexOf(channel);
                    channelChosen.splice(index, 1);
                    showChange();
                  };
                  return (
                    <div className="flex border-2 border-black bg-[#4B2CA0] p-1 mr-2 w-fit rounded-lg text-white">
                      <div onClick={cancelDestination} className="pointer">
                        <IconClose />
                      </div>
                      {channel.destination}
                    </div>
                  );
                })}
            </div>
            <div className="relative">
              <textarea
                id="dest"
                className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0  rounded-lg bg-[#F4F4F4] peer block min-h-[auto] bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                onChange={(e) => handleInput(e.target.value)}
                value={channelInput}
              ></textarea>
              <label
                htmlFor="dest"
                className="pointer-events-none absolute top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
              >
                Destinazione
              </label>
            </div>
            {channelInput.length > 0 && (
              <ul
                id="list"
                className="absolute shadow-md bg-white w-1/5 p-3 max-h-[200px] overflow-hidden overflow-y-scroll z-30"
              >
                {channelsSuggested.map((channel) => {
                  const handleSuggestion = () => {
                    setChannelInput("");

                    const found = channelChosen.find((element) => {
                      if (element.destination_id === channel.destination_id) {
                        return true;
                      } else {
                        return false;
                      }
                    });
                    if (!found) {
                      setChannelChosen((channelChosen) => [
                        ...channelChosen,
                        channel,
                      ]);
                      document
                        .getElementById("list")
                        ?.classList.add("notdisplayed");
                    }
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
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-[#F4F4F4] ">
          <div className="relative mx-4 my-2 rounded-t-lg  bg-[#F4F4F4]">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="body"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 border-0  focus:ring-0  rounded-lg bg-[#F4F4F4] peer block min-h-[auto] bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none   [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              required
              onChange={(e) => setBody(e.target.value)}
              value={body}
              maxLength={maxChars()}
            ></textarea>

            {body.length === 0 ? (
              <label
                htmlFor="body"
                className="pointer-events-none absolute top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
              >
                {`Body - Caratteri rimanenti ${charsStyleName(
                  remainingChars?.type
                )}: ${remainingChars?.remainingChars}`}
              </label>
            ) : (
              <label
                htmlFor="body"
                className="pointer-events-none absolute top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none"
              >
                {`Body - Caratteri rimanenti ${charsStyleName(
                  remainingChars?.type
                )}: ${remainingChars?.remainingChars}`}
              </label>
            )}

            {image.current && (
              <Image
                src={url}
                alt="squealerImage"
                className="h-48 w-48 rounded-full mr-3"
              />
            )}
            {image.current && (
              <p onClick={removeImage} className="pointer">
                Rimuovi
              </p>
            )}
            {open && <Map />}
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t rounded-b-md  bg-[#D9D9D9]">
            <button
              type="submit"
              className="inline-flex items-center py-1.5 px-4 text-[14px] font-medium text-center text-white bg-[#4B2CA0] rounded-3xl focus:ring-4 focus:ring-blue-200 "
            >
              Posta
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              {open ? (
                <button
                  type="button"
                  className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 "
                  onClick={closeMap}
                >
                  <IconSetLocation />
                  <span className="sr-only">Set Location</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 "
                  onClick={openMap}
                >
                  <IconSetLocation />
                  <span className="sr-only">Set Location</span>
                </button>
              )}

              <label
                htmlFor="file-upload"
                className="inline-flex justify-center items-center p-2 rounded cursor-pointer text-black hover:text-gray-900 hover:bg-gray-100 "
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSquealForm;
