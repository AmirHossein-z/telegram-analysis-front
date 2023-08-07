import { useContext, useEffect, useState } from "react";
import { Charts, Top10Posts } from "./components";
import { Pagination, Stat } from "../../components";
import { getChannels } from "../../apis";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../../context/auth-provider";
import { IChannel } from "../../types";
import { StatContainer } from "../../containers";
import { AiFillEye } from "react-icons/ai";
import { useAxiosPrivate } from "../../hooks";

const MainDashboard = () => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const [searchParams] = useSearchParams({});
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });
  const [activeTab, setActiveTab] = useState(0);
  const {
    fetchData: fetchChannels,
    loading,
    response,
    error,
  } = useAxiosPrivate(
    getChannels(pageInfo.currentPage, parseInt(auth.userId, 10), "", "")
  );

  useEffect(() => {
    if (response !== null) {
      setChannels(response.value?.data);
      setPageInfo({
        ...pageInfo,
        pageSize: response.value?.per_page,
        totalCount: response.value?.total,
        currentPage: response.value?.current_page,
      });
    }
  }, [response]);

  useEffect(() => {
    fetchChannels();

    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pageInfo.currentPage]);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }

  if (error) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        مشکلی پیش آمده است
      </section>
    );
  }

  // has channels
  else if (channels?.length > 0) {
    return (
      <>
        <StatContainer>
          <Stat
            title="تعداد کانال ها"
            value={channels.length}
            icon={<AiFillEye />}
          />
        </StatContainer>
        <h1 className="my-2 text-center text-lg text-secondary">
          لیست کانال های شما
        </h1>
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
        {activeTab !== 0 && <Charts channelId={activeTab} />}
        {/* top 10 */}
        {activeTab !== 0 && <Top10Posts channelId={activeTab} />}
        {/* top 10 */}
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
  }

  return <p>شما در حال حاضر کانالی ندارید</p>;
};

export default MainDashboard;
