import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { get } from "lodash";
import { Button, Space, Table, Descriptions, Card } from "antd";
import { EnterOutlined, EyeOutlined } from "@ant-design/icons";

export const GamesOnline = ({ data, loading, currentUser }) => {
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Гравці",
      dataIndex: "users",
      key: "users",
      render: (name, data) =>
        `${data.firstPlayer.username}, ${data.secondPlayer.username}`,
    },
    {
      title: "Тривалість гри",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        `~${(moment(moment()).diff(createdAt) / (1000 * 60)).toFixed(0)} хв`,
    },
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (_id, row) => (
        <Space size="middle">
          {[
            get(row, "firstPlayer._id", null),
            get(row, "secondPlayer._id", null),
          ].includes(get(currentUser, "userId", null)) ? (
            <Button type="primary" icon={<EnterOutlined />}>
              <Link to={`/games/${_id}`}>Грати</Link>
            </Button>
          ) : (
            <Button type="primary" icon={<EyeOutlined />}>
              <Link to={`/games/${_id}`}>Спостерігати</Link>
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ marginTop: "20px" }}>
      <Descriptions title="Онлайн:" />
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        loading={loading}
        locale={{ emptyText: "Ігри не знайдено" }}
      />
    </Card>
  );
};
