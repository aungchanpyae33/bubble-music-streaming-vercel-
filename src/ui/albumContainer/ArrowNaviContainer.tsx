"use client";
import { useContext } from "react";
import { ContainerContext } from "./ContextContainer";

function ArrowNaviContainer() {
  const { arrowNaviRef } = useContext(ContainerContext);
  return <div className=" flex gap-1" ref={arrowNaviRef}></div>;
}

export default ArrowNaviContainer;
