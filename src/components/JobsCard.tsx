import React, { useEffect, useState } from "react";

type Job = {
  title: string;
  company_name: string;
  description: string;
  location: string;
  url: string;
};
const ITEMS_PER_PAGE = 20;

function JobsCard(props: {
  filteredJobs: Job[];
  setApiPage: any;
  getJobs: any;
}) {
  const [page, setPage] = useState(
    1 + 5 * (Math.ceil(props.filteredJobs.length / 100) - 1)
  );
  const [jobs, setJobs] = useState<Job[]>(props.filteredJobs);

  const spliceJobs = () => {
    setJobs(
      props.filteredJobs.slice(
        ITEMS_PER_PAGE * page - ITEMS_PER_PAGE,
        ITEMS_PER_PAGE * page
      )
    );
  };
  const handleNextChange = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevChange = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleLoadMoreChange = () => {
    props.setApiPage((prev: number) => prev + 1);
  };

  const hideNextButton = page * ITEMS_PER_PAGE >= props.filteredJobs.length;
  const hidePrevButton = page === 1;

  useEffect(() => {
    if (props.filteredJobs.length <= 20) {
      setPage(1);
    }
    spliceJobs();
  }, [props.filteredJobs, page]);

  return (
    <>
      <div className="container mx-auto p-12">
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 
        lg:grid-cols-3 gap-28 justify-center"
        >
          {Object.entries(jobs).map(([key, value]) => {
            return (
              <div
                key={key}
                onClick={() => {
                  window.open(value.url, "_blank");
                }}
                className="bg-blue-200 rounded-lg p-6 shadow-xl h-[300px] w-[300px] 
                flex flex-col justify-evenly hover:bg-blue-300 transition duration-500 
                ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{value.title}</h2>
                <p>{value.company_name}</p>
                <div className="mt-4">
                  <span className="bg-gray-200 text-black-800 px-2 py-1 rounded-md">
                    {value.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hideNextButton && Object.entries(jobs).length >= 20 ? (
        <div className="flex justify-center items-center">
          <button
            onClick={handleLoadMoreChange}
            className={`bg-blue-500 text-white font-bold py-2 px-4 my-4 rounded `}
          >
            Load more
          </button>
        </div>
      ) : null}
      <div className="flex justify-evenly w-[400px] m-auto my-10">
        <button
          onClick={handlePrevChange}
          className={`bg-blue-500 text-white font-bold py-2 px-4 my-4 rounded ${
            hidePrevButton ? "hidden" : ""
          }`}
        >
          Prev
        </button>
        {props.filteredJobs.length > 20 && (
          <div className="flex justify-center items-center">
            <p className="text-xl font-semibold">
              {page} / {Math.ceil(props.filteredJobs.length / ITEMS_PER_PAGE)}
            </p>
          </div>
        )}
        <button
          onClick={handleNextChange}
          className={`bg-blue-500 text-white font-bold py-2 px-4 my-4 rounded ${
            hideNextButton ? "hidden" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default JobsCard;
