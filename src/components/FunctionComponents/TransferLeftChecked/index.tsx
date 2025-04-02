import { Transfer } from "antd";
import React from "react";
import { useState } from "react";

const mockData = Array.from({ length: 10 }, (_, i) => ({
  key: i.toString(),
  title: `Item ${i + 1}`,
  disabled: i % 2 === 0, // 偶数项禁用，奇数项可操作
}));

const disabledKeys = mockData
  .filter((item) => item.disabled)
  .map((item) => item.key); // 获取所有禁用项的 key

const App3 = () => {
  const [targetKeys, setTargetKeys] = useState<any>([]); // 目标列表为空，用户可自行移动
  const [selectedKeys, setSelectedKeys] = useState<any>(disabledKeys); // 让禁用的项默认选中

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys} // 右侧列表
      selectedKeys={selectedKeys} // 让禁用的数据默认打钩
      onChange={(nextTargetKeys) => {
        setTargetKeys(
          nextTargetKeys.filter((key: any) => !disabledKeys.includes(key))
        ); // 防止禁用数据进入右侧
      }}
      onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
        // 只更新非禁用项的勾选状态
        setSelectedKeys([
          ...disabledKeys,
          ...sourceSelectedKeys.filter(
            (key: any) => !disabledKeys.includes(key)
          ),
        ]);
      }}
      render={(item) => item.title}
    />
  );
};

export default App3;
