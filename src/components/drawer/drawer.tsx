import React, { useState } from "react";

import { HiArrowUpTray, HiArrowDownTray, HiCog8Tooth } from "react-icons/hi2";
import { DrawerContent } from "./";
import { getAvatarBGFromId } from "~/utils";
export const Drawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // 2015
  //   const drawerBackgroundClass = drawerOpen ? "bg-sky-950" : "bg-transparent";
  //   const borderClass = drawerOpen ? "border-sky-400 border" : "border-none";
  const drawerBackgroundClass = drawerOpen ? "bg-sky-950" : "bg-transparent";
  const borderClass = "border-none";
  const widthClass = drawerOpen ? "w-3/4" : "w-9";
  const paddingClass = drawerOpen ? "p-2" : "py-2";

  const buttonIconSizing = "h-5 w-5";
  const buttonSizingW = "w-34px";
  const buttonSizingH = "h-34px";
  const closeBGDisplay = drawerOpen
    ? "z-10 pointer-events-auto visible opacity-60 bg-slate-900"
    : "z-n1 pointer-events-none invisble opacity-0 bg-transparent";
  const buttonDirectionClass = drawerOpen ? "rounded-r-lg" : "rounded-l-lg";

  const closeSettingsImgSrc = getAvatarBGFromId("diagonal-stripes", "000");
  return (
    <>
      <button
        style={{
          backgroundImage: `url("${closeSettingsImgSrc}")`,
        }}
        className={`${closeBGDisplay} fixed left-0 top-0 h-full w-full transition-opacity ease-in`}
        onClick={() => setDrawerOpen(!drawerOpen)}
      ></button>
      <div
        className={`${widthClass} ${paddingClass} relative z-20 flex flex-col rounded drop-shadow-2xl transition-borderColorWidthBackground ${borderClass} ease-in-out ${drawerBackgroundClass}`}
      >
        <div className={`flex items-center justify-between ${buttonSizingH} `}>
          {drawerOpen && (
            <div className={`flex items-center justify-center gap-2`}>
              <div className={`flex  py-1`}>
                <HiCog8Tooth
                  className={`${buttonSizingW} ${buttonSizingH} fill-sky-50`}
                />
              </div>
            </div>
          )}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={` ${buttonSizingW} flex items-center justify-center gap-2 overflow-hidden ${buttonDirectionClass} border border-transparent p-2 transition-iconButton ease-in-out focus-within:border-sky-50  hover:border-sky-50`}
          >
            {drawerOpen ? (
              <HiArrowUpTray
                className={`${buttonIconSizing} rotate-90 fill-sky-50`}
              />
            ) : (
              <HiArrowDownTray
                className={`${buttonIconSizing} rotate-90 fill-sky-50`}
              />
            )}
          </button>
        </div>

        <DrawerContent drawerOpen={drawerOpen} />
      </div>
    </>
  );
};
