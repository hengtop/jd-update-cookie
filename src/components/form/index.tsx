import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { updateCookie } from "../../request/api";
import { successMsg, errorMsg, defaultMsg } from "../../utils";

export interface SubmitValues {
  name: string;
  password: string;
  newCookie: string;
}

const form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<SubmitValues>();
  const onFinish = async (values: SubmitValues) => {
    setIsLoading(true);
    try {
      const res = await updateCookie(values);
      // 判断响应内容
      switch (res?.message) {
        case "password error":
          errorMsg(res?.message);
          break;
        case "success":
          successMsg(res?.message);
          break;
        default:
          defaultMsg(res?.message);
      }
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
      style={{
        position: "relative",
      }}
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
        <Input placeholder="ck_名字首字母拼音" />
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
        <Input.Password placeholder="忘记了就填666@666" />
      </Form.Item>
      <Form.Item
        className="text-area"
        label="凭证/Cookie"
        name="newCookie"
        rules={[
          {
            required: true,
            message: "请填写你的cookie",
          },
          {
            pattern: /^(pt_key.*pt_pin.*)|(pt_pin.*pt_key.*)$/g,
            message: "请填写正确格式cookie",
          },
        ]}
      >
        <Input.TextArea
          placeholder="cookie格式  pt_key=xxxxx; pt_pin=xxxxx; 校验了的哈~"
          rows={3}
        />
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
