import { React } from "react";
import { useState, useEffect } from "react";

import { AddConnection } from "./components/ConnectionModals/AddConnection.jsx";
import { EditConnection } from "./components/ConnectionModals/EditConnection.jsx";

import AddIcon from "@mui/icons-material/Add";

export const Home = () => {
  const [connections, setConnections] = useState(
    JSON.parse(localStorage.getItem("connections"))
  );
  const [sidebarSelected, setSidebarSelected] = useState(0);

  return (
    <>
      <AddConnection
        htmlFor={"addConnection"}
        connections={connections}
        setConnections={setConnections}
      ></AddConnection>
      <EditConnection
        htmlFor={"editConnection"}
        connections={connections}
        setConnections={setConnections}
        connection={sidebarSelected}
      ></EditConnection>

      <div className="grow flex flex-row">
        <div className="h-full w-72 min-w-72 bordered-r">
          <div className="flex flex-row p-4 gap-28">
            <h1 className="font-medium text-lg">Connections</h1>
            <label
              htmlFor="addConnection"
              className="bordered-all w-10 h-8 rounded-lg hover:bg-white/5 transition-all text-center items-center justify-center flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                id="addConnection_button_icon"
              >
                <path
                  fill="#D2D2D2"
                  d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                />
              </svg>
            </label>
          </div>
          <div className="flex flex-col gap-3 pl-4" id="sidebar_bottom">
            {connections.map((connection, index) => (
              <div
                key={index}
                className="flex flex-row justify-between  hover:shadow-xl hover:shadow-white/5 origin-bottom-right cursor-pointer bg-white/5 transition bordered-all rounded-lg w-64"
                id="sidebar_connectionContainer"
              >
                <div
                  onClick={() => {
                    const tab = {
                      name: connection.name,
                      ip: connection.ip,
                    };

                    setSelectedTab(tab);
                    example();
                  }}
                  className="flex grow flex-row items-center pl-4 py-3 gap-3"
                  id="connectionContainer_text"
                >
                  <h1
                    className="text-lg font-semibold text-shadow-white"
                    id="connectionContainer_text_name"
                  >
                    {connection.name}
                  </h1>
                  <h3
                    className="text-sm text-white/50"
                    id="connectionContainer_text_ip"
                  >
                    {connection.ip}
                  </h3>
                </div>

                <div
                  className="flex rounded-l-none overflow-hidden hover:overflow-visible join join-horizontal transition-all flex-row border border-white/5 rounded-lg"
                  id="connectionContainer_buttons"
                >
                  <label
                    htmlFor="editConnection"
                    onClick={() => {
                      setSidebarSelected(connection);
                    }}
                    className="btn btn-sm rounded-none h-full hover:shadow-info/30 hover:shadow-xl join-item hover:bg-secondary"
                    id="connectionContainer_buttons_edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 -960 960 960"
                      width="18"
                      id="connectionContainer_buttons_edit_icon"
                    >
                      <path
                        fill="#D2D2D2"
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col text-center justify-center items-center mt-72">
            <p className="text-2xl text-white/70 font-medium">Not connected to a server</p>
            <p className="text-lg text-white/60">
              Please connect to one
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
