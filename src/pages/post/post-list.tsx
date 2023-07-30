import { useParams, useSearchParams } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../hooks";
import { useEffect, useState } from "react";
import { getPosts } from "../../apis";
import {
  CardDesktop,
  CardMobile,
  FilterInput,
  Pagination,
  SearchButton,
} from "../../components";

import { IPost } from "../../types";

const PostList = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });

  const getPostsByChannelId = async () => {
    try {
      setLoading(true);
      setSearchParams({ page: pageInfo.currentPage.toString() });
      const { data } = await getPosts(
        axiosPrivate,
        channelId,
        pageInfo.currentPage,
        controller
      );
      setPosts(data.value?.data);
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
        currentPage: data.value?.current_page,
      });
      // scrollToAnchor("#post_list");
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
      <section className="mb-5 flex w-full flex-wrap gap-4">
        <FilterInput />
        <SearchButton />
      </section>
      <section className="mb-5 flex flex-col gap-10">
        <a className="text-2xl font-semibold text-primary">لیست پست ها</a>
        <List posts={posts} />
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

const List = ({ posts }: { posts: IPost[] }) => {
  return (
    <>
      {/* mobile & tablet */}
      <section className="grid grid-cols-1 items-start justify-center gap-5 md:hidden">
        {posts?.map((post) => (
          <CardMobile
            path={`/dashboard/channels/${post.channel_id}/posts/`}
            key={post.id}
            id={post.id}
            view={post.view}
            name={post.details}
            share={post.share}
            tags={post.tags}
          />
        ))}
      </section>

      {/* desktop */}
      <section className="hidden md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3">
        {posts?.map((post) => (
          <CardDesktop
            path={`/dashboard/channels/${post.channel_id}/posts/`}
            key={post.id}
            name={post.details}
            id={post.id}
            view={post.view}
            share={post.share}
            tags={post.tags}
          />
        ))}
      </section>
    </>
  );
};

export default PostList;
