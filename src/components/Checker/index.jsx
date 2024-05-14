import React from "react";
import { CrownOutlined } from "@ant-design/icons";

export const Checker = ({ id, player, isActive, type }) => {
  if (!id) return null;

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "40px",
        cursor: "pointer",
        backgroundColor: player === "second" ? "#1890ff" : "#e26b6b",
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: isActive ? "#c7c9cb" : "transparent",
      }}
    >
      {type === "king" && (
        <CrownOutlined
          style={{
            color: player === "second" ? "#000" : "#fff",
            fontSize: "33px",
          }}
        />
      )}
    </div>
  );
};
