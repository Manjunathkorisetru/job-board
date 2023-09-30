import React from "react";

function HeroSection(props: {
  search: string;
  setSearch: any;
  filterJobs: any;
}) {
  return (
    <div className="sticky top-0 z-50">
      <div
        className="bg-gradient-to-l from-cyan-500 to-blue-500 
      w-full h-[200px] flex flex-col items-center justify-evenly sticky top-0"
      >
        <h1 className="font-bold text-2xl">
          Jobs in Germany
          <a href="https://www.arbeitnow.com/" className="text-xs">
            {" "}
            [ arbeitnow.com ]
          </a>
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for a job"
            className="border-2 border-gray-300 rounded-md p-2 
            xs: w-[300px] md:w-[400px] lg:w-[500px] xl:[600px]"
            value={props.search}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                props.filterJobs();
              }
            }}
            onChange={(e: any) => {
              props.setSearch(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
