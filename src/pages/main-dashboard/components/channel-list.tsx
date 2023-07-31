import { useContext, useEffect, useState } from "react";
import { Charts, Top10Posts } from ".";
import { Pagination } from "../../../components";
import { getChannels } from "../../../apis";
import { useSearchParams } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../../hooks";
import AuthContext from "../../../context/auth-provider";
import { IChannel } from "../../../types";

const ChannelStat = () => {
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
  } else {
    return <p>شما در حال حاضر کانالی ندارید</p>;
  }
};

export default ChannelStat;
