import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Select, Modal, Radio } from "antd";
import { useWatch } from "antd/es/form/Form";
import { insuranceModalOption, records, resetFields } from "./constants.ts";

const FormVerification = () => {
  const [form] = Form.useForm();

  const [operationType, setOperationType] = useState<any>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<any>(false);

  const prevValueRef = useRef<any>(null);

  const insurerName = useWatch("insurerName", form);
  const pattern = useWatch("pattern", form);
  const insureServiceType = useWatch("insureServiceType", form);
  const existMpConfig = useWatch("existMpConfig", form);

  const onClaimModalCancel = () => {
    form.resetFields();
    setIsClaimModalOpen(false);
    prevValueRef.current = null;
  };

  const goNextStep = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((errorInfo) => {
        console.log("校验失败", errorInfo);
      });
  };

  /** 编辑配置 */
  const editInsurance = () => {
    setOperationType("edit");
    setIsClaimModalOpen(true);
    form.setFieldsValue(records);
  };

  /** 复制配置 */
  const copyInsurance = () => {
    setOperationType("copy");
    setIsClaimModalOpen(true);
    prevValueRef.current = JSON.stringify(records);
    form.setFieldsValue(records);
  };

  useEffect(() => {
    if (!prevValueRef.current) return;
    if (operationType === "add") {
      form.setFields(resetFields);
    }
    if (
      operationType === "copy" &&
      prevValueRef.current !== JSON.stringify(form.getFieldsValue(true))
    ) {
      form.setFields(resetFields.filter((item, index) => index !== 0));
    }
    // 修改的过程中不可能走到这，因为选择一样的值，是不会触发这个useEffect的
    // 即便最后表单的值和初始化的值一样，也不可能是因为触发了这个useEffect，因为一旦触发这个useEffect，下面的都清空了
    // 所以prevValueRef.current !== JSON.stringify(form.getFieldsValue(true))这个判断条件，既阻止了初始化清空，也实现了表单格式化，因为只要换值，永远都是!==
    if (
      operationType === "copy" &&
      prevValueRef.current === JSON.stringify(form.getFieldsValue(true))
    ) {
      console.log(111);
    }
  }, [operationType, form, insurerName]);

  useEffect(() => {
    if (!prevValueRef.current) return;
    if (operationType === "add") {
      form.setFields(resetFields.filter((item, index) => index === 1));
    }
    if (
      operationType === "copy" &&
      prevValueRef.current !== JSON.stringify(form.getFieldsValue(true))
    ) {
      form.setFields(resetFields.filter((item, index) => index === 1));
    }
  }, [operationType, form, pattern]);

  useEffect(() => {
    if (!prevValueRef.current) return;
    if (operationType === "add") {
      form.setFields(resetFields.filter((item, index) => index === 2));
    }
    if (
      operationType === "copy" &&
      prevValueRef.current !== JSON.stringify(form.getFieldsValue(true))
    ) {
      form.setFields(resetFields.filter((item, index) => index === 2));
    }
  }, [operationType, form, insureServiceType]);

  return (
    <>
      <Button
        onClick={() => {
          setIsClaimModalOpen(true);
          setOperationType("add");
          form.setFields([
            {
              name: "existMpConfig",
              value: 1,
              errors: [],
            },
          ]);
          prevValueRef.current = JSON.stringify(form.getFieldsValue(true));
        }}
      >
        add
      </Button>
      <Button onClick={copyInsurance}>copy</Button>
      <Button onClick={editInsurance}>edit</Button>
      <Modal
        title={
          operationType === "add"
            ? "新增配置"
            : operationType === "copy"
            ? "复制"
            : operationType === "edit"
            ? "编辑"
            : ""
        }
        open={isClaimModalOpen}
        onCancel={onClaimModalCancel}
        footer={
          <>
            {existMpConfig === 1 ? (
              <Button
                key="next"
                type="primary"
                htmlType="submit"
                onClick={goNextStep}
              >
                下一步
              </Button>
            ) : (
              <Button
                key="confirm"
                type="primary"
                htmlType="submit"
                onClick={goNextStep}
              >
                确定
              </Button>
            )}
          </>
        }
        modalRender={(modal) => {
          return <Form form={form}>{modal}</Form>;
        }}
      >
        <Form.Item
          label="保险公司"
          name="insurerName"
          rules={[{ required: true, message: "请选择保险公司" }]}
        >
          <Select
            key="insurerName"
            placeholder="请选择"
            options={insuranceModalOption}
            disabled={operationType === "edit"}
            allowClear
          />
        </Form.Item>
        <Form.Item noStyle dependencies={["insurerName"]}>
          {({ getFieldValue }) => {
            const insurerName = getFieldValue("insurerName");
            return (
              <Form.Item
                label="接入模式"
                name="pattern"
                rules={[{ required: true, message: "请选择接入模式" }]}
              >
                <Select
                  placeholder="请选择"
                  options={[
                    { label: "伤啥", value: "123" },
                    { label: "色道", value: "23" },
                  ]}
                  disabled={
                    (operationType === "add" && !insurerName) ||
                    operationType === "copy" ||
                    operationType === "edit"
                  }
                  allowClear
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item
          noStyle
          dependencies={
            operationType === "copy" ? ["insurerName"] : ["pattern"]
          }
        >
          {({ getFieldValue }) => {
            const pattern = getFieldValue("pattern");
            const insurerName = getFieldValue("insurerName");

            return (
              <Form.Item
                label="作业模式"
                name="insureServiceType"
                rules={[{ required: true, message: "请选择作业模式" }]}
              >
                <Select
                  placeholder="请选择"
                  options={[
                    { label: "伤啥", value: "123" },
                    { label: "色道", value: "23" },
                  ]}
                  disabled={
                    (operationType === "add" && (!insurerName || !pattern)) ||
                    (operationType === "copy" && !insurerName) ||
                    operationType === "edit"
                  }
                  allowClear
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item
          noStyle
          dependencies={
            operationType === "copy"
              ? ["insurerName", "insureServiceType"]
              : ["insureServiceType"]
          }
        >
          {({ getFieldValue }) => {
            const insurerName = getFieldValue("insurerName");
            const pattern = getFieldValue("pattern");
            const insureServiceType = getFieldValue("insureServiceType");

            return (
              <Form.Item
                label="作业流程"
                name="workProcess"
                rules={[{ required: true, message: "请选择作业流程" }]}
              >
                <Select
                  placeholder="请选择"
                  options={[
                    { label: "伤啥", value: "123" },
                    { label: "色道", value: "23" },
                  ]}
                  disabled={
                    (operationType === "add" &&
                      (!insurerName || !pattern || !insureServiceType)) ||
                    (operationType === "copy" &&
                      (!insurerName || !insureServiceType)) ||
                    operationType === "edit"
                  }
                  allowClear
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item noStyle dependencies={["insurerName"]}>
          {() => {
            return (
              <Form.Item
                label="小程序页配置"
                name="existMpConfig"
                rules={[{ required: true, message: "请选择小程序页配置" }]}
                tooltip="开启后，新增小程序上线配置时可以将该条配置应用到医院"
              >
                <Radio.Group>
                  <Radio value={1}> 开启 </Radio>
                  <Radio value={0}> 关闭 </Radio>
                </Radio.Group>
              </Form.Item>
            );
          }}
        </Form.Item>
      </Modal>
    </>
  );
};
export default FormVerification;

// {({ getFieldValue }) => {}}触发就表示已经切换值了
// 不能在{({ getFieldValue }) => {}}中直接form.set，因为 在 render 期间调用了 setState。也不能在里面写useEffect
// {({ getFieldValue, getFieldsValue, setFieldsValue, setFieldValue, resetFields, validateFields, isFieldTouched, isFieldValidating }) => {}}虽然有这么多，但是set部分都不能直接用，需要return在button之类的上面
// 在{({ getFieldValue }) => {}}中就可以不用去管他是换选项还是清空选项的操作了，useWatch也是
// 善于使用useRef，他的更新不能写在useEffect的依赖里面
// ref 的 .current 变化 不会 触发组件重新渲染。
// 善于使用useWatch
// dependencies是依赖项，使用dependencies的时候不能加name

// form.set的时候是value他会找到对应的label去做映射
// form.get的时候拿到的都是value
// setFieldsValue和setFields不一样

// 把重复的东西提取出来，有时候可以明确思路
// 要一开始就做好，不要写完再去优化

// 如果 form.setFields 直接设置了 value 而不是 { label, value }，那么 labelInValue 不会正确显示。

// 动态字段时你才应该使用 Item 的 initialValue 属性，而不是 Form 的 initialValues 属性。

// 常量定义不用useMemo包，直接写外面就好了

// 监听form.item的值实时变化的三种方法：1、{({ getFieldValue }) => {}} 2、useWatch 3、onValueChange
// 1**不能**去form.set改变值，但是可以判断是值修改还是清空状态
// 2能通过useEffect改变值，也可以判断是值修改还是清空状态
// 3能通过onValueChange改变值，但是需要**手动**判断是值修改还是清空状态
