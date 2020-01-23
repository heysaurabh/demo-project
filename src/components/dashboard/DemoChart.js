import React, { Component } from "react";
import { Card } from "antd";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

function MessageChart(props) {
  return (
    <ResponsiveContainer minHeight={200} maxHeight={1200}>
      <LineChart data={props.data}>
        <XAxis dataKey="time" tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          wrapperStyle={{
            border: "none",
            boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.05)",
            textTransform: "capitalize"
          }}
          content={content => {
            if (content.payload) {
              const list = content.payload.map((item, key) => {
                if (item.name === "uv") {
                  return (
                    <span key={key}>
                      {`Value %: ${item.value}%`}
                    </span>
                  );
                } else {
                  return <span key={key}>{`Value: ${item.value}`}</span>;
                }
              });
              return (
                <div className="tooltip">
                  <p key="1" className="tiptitle">
                    {content.label}
                  </p>
                  <p key="2">{list}</p>
                </div>
              );
            }
          }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#1890ff"
          dot={{ fill: "#1890ff", strokeWidth: 2 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

class DemoChart extends Component {
  render() {
    return (
      <div style={{ marginTop: 16 }}>
        <Card className="messageChart" bordered={false}>
          <MessageChart data={data} />
        </Card>
      </div>
    );
  }
}

export default DemoChart;
