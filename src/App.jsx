import "./App.css";
import HeroSection from "./components/HeroSection";
import JobsCard from "./components/JobsCard";
import { useState, useEffect } from "react";
import Alert from "./components/Alert";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [apiPage, setApiPage] = useState(1);

  const getJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.arbeitnow.com/api/job-board-api?page=${apiPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (jobs.length > 0) {
        setJobs([...jobs, ...data.data]);
        setFilteredJobs([...jobs, ...data.data]);
      } else {
        setJobs(data.data);
        setFilteredJobs(data.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterJobs = () => {
    const regex = new RegExp(search, "i");
    const result = jobs
      .map((job) => {
        if (regex.test(job.title)) {
          return job;
        }
      })
      .filter((job) => {
        return job !== undefined;
      });
    setFilteredJobs(result);
  };

  useEffect(() => {
    getJobs();
  }, [apiPage]);

  return (
    <>
      <HeroSection
        search={search}
        setSearch={setSearch}
        filterJobs={filterJobs}
      />

      {loading ? null : filteredJobs.length === 0 ? (
        <Alert />
      ) : (
        <JobsCard
          filteredJobs={filteredJobs}
          setApiPage={setApiPage}
          getJobs={getJobs}
        />
      )}
    </>
  );
}

export default App;
