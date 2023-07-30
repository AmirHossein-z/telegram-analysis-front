import { AiFillEye } from "react-icons/ai";
import { Pagination, Stat } from "../../components";
import { StatContainer } from "../../containers";
import { useAbortController, useApiPrivate } from "../../hooks";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-provider";
import { useSearchParams } from "react-router-dom";
import { IChannel } from "../../types";
import { getChannels } from "../../apis";
import { SelectTop10, Top10Share, Top10View } from "./components";

const MainDashboard = () => {
  return (
    <>
      <StatMainDashoard />
      <p>
        این صفحه باید لیست کانال هارو نشون بده و اگه یک کانال انتخاب شد (پر رنگ
        شد اون کانال نه اینکه بره صفحه بعد برترین پست هاشو از نظر ) view,share
        نشون بده برای اون کانال همچنین برای کانال انتخاب شده نمودار تغییرات
        view,share در طول زمان نشون داده بشه
      </p>
      <ChannelList />
    </>
  );
};

const StatMainDashoard = () => {
  return (
    <StatContainer>
      <Stat title="تعداد کانال ها" value={12} icon={<AiFillEye />} />
    </StatContainer>
  );
};

const ChannelList = () => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [selectTop10, setSelectTop10] = useState(false);

  const fetchChannels = async () => {
    try {
      setSearchParams({ page: pageInfo.currentPage.toString() });
      setLoading(true);
      const { data } = await getChannels(
        axiosPrivate,
        pageInfo.currentPage,
        parseInt(auth.userId),
        controller
      );
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
        currentPage: data.value?.current_page,
      });
      setChannels(data.value?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  useEffect(() => {
    fetchChannels();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, [pageInfo.currentPage]);

  console.log("channels :>> ", channels);
  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }
  // has channels
  else if (channels?.length > 0) {
    return (
      <>
        <div className="tabs my-1 flex-nowrap justify-center overflow-x-auto !p-4">
          {channels?.map((channel) => (
            <a
              className={`tab-lifted tab whitespace-nowrap ${
                channel.id === activeTab ? "tab-active !font-bold" : ""
              }`}
              key={channel.id}
              onClick={() => setActiveTab(channel.id)}
            >
              {channel.name}
            </a>
          ))}
        </div>
        <p>اینجا باید نمودار ها نمایش داده بشه مستقل از استیس ۱۰ تای برتر</p>
        <SelectTop10
          selectTop10={selectTop10}
          setSelectTop10={setSelectTop10}
        />
        {selectTop10 ? <Top10Share /> : <Top10View />}
        <Pagination
          currentPage={pageInfo.currentPage}
          totalCount={pageInfo.totalCount}
          pageSize={pageInfo.pageSize}
          siblingCount={1}
          onPageChange={(page: number) =>
            setPageInfo({ ...pageInfo, currentPage: page })
          }
        />
      </>
    );
  } else {
    return <p>شما در حال حاضر کانالی ندارید</p>;
  }
};

export default MainDashboard;
