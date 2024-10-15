import { useEffect } from "react";
import "./CircularProgress.css";
import React from "react";

interface CircularProgressProps {
  value: number;
}


export const CircularProgress = ({ value }: CircularProgressProps) => {
  const ref = React.createRef<HTMLDivElement>();
  useEffect(() => {
    if(!ref.current) return;
    ref.current.style.setProperty("--progress",value + '%');
    ref.current.setAttribute('data-value',value.toString());
  },[ref, value])
  return (
    <div ref={ref} className="progress" data-value={value}>
    </div>
  );
};
