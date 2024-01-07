import { baseUrl } from "@/app/shared";
import { ClientsContext } from "@/context/clients.context";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const AddUserToChannel = (props: any) => {
  const channel_id = props.channel_id;
  const { clients, setClients } = useContext(ClientsContext);
  var users: string[] = [];
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchUsers = () => {
    const url =
      baseUrl + `api/users/search/smm/${clients.login}?search=${searchQuery}`;

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
        setSearchResults(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addUser = () => {
    console.log(users);
    const url =
      baseUrl +
      `api/channels/smm/add-people/${clients.login}?channelId=${channel_id}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token"),
      },
      body: JSON.stringify({
        users,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchUsers();
    }
  }, [searchQuery]);

  return (
    <>
      <div>
        <button
          onClick={handleOpen}
          className="mt-2 w-fit bg-[#4B2CA0] rounded-xl px-4 py-2 text-white"
        >
          Invita un amico
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute w-58 h-[625px] bg-white border-2 border-solid border-black shadow-md shadow-black mt-36 right-1/4 left-1/4">
            <div className="flex flex-col gap-5 justify-center items-center mt-16">
              <form className="w-6/12">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cerca Profili, Canali,..."
                    required
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="w-6/12 h-[400px] max-h-[400px] overflow-hidden overflow-y-scroll bg-white border-2 ">
                {searchQuery.length > 0 ? (
                  <>
                    {searchResults.map((result, index) => {
                      const selectElement = () => {
                        if (users.includes(result.login)) {
                          users.splice(users.indexOf(result._id), 1);
                          const user = document.getElementById(result.login);
                          if (user) {
                            user.style.backgroundColor = "white";
                            user.style.color = "black";
                          }
                        } else {
                          users.push(result._id);
                          const user = document.getElementById(result.login);
                          if (user) {
                            user.style.backgroundColor = "green";
                            user.style.color = "white";
                          }
                        }
                      };
                      return (
                        <div
                          className="flex justify-between border-solid border-black border-2 bg-white mb-3 rounded-lg p-3"
                          key={result.login}
                          id={result.login}
                          onClick={selectElement}
                        >
                          <h3>{result.login}</h3>
                          <h4>User</h4>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex justify-center mt-5">
                    <p className="text-[#d1d5db]">
                      Cerca utenti, canali e hashtag!
                    </p>
                  </div>
                )}
              </div>
              <button
                className="mt-2 w-fit bg-[#4B2CA0] rounded-xl px-4 py-2 text-white"
                onClick={addUser}
              >
                Add user
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AddUserToChannel;
