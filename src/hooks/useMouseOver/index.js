import { useCallback, useEffect } from "react";

const ADD_EVENTLISTENER = "ADD";
const REMOVE_EVENTLISTENER = "REMOVE";

const useMouseOver = () => {
  const addClassToBubble = useCallback((event, item) => {
    if (!item.classList.contains("popped")) {
      item.classList.add(...["popped"]);
      item.nextSibling.play();
    }
  }, []);

  const handleEventListeners = useCallback(
    (action) => {
      const columns = document.getElementsByClassName("column");

      for (let column of columns) {
        const items = column.getElementsByTagName("div");
        for (let item of items) {
          if (action === ADD_EVENTLISTENER) {
            item.addEventListener("mouseover", (event) =>
              addClassToBubble(event, item)
            );
          } else if (action === REMOVE_EVENTLISTENER) {
            item.removeEventListener("mouseover", (event) =>
              addClassToBubble(event, item)
            );
          }
        }
      }
    },
    [addClassToBubble]
  );

  useEffect(() => {
    handleEventListeners(ADD_EVENTLISTENER);

    return () => {
      handleEventListeners(REMOVE_EVENTLISTENER);
    };
  }, [handleEventListeners]);
};

export default useMouseOver;
