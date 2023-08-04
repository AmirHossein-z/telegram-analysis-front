import { JSX, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import AuthContext from "../../context/auth-provider";
import { useAxiosPrivate } from "../../hooks";
import { FilterInput, Pagination, CardList } from "../../components";
import { IChannel } from "../../types";
import { getChannels } from "../../apis";

const Channels = (): JSX.Element => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const [searchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });

  const {
    loading,
    response,
    fetchData: getInfo,
    // error,
  } = useAxiosPrivate(
    getChannels(pageInfo.currentPage, parseInt(auth.userId), filter, "")
  );

  useEffect(() => {
    if (response !== null) {
      if (response?.status) {
        setChannels(response?.value?.data);
        setPageInfo({
          ...pageInfo,
          pageSize: response.value?.per_page,
          totalCount: response.value?.total,
          currentPage: response.value?.current_page,
        });
      } else {
        navigate("/dashboard/add_channel");
      }
    }
  }, [response]);

  useEffect(() => {
    getInfo();
  }, [pageInfo.currentPage]);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }

  // has channels
  return (
    <>
      <section className="mb-5 flex w-full flex-wrap gap-4">
        <FilterInput filter={filter} setFilter={setFilter} getInfo={getInfo} />
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
};

export default Channels;
