import React, { useState } from "react";
import { Table, Switch } from "antd";

const App1 = () => {
  // 初始数据，部分 Switch 被禁用（默认开启）
  const initialData = [
    { key: "1", name: "Item 1", checked: false, disabled: false },
    { key: "2", name: "Item 2", checked: true, disabled: true }, // 禁用且默认开启
    { key: "3", name: "Item 3", checked: false, disabled: false },
  ];

  const [data, setData] = useState(initialData);
  const [allChecked, setAllChecked] = useState(false);

  // 处理单个 Switch 变化
  const handleSwitchChange = (key, checked) => {
    const newData = data.map((item) =>
      item.key === key ? { ...item, checked } : item
    );
    setData(newData);

    // 只计算可操作的行，判断是否全选
    const selectableItems = newData.filter((item) => !item.disabled);
    const allSelected = selectableItems.every((item) => item.checked);
    setAllChecked(allSelected);
  };

  // 处理全选 Switch 变化
  const handleAllSwitchChange = (checked) => {
    setAllChecked(checked);
    const newData = data.map((item) =>
      item.disabled ? item : { ...item, checked }
    );
    setData(newData);
  };

  // 定义表格列
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "状态",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.checked}
          disabled={record.disabled} // 被禁用的默认打开，不能更改
          onChange={(checked) => handleSwitchChange(record.key, checked)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h3>全选开关（仅影响可操作项）：</h3>
      <Switch
        checked={allChecked}
        onChange={handleAllSwitchChange}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default App1;
