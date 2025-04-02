// import { Tabs } from "antd";
// import React from 'react';

// const TabsChangeUrl = () => {
//   const handleTabChange = (key) => {
//     const url = new URL(window.location.href);
//     url.searchParams.set("tab", key);
//     url.searchParams.set("current", "1");
//     url.searchParams.set("pageSize", "5");
//     window.history.pushState({}, "", url);
//   };

//   return (
//     <Tabs defaultActiveKey="demos" onChange={handleTabChange}>
//       <Tabs.TabPane tab="Demos" key="demos">
//         <p>这里是 Demos 内容</p>
//       </Tabs.TabPane>
//       <Tabs.TabPane tab="API" key="api">
//         <p>这里是 API 文档内容</p>
//       </Tabs.TabPane>
//     </Tabs>
//   );
// };
// export default TabsChangeUrl;

import { Tabs } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";

const TabsChangeUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "demos"; // 默认显示 Demos

  const handleTabChange = (key) => {
    if (key === "demos") {
      // 如果是 demos，清空 searchParams
      setSearchParams({});
    } else {
      // 否则，更新 searchParams
      setSearchParams({ tab: key, current: String(1), pageSize: String(5) });
    }
  };

  return (
    <Tabs activeKey={activeTab} onChange={handleTabChange}>
      <Tabs.TabPane tab="Demos" key="demos">
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
        <p>这里是 Demos 内容</p>
      </Tabs.TabPane>
      <Tabs.TabPane tab="API" key="api">
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
        <p>这里是 API 文档内容</p>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TabsChangeUrl;
