import { Tooltip, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Form from "./components/form";

const text = `
  目前需要自行登录 m.jd.com 打开控制台找到cookie中的一段字符串，
  格式如下：pt_key=xxx; pt_pin=xxx;
`;

function App() {
  return (
    <div className="App">
      <div className="title-container">
        <h3 className="title">JD-自助更新cookie</h3>
        <div
          style={{
            padding: "3px  5px 0",
          }}
        >
          <Tooltip placement="topRight" title={text}>
            <InfoCircleOutlined />
          </Tooltip>
        </div>
      </div>
      <a
        className="href-title"
        target="__blank"
        href="https://plogin.m.jd.com/login/login"
      >
        点击跳转jd登录页
      </a>
      <Form />
    </div>
  );
}

export default App;
