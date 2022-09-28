import { Button, Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { updateCookie } from "../../request/api";
import { successMsg, errorMsg } from "../../utils";

export interface SubmitValues {
  name: string;
  password: string;
  newCookie: string;
}

const text = `
  目前需要自行登录 m.jd.com 打开控制台找到cookie中的一段字符串，
  格式如下：pt_key=xxx; pt_pin=xxx;
`;

const form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<SubmitValues>();
  const onFinish = async (values: SubmitValues) => {
    setIsLoading(true);
    try {
      await updateCookie(values);
      // 判断响应内容
      successMsg("更新成功");
    } catch (error) {
      errorMsg("请求错误");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <Form
      form={form}
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
        <Input.TextArea
          placeholder="cookie格式  pt_key=xxxxx; pt_pin=xxxxx;"
          rows={3}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "-18px",
          }}
        >
          <Tooltip placement="topRight" title={text}>
            <InfoCircleOutlined />
          </Tooltip>
        </div>
      </Form.Item>

      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              margin: "0 5px",
            }}
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            更新
          </Button>
          <Button type="primary" onClick={handleClickReset}>
            重置
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default form;
