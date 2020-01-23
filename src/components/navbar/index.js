import React, { Component } from "react";
import moment from "moment";

import {
  Menu,
  Dropdown,
  Button,
  DatePicker,
  Layout,
  Row,
  Col,
  Icon
} from "antd";

const { Header } = Layout;
const { RangePicker } = DatePicker;

function PlatformDropdown(handleClick, platforms, platformValue) {
  const menu = (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[platforms[0]]}
      selectedKeys={[platformValue]}
    >
      {platforms.map(item => (
        <Menu.Item
          key={item}
          value={item}
          style={{ textTransform: "capitalize" }}
        >
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );
  return menu;
}

function GranularityDropdown(handleClick, granularityValue) {
  const menu = (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={["daily"]}
      selectedKeys={[granularityValue]}
    >
      <Menu.Item key="hourly">Hourly</Menu.Item>
      <Menu.Item key="daily">Daily</Menu.Item>
      <Menu.Item key="monthly">Monthly</Menu.Item>
    </Menu>
  );
  return menu;
}

function GetDatePicker(granularity, startTime, endTime, onChange) {
  let datePickerFormat = "YYYY/MM/DD";
  let mode = ["date", "date"];
  if (granularity === "monthly") {
    mode = ["month", "month"];
    datePickerFormat = "YYYY/MM";
    startTime = startTime.startOf("month");
    endTime = endTime.endOf("month");
  }

  const disabledEndMonth = current => {
    return current.valueOf() > Date.now();
  };

  return (
    <RangePicker
      defaultValue={[startTime, endTime]}
      format={datePickerFormat}
      value={[startTime, endTime]}
      placeholder={["Start Time", "End Time"]}
      onPanelChange={onChange}
      onChange={onChange}
      disabledDate={disabledEndMonth}
      mode={mode}
      style={{ marginLeft: 8, width: 250, textAlign: "left" }}
    />
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonDisabled: true,
      defaultPlatformText: "Web",
      granularityText: "Daily",
      requestData: {
        platformValue: "web",
        granularityValue: "daily",
        startTime: moment().subtract(7, "d"),
        endTime: moment()
      }
    };
  }

  handlePlatformMenuClick = e => {
    let requestData = { ...this.state.requestData };
    requestData.platformValue = e.key;

    this.setState({
      requestData,
      defaultPlatformText: e.item.props.children,
      buttonDisabled: false
    });
  };

  handleGranularityMenuClick = e => {
    let requestData = { ...this.state.requestData };
    requestData.granularityValue = e.key;

    this.setState({
      requestData,
      granularityText: e.item.props.children,
      buttonDisabled: false
    });
  };

  onDateChange = value => {
    let requestData = { ...this.state.requestData };
    requestData.startTime = value[0];
    requestData.endTime = value[1];

    this.setState({ requestData, buttonDisabled: false });
  };

  render() {
    const { granularityText, defaultPlatformText, buttonDisabled } = this.state;
    const {
      startTime,
      endTime,
      granularityValue,
      platformValue
    } = this.state.requestData;
    const platforms = ["web", "workplace"];

    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Row gutter={16} style={{ margin: "20px 0px 20px 25px" }}>
          <Col span={4}>
            <h2>Demo Dashboard</h2>
          </Col>
          <Col span={20} style={{ textAlign: "right" }}>
            <Dropdown
              trigger={["click"]}
              overlay={PlatformDropdown(
                this.handlePlatformMenuClick,
                platforms,
                platformValue
              )}
            >
              <Button
                style={{
                  marginLeft: 8,
                  width: 120,
                  textTransform: "capitalize",
                  textAlign: "left"
                }}
              >
                {defaultPlatformText}
                <Icon type="down" style={{ marginTop: 4, float: "right" }} />
              </Button>
            </Dropdown>
            <Dropdown
              trigger={["click"]}
              overlay={GranularityDropdown(
                this.handleGranularityMenuClick,
                granularityValue
              )}
            >
              <Button style={{ marginLeft: 8, width: 120, textAlign: "left" }}>
                {granularityText}
                <Icon type="down" style={{ marginTop: 4, float: "right" }} />
              </Button>
            </Dropdown>
            {GetDatePicker(
              granularityValue,
              startTime,
              endTime,
              this.onDateChange
            )}
            <Button
              type="primary"
              onClick={this.fetchData}
              style={{ marginLeft: 8 }}
              disabled={buttonDisabled}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default Navbar;
