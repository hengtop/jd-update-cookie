import { message } from "antd";

message.config({
  duration: 1.5,
});

export const successMsg = (content: string) => {
  message.success(content || "成功");
};

export const errorMsg = (content: string) => {
  message.error(content || "错误");
};

export const defaultMsg = (content: string) => {
  message.info(content);
};
