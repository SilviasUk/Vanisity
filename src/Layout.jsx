import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Outlet } from "react-router-dom";
import { WindowControls } from "./components/WindowControls";

function Layout() {
  return (
    <>
      <WindowControls></WindowControls>

      <div className="text-white justify-center flex flex-col w-screen h-screen bg-gradient-to-bl from-black to-[#101012] min-h-screen ">
        <div
          data-tauri-drag-region
          className="w-full bg-neutral-900 bordered-b bordered-l overflow-hidden h-8"
        >
          <div
            data-tauri-drag-region
            className="text-center items-center flex justify-center "
          >
            <p
              data-tauri-drag-region
              className="p-1.5 text-sm w-min pointer-events-none"
            >
              Vanisity
            </p>
          </div>
        </div>
        <Outlet> </Outlet>
      </div>
    </>
  );
}

export default Layout;
