"use client";
import React from 'react';
import { Card, Col, Row, Statistic, Typography, Space } from 'antd';
import { Line, Pie, Column } from '@ant-design/charts';
import FormProject from "@/components/FormProject";

type LinePoint = { date: string; value: number };
type PieSlice = { type: string; value: number };
type ColumnPoint = { category: string; value: number };

const lineData: LinePoint[] = [
  { date: '2025-01', value: 30 },
  { date: '2025-02', value: 42 },
  { date: '2025-03', value: 38 },
  { date: '2025-04', value: 55 },
  { date: '2025-05', value: 61 },
];

const pieData: PieSlice[] = [
  { type: 'Web', value: 40 },
  { type: 'Mobile', value: 22 },
  { type: 'ML', value: 18 },
  { type: 'Research', value: 20 },
];

const columnData: ColumnPoint[] = [
  { category: 'Q1', value: 120 },
  { category: 'Q2', value: 160 },
  { category: 'Q3', value: 140 },
  { category: 'Q4', value: 190 },
];

export default function AntdPage() {
  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>Статистика</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Проекты" value={128} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Задачи" value={932} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Команды" value={14} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Доход, ₽" value={125000} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Динамика по месяцам">
            <Line data={lineData} xField="date" yField="value" point legend={false} smooth />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Распределение проектов">
            <Pie data={pieData} angleField="value" colorField="type" radius={0.8} label={{ text: 'type', position: 'spider' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Квартальные значения">
            <Column data={columnData} xField="category" yField="value" columnWidthRatio={0.6} />
          </Card>
        </Col>
      </Row>

      <Typography.Title level={3} style={{ marginTop: 24 }}>Создание проекта</Typography.Title>
      <Space direction="vertical" size={16} style={{ display: 'flex' }}>
        <FormProject />
      </Space>
    </div>
  );
}