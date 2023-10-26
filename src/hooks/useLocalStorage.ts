import { useEffect, useState } from "react";

// T is any type we pass into local storage
// this function will get the value from local storage or
// the initial value we passed into it CartItem[]
export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      //we have value in local storage
      return JSON.parse(jsonValue);
    }

    //if we don't have a value in local storage
    if (typeof initialValue === "function") {
      //we need to invoke it as a function
      return initialValue as () => T;
    } else {
      //return the initial value
      return initialValue;
    }
  });

  useEffect(() => {
    //runs everytime key and value changes
    //store value back in local storage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //speficially type it to avoid errors of always getting a set function in value
  return [value, setValue] as [typeof value, typeof setValue];
};
