"use client";

import { PulseLoader } from "react-spinners";


export default function ComponentLevelLoader(){

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
    </div>
  )
}












