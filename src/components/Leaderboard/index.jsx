import React from 'react';
import moment from 'moment';
import { Card, Table, Descriptions } from 'antd';


export const Leaderboard = ({ data, loading, }) => {

    const columns = [
        {
          title: 'Гравець',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Зареєстрований',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (createdAt) => moment(createdAt).format('DD.MM.YYYY hh:mm'),
        },
        {
          title: 'Перемог',
          dataIndex: 'victories',
          key: 'victories',
        },
        {
          title: 'Поразок',
          dataIndex: 'losses',
          key: 'losses',
        },
      ];

    return (
        <Card style={{ marginTop: '20px' }}>
            <Descriptions title="Найкращі гравці:" />
            <Table 
                columns={columns} 
                dataSource={data} 
                tableLayout="auto" 
                pagination={false} 
                loading={loading}
                locale={{ emptyText: 'Гравців не знайдено' }}
            />
        </Card>
    );
}