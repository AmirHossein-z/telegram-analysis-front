import { useParams, useSearchParams } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../hooks";
import { useEffect, useState } from "react";
import { getPosts } from "../../apis";
import { CardList, FilterInput, Pagination } from "../../components";

import { IPost } from "../../types";

const PostList = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "0");
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });

  const getPostsByChannelId = async () => {
    try {
      setLoading(true);
      if (filter !== "0") {
        setSearchParams({
          filter: filter,
          page: pageInfo.currentPage.toString(),
        });
      } else {
        setSearchParams({
          page: pageInfo.currentPage.toString(),
        });
      }
      const { data } = await getPosts(
        axiosPrivate,
        channelId,
        pageInfo.currentPage,
        filter,
        controller
      );
      console.log("data :>> ", data);
      setPosts(data.value?.data);
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
        currentPage: data.value?.current_page,
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
  }, [pageInfo.currentPage]);

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
    <>
      <section className="mb-5">
        <FilterInput
          getInfo={getPostsByChannelId}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
      <section className="mb-5 flex flex-col gap-10">
        <a className="text-2xl font-semibold text-primary">لیست پست ها</a>
        {/* <List posts={posts} /> */}
        <CardList list={posts} />
        <Pagination
          currentPage={pageInfo.currentPage}
          totalCount={pageInfo.totalCount}
          pageSize={pageInfo.pageSize}
          siblingCount={1}
          onPageChange={(page: number) =>
            setPageInfo({ ...pageInfo, currentPage: page })
          }
        />
      </section>
    </>
  );
};

export default PostList;
