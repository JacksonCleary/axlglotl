import { useEffect, useRef } from "react";

/*
https://twitter.com/brunolemos/status/1090377532845801473
This hook makes it easy to see which prop changes are causing a component to re-render. 
If a function is particularly expensive to run and you know it renders the same results 
given the same props you can use the React.memo higher order component, as we've done 
with the Counter component in the below example. In this case if you're still seeing 
re-renders that seem unnecessary you can drop in the useWhyDidYouUpdate hook and check 
your console to see which props changed between renders and view their previous/current values. 
Pretty nifty huh?
*/

export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const latestProps = useRef(props);

  useEffect(() => {
    const allKeys = Object.keys({ ...latestProps.current, ...props });

    const changesObj: Record<string, { from: any; to: any }> = {};
    allKeys.forEach((key) => {
      if (latestProps.current[key] !== props[key]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        changesObj[key] = { from: latestProps.current[key], to: props[key] };
      }
    });

    if (Object.keys(changesObj).length) {
      // tslint:disable-next-line no-console
      console.log("[why-did-you-update]", name, changesObj);
    }

    latestProps.current = props;
  });
}
