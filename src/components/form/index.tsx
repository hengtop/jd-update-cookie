import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { updateCookie } from "../../request/api";
import { successMsg, errorMsg } from "../../utils";

export interface SubmitValues {
  name: string;
  password: string;
  newCookie: string;
}

const form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: SubmitValues) => {
    setIsLoading(true);
    try {
      const res = await updateCookie(values);
      // 判断响应内容
      successMsg("更新成功");
    } catch (error) {
      errorMsg("请求错误");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        md: 14,
        sm: 16,
        xl: 16,
        xxl: 16,
        xs: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="用户名/Name"
        name="name"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码/Password"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入你的密码",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="凭证/Cookie"
        name="newCookie"
        rules={[
          {
            required: true,
            message: "请填写你的cookie",
          },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button loading={isLoading} type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>
  );
};

export default form;
