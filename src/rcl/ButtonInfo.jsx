import IconInfo from "./App/IconInfo";

export default function ButtonInfo({ title, color }) {
  return <IconInfo color={color} tooltipLabel={title} />;
}
