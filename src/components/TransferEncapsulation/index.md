# 如果把 Transfer 当

## 业务组件封装

黑盒，数据来源、逻辑处理、页面展示都内部封装好，外部 Form.Item 只需要获取最终的 value。
用 Form.Item 的 value 去绑定值，用 onChange 去更新值

## 功能组件封装

数据来源外部管理，内部只负责逻辑处理，UI 由 Form.Item 传入。
也是用 Form.Item 的 value 去绑定值，用 onChange 去更新值

## Form

### value 和 onChange

```tsx
import React from "react";
import { Form, Input, Button } from "antd";

const CustomInput = (props) => {
  console.log(props); // { value: "...", onChange: f() }
  return <Input {...props} />;
};

const MyForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("提交的数据：", values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="username">
        <CustomInput />
      </Form.Item>
      <Button htmlType="submit">提交</Button>
    </Form>
  );
};

export default MyForm;
```

等价于

```tsx
<Form.Item name="username">
  <Input />
</Form.Item>

<Form.Item name="username">
  {(formProps) => <Input {...formProps} />}
</Form.Item>
```

所以其实 Input 的 onChange 是 Form.Item 的

Form.Item 自动传递 value 和 onChange，使 Input 成为受控组件。

### valuePropName

valuePropName 主要用于 Checkbox、Transfer 等非 value 作为受控属性的组件。

# 对复杂的数据来源

可以写做一个 hook，暴露出最后的数据，内部逻辑在 hook 里面写

## 总结

一个 Form 表单，可以封装自己的组件，数据由外部传入，当数据复杂，可以用 hook 去包一层，简化 index 的代码。如果想通过子组件去更改父组件的值，可以用 useImperativeHandle。

Form.Item 下最好只有一个组件，如果有两个相同的组件，可以封装一个基础组件，再封装一个包基础组件处理数据的组件，成为一个组件去使用。
