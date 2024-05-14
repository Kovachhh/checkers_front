import React, { useState, useEffect } from "react";
import { Button, Spin, Typography } from "antd";
import { Row, Col, Card } from "antd";

import { Cell } from "../Cell";
import { getUser } from "../../api/user";

const { Title } = Typography;

export const Board = ({
  board,
  player1Id,
  player2Id,
  playerActiveId,
  loading,
  onFinish,
  onMove,
  currentUser,
}) => {
  const [activeCheckerID, setActiveCheckerID] = useState(null);
  const [activeCells, setActiveCells] = useState([]);
  const [boardState, setBoardState] = useState([]);

  const [firstPlayer, setFirstPlayer] = useState(null);
  const [secondPlayer, setSecondPlayer] = useState(null);

  const playerID_1 = player2Id;
  const playerID_2 = player1Id;
  const playerID_Active = playerActiveId;

  const { userId } = currentUser;

  const isViewer = userId !== playerID_1 && userId !== playerID_2;

  const getFirstPlayerData = async () => {
    const data = await getUser(playerID_1);

    if (data) {
      setFirstPlayer(data);
    }
  };

  const getSecondPlayerData = async () => {
    const data = await getUser(playerID_2);

    if (data) {
      setSecondPlayer(data);
    }
  };

  useEffect(() => {
    setBoardState(board);
  
    getFirstPlayerData();
    getSecondPlayerData();
  }, [board]);

  if (!boardState) {
    return null;
  };

  const findCheckerById = ({ id }) => {
    return boardState.find((item) => item.id === id);
  };

  const findCheckerByXY = ({ x, y }) => {
    return boardState.find((item) => item.x === x && item.y === y);
  };

  const checkMove = (checker, target) => {
    const checkerInCell = findCheckerByXY({ x: target.x, y: target.y });
  
    if (checkerInCell && checker.player !== checkerInCell.player) {
      if (checker.x > target.x && checker.y > target.y) {
        checkMove(
          { ...checker, x: target.x, y: target.y },
          { x: target.x - 1, y: target.y - 1 }
        );
      }

      if (checker.x < target.x && checker.y > target.y) {
        checkMove(
          { ...checker, x: target.x, y: target.y },
          { x: target.x + 1, y: target.y - 1 }
        );
      }

      if (checker.x > target.x && checker.y < target.y) {
        checkMove(
          { ...checker, x: target.x, y: target.y },
          { x: target.x - 1, y: target.y + 1 }
        );
      }

      if (checker.x < target.x && checker.y < target.y) {
        checkMove(
          { ...checker, x: target.x, y: target.y },
          { x: target.x + 1, y: target.y + 1 }
        );
      }

      return;
    }

    if (!checkerInCell) {
      setActiveCells((cells) => [...cells, { x: target.x, y: target.y }]);
    }
  };

  const calculateMoves = ({ id, x, y }) => {
    setActiveCells([]);

    const selectedChecker = findCheckerById({ id });

    if (selectedChecker.player === "first") {
      if (selectedChecker.type === "default") {
        checkMove(selectedChecker, { x: x - 1, y: y + 1 });
        checkMove(selectedChecker, { x: x + 1, y: y + 1 });
      }
      if (selectedChecker.type === "king") {
        checkMove(selectedChecker, { x: x - 1, y: y + 1 });
        checkMove(selectedChecker, { x: x + 1, y: y + 1 });
        checkMove(selectedChecker, { x: x + 1, y: y - 1 });
        checkMove(selectedChecker, { x: x - 1, y: y - 1 });
      }
    }

    if (selectedChecker.player === "second") {
      if (selectedChecker.type === "default") {
        checkMove(selectedChecker, { x: x + 1, y: y - 1 });
        checkMove(selectedChecker, { x: x - 1, y: y - 1 });
      }
      if (selectedChecker.type === "king") {
        checkMove(selectedChecker, { x: x - 1, y: y + 1 });
        checkMove(selectedChecker, { x: x + 1, y: y + 1 });
        checkMove(selectedChecker, { x: x - 1, y: y - 1 });
        checkMove(selectedChecker, { x: x + 1, y: y - 1 });
      }
    }
  };

  const onClick = ({ id, x, y }) => {
    if (isViewer) {
      return;
    }; 

    if (userId !== playerID_Active) {
      return;
    }
  
    if ((x + y) % 2) {
      setActiveCells([]);
      setActiveCheckerID(null);
  
      return;
    }

    const checker = findCheckerById({ id });

    if (checker && checker.player === "first" && userId !== playerID_1) {
      return;
    };

    if (checker && checker.player === "second" && userId !== playerID_2) {
      return;
    };

    if (activeCheckerID === id) {
      setActiveCells([]);
      setActiveCheckerID(null);

      return;
    }

    if (id) {
      calculateMoves({ id, x, y });
      setActiveCheckerID(id);
      return;
    }

    if (activeCheckerID) {
      const target = findCheckerByXY({ x, y });
      const move = activeCells.find((cell) => cell.x === x && cell.y === y);

      if (!target && move) {
        onMove({
          id: activeCheckerID,
          target: {
            x,
            y,
          },
        });

        setActiveCells([]);
        setActiveCheckerID(null);
      }
    }
  };

  const cells = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const checker = findCheckerByXY({ x, y });
      cells.push(
        <Col>
          <Cell
            key={`${y}${x}`}
            checker={checker}
            x={x}
            y={y}
            onClick={onClick}
            activeCheckerID={activeCheckerID}
            active={activeCells.find((cell) => cell.x === x && cell.y === y)}
          />
        </Col>
      );
    }
  }

  return (
    <Row justify="center" align="middle">
      <Col flex={1}>
        <Title style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "#e26b6b" }}>{firstPlayer?.username}</span>
          <span> проти </span>
          <span style={{ color: "#1890ff" }}>{secondPlayer?.username}</span>
        </Title>
      </Col>
      <Col span={24}></Col>
      <Col style={{ marginTop: "20px" }}>
        <Spin spinning={loading}>
          <Card>
            <Row
              gutter={0}
              justify="center"
              align="middle"
              wrap={true}
              style={{
                border: "1px solid #ddd",
                width: "402px",
              }}
            >
              {cells}
            </Row>
          </Card>
        </Spin>
      </Col>
      <Col span={24}></Col>
      <Col style={{ marginTop: "20px" }}>
        <Title style={{ textAlign: "center" }}>
          {isViewer ? (
            <span>Ви в режимі спостерігача!</span>
          ) : userId === playerID_Active ? (
            <span>Ваш хід</span>
          ) : playerID_Active === playerID_1 ? (
            <span>
              Ходить:{" "}
              <span style={{ color: "#e26b6b" }}>{firstPlayer?.username}</span>
            </span>
          ) : (
            <span>
              Ходить:{" "}
              <span style={{ color: "#1890ff" }}>{secondPlayer?.username}</span>
            </span>
          )}
        </Title>
      </Col>
      <Col span={24}></Col>
      <Col style={{ marginTop: "50px" }}>
        <Button type="primary" danger onClick={onFinish}>
          Здатися
        </Button>
      </Col>
    </Row>
  );
};
