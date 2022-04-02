import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  initialState,
  setRunState,
} from "../../../store/features/run/runSlice";
import { Run } from "./Run";

export const New = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.run.loadNumber);

  useEffect(() => {
    if (state === 0) dispatch(setRunState(initialState));
  });

  return <Run />;
};
