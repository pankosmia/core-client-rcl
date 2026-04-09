import { Header } from "../rcl";

function HeaderDemo() {
  return (
    <Header
      titleKey={"test"}
      widget={<div>widget</div>}
      currentId={"core-client-rcl"}
      //showInternetSwitch={false}
    />
  );
}

export default HeaderDemo;
