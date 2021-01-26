import { useEffect, useState } from "react";

const UserInfoComp = () => {
  const [hostType, setHostType] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    showInfoAboutDevice();
  }, []);

  const setInfo = (deviceInfo) => {
    console.log(deviceInfo);
    switch (deviceInfo) {
      case "Android WebView":
        {
          setHostType("mobile-webview");
          setDeviceType("mobile");
          setDeviceName("android");
        }
        break;
      case "IOS WebView":
        setHostType("mobile-webview");
        setDeviceType("mobile");
        setDeviceName("iphone");
        break;
      case "iPhone":
        setHostType("mobile-browser");
        setDeviceType("mobile");
        setDeviceName("iphone");
        break;
      case "iPad":
        setHostType("desktop-browser");
        setDeviceType("desktop");
        setDeviceName("ipad");
        break;
      case "iPod":
        setHostType("desktop-browser");
        setDeviceType("desktop");
        setDeviceName("ipad");
        break;
      case "Android Device":
        setHostType("mobile-browser");
        setDeviceType("mobile");
        setDeviceName("android");
        break;
      case "pc":
        setHostType("desktop-browser");
        setDeviceType("desktop");
        setDeviceName("pc");
        break;
      default:
    }
  };

  const showInfoAboutDevice = () => {
    navigator.userAgent.match(/wv/i)
      ? setInfo("Android WebView")
      : navigator.userAgent.match(/Mobile/i) &&
        !navigator.userAgent.match(/Safari/i)
      ? setInfo("IOS WebView")
      : navigator.userAgent.match(/iPhone/i)
      ? setInfo("iPhone")
      : navigator.userAgent.match(/iPad/i)
      ? setInfo("iPad")
      : navigator.userAgent.match(/iPod/i)
      ? setInfo("iPod")
      : navigator.userAgent.match(/Android/i)
      ? setInfo("Android Device")
      : setInfo("pc");
  };

  return (
    <div className="App-header">
      <h5>Host Type : {hostType}</h5>
      <h5>Device Type : {deviceType}</h5>
      <h5>Device Name : {deviceName}</h5>
    </div>
  );
};
export default UserInfoComp;
