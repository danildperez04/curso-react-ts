import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export function useActivity() {
  const context = useContext(ActivityContext);
  return context;
}