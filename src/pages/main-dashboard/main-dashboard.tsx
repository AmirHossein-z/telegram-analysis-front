import { AiFillEye } from "react-icons/ai";
import { Stat } from "../../components";
import { StatContainer } from "../../containers";
import { ChannelStat } from "./components";

const MainDashboard = () => {
  return (
    <>
      <StatContainer>
        <Stat title="تعداد کانال ها" value={12} icon={<AiFillEye />} />
      </StatContainer>
      <p>تعداد مقالات منتشر شده</p>
      <p>(پست هایی با تاریخ ساختشون رو بگیر)</p>
      <p>در هر ماه و تا یک سال گذشته</p>
      <ChannelStat />
    </>
  );
};

export default MainDashboard;
