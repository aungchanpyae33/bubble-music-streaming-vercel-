"use client";

import { getUserLibClient } from "@/database/client-data";
import {
  isDelInPageViewActions,
  isDelInPageViewState,
  useIsDelInPageView,
} from "@/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function ConditonalRenderPlaylist({
  id,
  OwnEditable,
  ViewAsOther,
}: {
  id: string;
  OwnEditable: React.JSX.Element;
  ViewAsOther: React.JSX.Element;
}) {
  const isDelInPageView = useIsDelInPageView(
    (state: isDelInPageViewState) => state.isDelInPageView,
  );
  const setIsDelInPageView = useIsDelInPageView(
    (state: isDelInPageViewActions) => state.setIsDelInPageView,
  );
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  // run side effect to reset del(zustand global state) in page view when component unmounts, which means user navigates away from playlist page
  useEffect(() => {
    return () => {
      if (isDelInPageView) {
        setIsDelInPageView(false);
      }
    };
  }, [isDelInPageView, setIsDelInPageView]);

  if (isDelInPageView) return OwnEditable;
  if (!queryData || queryError) return;
  const { data, error } = queryData || {};

  if (error?.name === "custom_auth_error") {
    return ViewAsOther;
  }

  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const { source } = userLib.byId[id] ?? { source: "none" };
  return source === "create" ? OwnEditable : ViewAsOther;
}

export default ConditonalRenderPlaylist;
