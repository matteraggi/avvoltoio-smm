"use client";
import { useContext, useState, useEffect, useRef, use } from "react";
import { ClientsContext } from "../context/clients.context";
import { baseUrl } from "../app/shared";
import IconUploadImage from "../../public/IconUploadImage";
import IconSetLocation from "../../public/IconSetLocation";
import { Toast } from "primereact/toast";
import IconClose from "../../public/IconClose";
import { GeolocContext } from "@/context/geoloc.context";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

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

const CreateSquealForm = (props: any) => {
  const { geoloc, setGeoloc } = useContext(GeolocContext);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
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
  const toast = useRef<Toast>(null);

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

  /*
  const getGoogle = (): Observable<any> => {
    if (google) {
      return of(google);
    } else {
      return subject.asObservable();
    }
  };

  const initMaps = (): void => {
    var google: any;

    const options: LoaderOptions = {
      language: "en",
      region: "IT",
      apiKey: process.env.GEOLOC_API_KEY as string,
    };
    loader = new Loader(options);
    console.log("create loader");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    loader.load().then((g) => {
      google = g;
      console.log("loader loaded");
      subject.next(g);
    });
  };

  const createMap = (): void => {
    const myMap = document.getElementById(
      "map_create"
    ) as HTMLInputElement | null;
    console.log(myMap?.outerHTML);
    if (myMap) {
      console.log(geoloc.latitude, geoloc.longitude);
      if (!geoloc.latitude || !geoloc.longitude) {
        //messageService.add({ severity: 'error', summary: 'Posizione', detail: 'Posizione non trovata' });
        console.log("Posizione non trovata");
        return;
      }
      getGoogle().subscribe(() => {
        if (!(geoloc.latitude && geoloc.longitude)) {
          return;
        }
        const heading = geoloc.heading;
        const latlng = new google.maps.LatLng(
          geoloc.latitude,
          geoloc.longitude
        );
        const map = new google.maps.Map(myMap, {
          center: latlng,
          heading: heading ?? 0,
          zoom: 13,
        });
        const svgMarker = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: "red",
          fillOpacity: 1,
          strokeWeight: 0,
          rotation: 0,
          scale: 5,
          anchor: new google.maps.Point(0, 0),
        };
        const marker = new google.maps.Marker({
          position: latlng,
          map,
          icon: svgMarker,
          title: "You!",
        });
      });
    }
    initMaps();
  };

  const addGeo = (): void => {
    initMaps();
    geo.current = true;
  };
  */

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
        geoloc: geoloc,
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

  const paymentUrl = () => {
    location.href = "https://stripe.com/en-it";
  };

  const openMap = () => {
    setOpen(true);
  };

  /*
  const removeGeo = () => {
    geo.current = false;
    setGeoloc({
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      speed: 0,
      heading: 0,
      timestamp: 0,
      refresh: false,
    });
  };
  */

  return (
    <>
      <Toast ref={toast} />
      <form
        className="bg-slate-300 rounded-xl p-6 w-8/12"
        onSubmit={postSqueal}
      >
        <p className="pb-3 text-2xl">Create a new squeal</p>
        <div className="w-full mb-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div
            className="pt-2 pb-2 pl-4 pr-4 bg-white rounded-t-lg dark:bg-gray-800"
            key={seed}
          >
            <span className="block text-sm font-medium text-gray-900 dark:text-white sr-only">
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
                    <div className="flex border-2 border-black bg-blue-300 p-1 mr-2 w-fit rounded-lg">
                      <div onClick={cancelDestination} className="pointer">
                        <IconClose />
                      </div>
                      {channel.destination}
                    </div>
                  );
                })}
            </div>
            <textarea
              id="dest"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg"
              placeholder="Destinations..."
              onChange={(e) => handleInput(e.target.value)}
              value={channelInput}
            ></textarea>
            {channelInput.length > 0 && (
              <ul
                id="list"
                className="absolute shadow-md bg-white w-3/5 p-3 max-h-[200px] overflow-hidden overflow-y-scroll"
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
              maxLength={maxChars()}
            ></textarea>
            {image.current && <img src={url} />}
            {image.current && (
              <p onClick={removeImage} className="pointer">
                Rimuovi
              </p>
            )}

            <Map />
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
                onClick={openMap}
              >
                <IconSetLocation />
                <span className="sr-only">Set Location</span>
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
            </div>
          </div>
        </div>
        <div>
          {remainingChars!.remainingChars > 0 ? (
            <p>
              Caratteri rimanenti{charsStyleName(remainingChars?.type)}:{" "}
              {remainingChars?.remainingChars}
            </p>
          ) : (
            <div className="flex">
              <p>
                Hai finito i caratteri {charsStyleName(remainingChars?.type)}
              </p>

              <button
                className="p-1 bg-red-600 rounded-xl ml-6"
                onClick={paymentUrl}
              >
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
