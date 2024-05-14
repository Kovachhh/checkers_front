import React from "react";
import { get } from "lodash";

import { Checker } from "../Checker";

export const Cell = ({
  x,
  y,
  checker = null,
  activeCheckerID,
  active,
  onClick,
}) => {
  let bg = (x + y) % 2 ? "#ddd" : "#fff";
  if (active) {
    bg = "yellow";
  }

  return (
    <div
      id={`${y}${x}`}
      style={{
        backgroundColor: bg,
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => onClick({ x, y, id: get(checker, "id", null) })}
    >
      {checker && (
        <Checker
          key={checker.id}
          id={checker.id}
          type={checker.type}
          player={checker.player}
          isActive={checker.id === activeCheckerID}
        />
      )}
    </div>
  );
};
