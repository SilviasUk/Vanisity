import React, { useRef } from "react";
import * as Store from "../../Libs/Storage.js";

export const AddConnection = ({ htmlFor, connections, setConnections }) => {
  const ipRef = useRef(0);
  const usrRef = useRef(0);
  const nameRef = useRef(0);
  const portRef = useRef(0);
  const passwordRef = useRef(0);

  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal justify-center flex flex-col space-y-3">
        <div className="modal-box max-w-[42rem] space-y-2 shadow-md shadow-black/0 bordered-all">
          <h3 className="font-bold text-lg">Add Connection</h3>
          <div className="w-full space-y-3">
            <input
              id="name"
              ref={nameRef}
              placeholder="Connection Name"
              className="input w-full bg-neutral"
              type="text"
            />
            <input
              id="usr"
              ref={usrRef}
              placeholder="Username to connect with"
              className="input w-full bg-neutral"
              type="text"
            />
            <div className="flex flex-row w-full gap-3">
              <input
                id="ip"
                ref={ipRef}
                placeholder="Connection IP Adress"
                className="input grow bg-neutral"
                type="text"
              />

              <input
                id="port"
                ref={portRef}
                placeholder="Connection Port"
                className="input w-1/3 bg-neutral"
                type="number"
                min="0"
              />
            </div>

            <div className="divider mx-0"></div>

            <input
              id="password"
              ref={passwordRef}
              placeholder="SSH Password (saved to secure storage)"
              className="input w-full bg-neutral"
              type="password"
            />
          </div>
        </div>

        <div className="modal-action bg-neutral p-4 rounded-box bordered-all">
          <label
            htmlFor={htmlFor}
            className="btn bg-primary"
            onClick={() => {
              document.getElementById("name").value = "";
              document.getElementById("usr").value = "";
              document.getElementById("ip").value = "";
              document.getElementById("port").value = "";
              document.getElementById("password").value = "";
            }}
          >
            Cancel
          </label>
          <label
            onClick={() => {
              if (nameRef.current.value == "Local") {
                alert("Reserved name: 'Local'\n\n Please choose another name.");
              } else {
                Store.AddNewConnection(
                  nameRef.current.value,
                  usrRef.current.value,
                  ipRef.current.value,
                  portRef.current.value,
                  passwordRef.current.value
                );
              }

              setConnections(JSON.parse(localStorage.getItem("connections")));

              document.getElementById("name").value = "";
              document.getElementById("usr").value = "";
              document.getElementById("ip").value = "";
              document.getElementById("port").value = "";
              document.getElementById("password").value = "";
            }}
            htmlFor={htmlFor}
            className="btn bg-accent hover:bg-accent/70"
          >
            Add Connection
          </label>
        </div>
      </div>
    </>
  );
};
