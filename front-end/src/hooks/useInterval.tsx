import { useEffect, useRef } from "react";

export function useInterval(callback:any, delay:any) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
          if(typeof savedCallback.current=== "function"){
               // @ts-ignore
               savedCallback.current();
          }
       
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }