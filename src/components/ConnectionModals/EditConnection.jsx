import React, { useEffect, useRef, useState } from "react";
import * as Store from "../../Libs/Storage.js";

import secureLocalStorage from "react-secure-storage";
export const EditConnection = ({
  htmlFor,
  connections,
  setConnections,
  connection,
}) => {
  const ipRef = useRef(0);
  const usrRef = useRef(0);
  const nameRef = useRef(0);
  const portRef = useRef(0);
  const passwordRef = useRef(0);

  const [accessed, setAccessed] = useState(false);

  useEffect(() => {
    nameRef.current.value = connection.name;
    ipRef.current.value = connection.ip;
    usrRef.current.value = connection.usr;
    portRef.current.value = connection.port;
  });

  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal justify-center flex flex-col space-y-3">
        <div className="modal-box max-w-[42rem] space-y-2 shadow-md shadow-black/0 bordered-all">
          <h3 className="font-bold text-lg">
            Edit Connection: {connection.name}
          </h3>
          <div className="w-full space-y-1.5">
            <h1 className="label">Name:</h1>
            <input
              id="name"
              ref={nameRef}
              className="input w-full bg-neutral mb-3"
              type="text"
            />
            <h1 className="label">Username to connect with:</h1>
            <input
              id="usr"
              ref={usrRef}
              className="input w-full bg-neutral mb-3"
              type="text"
            />
            <div className="flex flex-row gap-3">
              <div className="grow">
                <h1 className="label">IP Address:</h1>
                <input
                  id="ip"
                  ref={ipRef}
                  className="input w-full bg-neutral mb-3"
                  type="text"
                />
              </div>

              <div className="w-1/5">
                <h1 className="label">Port:</h1>
                <input
                  id="port"
                  ref={portRef}
                  className="input w-full bg-neutral"
                  type="number"
                  min="0"
                />
              </div>
            </div>

            <div className="divider mx-0"></div>

            <h1 className="label">Password</h1>
            <input
              onClick={() => {
                if (accessed == false) {
                  document
                    .getElementById("passwordProgress")
                    .classList.remove("hidden");

                  setAccessed(true);

                  setTimeout(() => {
                    document
                      .getElementById("passwordProgress")
                      .classList.add("hidden");

                    passwordRef.current.value = secureLocalStorage.getItem(
                      connection.name
                    );
                  }, 3000);
                }
              }}
              id="passwordEdit"
              ref={passwordRef}
              placeholder="Click to see password and wait 3s (DO NOT SHARE)"
              className="input w-full bg-neutral"
              readOnly={!accessed}
              type="text"
            />
            <progress
              className="progress hidden"
              id="passwordProgress"
            ></progress>
          </div>
        </div>

        <div className="modal-action bg-neutral p-4 rounded-box bordered-all">
          <label
            htmlFor={htmlFor}
            className="btn bg-primary"
            onClick={() => {
              setAccessed(false);

              document.getElementById("passwordEdit").value = "";
            }}
          >
            Cancel
          </label>
          <label
            onClick={() => {
              if (nameRef.current.value == connection.name) {
                Store.RemoveConnection(nameRef.current.value);

                setConnections(JSON.parse(localStorage.getItem("connections")));
              }

              nameRef.current.value = "";
            }}
            htmlFor={htmlFor}
            className="btn bg-error hover:bg-error/70"
          >
            Remove Connection
          </label>
          <label
            onClick={() => {
              if (nameRef.current.value == "Local") {
                alert("Reserved name: 'Local'\n\n Please choose another name.");
              } else {
                let cachePass = secureLocalStorage.getItem(connection.name);

                Store.RemoveConnection(connection.name);

                if (accessed == true) {
                  Store.AddNewConnection(
                    nameRef.current.value,
                    usrRef.current.value,
                    ipRef.current.value,
                    portRef.current.value,
                    passwordRef.current.value
                  );
                } else if (accessed == false) {
                  Store.AddNewConnection(
                    nameRef.current.value,
                    usrRef.current.value,
                    ipRef.current.value,
                    portRef.current.value,
                    cachePass
                  );
                }
              }

              document.getElementById("passwordEdit").value = "";

              setAccessed(false);

              setConnections(JSON.parse(localStorage.getItem("connections")));
            }}
            htmlFor={htmlFor}
            className="btn bg-accent/70 hover:bg-accent/40"
          >
            Save
          </label>
        </div>
      </div>
    </>
  );
};
