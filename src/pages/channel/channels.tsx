import { JSX, useContext, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import AuthContext from "../../context/auth-provider";
import { useAbortController, useApiPrivate } from "../../hooks";
import { FilterInput, Pagination, CardList } from "../../components";
import { IChannel } from "../../types";
import { getChannels } from "../../apis";

const Channels = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });

  const fetchChannels = async () => {
    try {
      // if (filter !== "0") {
      setSearchParams({
        filter,
        page: pageInfo.currentPage.toString(),
      });
      // } else {
      //   setSearchParams({
      //     page: pageInfo.currentPage.toString(),
      //   });
      // }
      setLoading(true);
      const { data } = await getChannels(
        axiosPrivate,
        pageInfo.currentPage,
        parseInt(auth.userId),
        filter,
        "",
        controller
      );
      console.log("data :>> ", data);
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
        <section className="mb-5 flex w-full flex-wrap gap-4">
          <FilterInput
            filter={filter}
            setFilter={setFilter}
            getInfo={fetchChannels}
          />
        </section>
        <CardList list={channels} />
        <Pagination
          currentPage={pageInfo.currentPage}
          totalCount={pageInfo.totalCount}
          pageSize={pageInfo.pageSize}
          siblingCount={1}
          onPageChange={(page: number) =>
            setPageInfo({ ...pageInfo, currentPage: page })
          }
        />
        <Link
          to={"/dashboard/add_channel"}
          className="btn-warning btn fixed bottom-[5rem] left-2 md:bottom-4 md:left-4"
        >
          افزودن کانال
        </Link>
      </>
    );
  } else {
    return <Navigate to={"/dashboard/add_channel"} />;
  }
};

export default Channels;
