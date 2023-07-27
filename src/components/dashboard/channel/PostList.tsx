import { useParams, useSearchParams } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { useEffect, useState } from "react";
import { getPosts } from "../../../apis";
import { CardDesktop, CardMobile, Pagination } from "../../ui";

interface IPost {
  id: number;
  details: string;
  view: number;
  share: number;
  type: number;
  tags: string;
  channelId: number;
  created_at: string;
  updated_at: string;
}

const PostList = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [pageInfo, setPageInfo] = useState({ pageSize: 0, totalCount: 0 });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") ?? "", 10) || 1
  );

  const getPostsByChannelId = async () => {
    try {
      setLoading(true);
      setSearchParams({ page: currentPage.toString() });
      const { data } = await getPosts(
        axiosPrivate,
        channelId,
        currentPage,
        controller
      );
      console.log("data :>> ", data);
      setPosts(data.value?.data);
      setCurrentPage(data.value?.current_page);
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsByChannelId();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  useEffect(() => {
    getPostsByChannelId();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, [currentPage]);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  } else if (posts?.length === 0) {
    return (
      <button
        className="btn-secondary btn mb-40 mt-4"
        onClick={getPostsByChannelId}
      >
        لود دوباره
      </button>
    );
  }

  return (
    <section className="mb-40 mt-4">
      <List />
      <Pagination
        currentPage={currentPage}
        totalCount={pageInfo.totalCount}
        pageSize={pageInfo.pageSize}
        siblingCount={1}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </section>
  );
};

const List = () => {
  return (
    <>
      {/* mobile & tablet */}
      <section className="mb-40 grid grid-cols-1 items-start justify-center gap-5 md:hidden">
        {channels?.map((channel) => (
          <CardMobile
            key={channel.id}
            id={channel.id}
            name={channel.name}
            channelTelegramId={channel.channel_telegram_id}
            view={channel.view}
            share={channel.share}
            tags={channel.tags}
          />
        ))}
      </section>

      {/* desktop */}
      <section className="hidden md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3">
        {channels?.map((channel) => (
          <CardDesktop
            key={channel.id}
            id={channel.id}
            name={channel.name}
            channelTelegramId={channel.channel_telegram_id}
            view={channel.view}
            share={channel.share}
            tags={channel.tags}
          />
        ))}
      </section>
    </>
  );
};

export default PostList;
