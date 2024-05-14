import React from "react";
import moment from "moment";
import { get } from "lodash";
import { Button, Card, Table, Descriptions, Space, Row, Col } from "antd";
import { PlusOutlined, EnterOutlined, DeleteOutlined } from "@ant-design/icons";
import { onFinishGame } from "../../api/game";

export const GamesAwaiting = ({
  data,
  loading,
  currentUser,
  onAcceptGame,
  toggleModal,
  createGameLoader,
}) => {
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Гравець",
      dataIndex: "firstPlayer",
      key: "firstPlayer",
      render: (player) => player.username,
    },
    {
      title: "Час створенння",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD.MM.YYYY hh:mm"),
    },
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (_id, row) =>
        get(row, "activePlayer._id", null) ===
        get(currentUser, "userId", null) ? (
          ""
        ) : (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => onAcceptGame(_id)}
              icon={<EnterOutlined />}
            >
              Приєднатися
            </Button>
          </Space>
        ),
    },
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (_id, row) =>
        get(row, "activePlayer._id", null) ===
        get(currentUser, "userId", null) ? (
          <Space size="middle">
            <Button
              type="primary"
              danger
              onClick={() => onFinishGame(_id)}
              icon={<DeleteOutlined />}
            >
              Видалити
            </Button>
          </Space>
        ) : null,
    },
  ];

  return (
    <Card style={{ marginTop: "20px" }}>
      <Descriptions title="Очікують:" />
      <Table
        columns={columns}
        dataSource={data}
        tableLayout="auto"
        pagination={false}
        loading={loading}
        locale={{ emptyText: "Ігри не знайдено" }}
      />
      <Row align="middle" justify="center" style={{ margin: "20px" }}>
        <Col>
          <Button
            type="primary"
            onClick={toggleModal}
            loading={createGameLoader}
            icon={<PlusOutlined />}
          >
            Створити гру
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
