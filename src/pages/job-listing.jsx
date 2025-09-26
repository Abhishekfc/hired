import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import {Select, SelectContent, SelectItem, SelectTrigger,SelectValue,SelectGroup } from "@/components/ui/select"

import { State } from 'country-state-city';

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser();

  const { fn: fnJobs,
    data: jobs,
    loading: loadingJobs
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded])


  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (jobs) {
      console.log(jobs);
    }
  }, [jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");

    if (query) setSearchQuery(query);
  }

  const clearFilters =() =>{
    setSearchQuery("");
    setLocation("");
    setCompany_id(""); 
  }



  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />
  }


  return (
    <div className=''>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>latest Jobs</h1>

      {/* add fiters here */}
      <form onSubmit={handleSearch} className='h-14 flex flex-row w-full gap-2 items-center mb-3'>
        <Input type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md" />

        <Button type="submit" className="h-full sm:w-26.5  " variant="blue" >
          Search
        </Button>
      </form>

      {/* className="flex flex-col sm:flex-row gap-2" */}

      <div className=" flex flex-col sm:flex-row gap-2" > 
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full" >
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            {State.getStatesOfCountry("IN").map(({name}) =>{

            return (<SelectItem key={name} value={name}>{name}</SelectItem>)
            })}
            
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="w-full" >
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            {companies?.map(({name, id}) =>{

            return (<SelectItem key={name} value={id}>{name}</SelectItem>)
            })}
            
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="destructive" >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />}

      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2  lg:grid-cols-3 gap-4'>
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />)
            })
          ) : (
            <div> No jobs found 🥲</div>
          )
          }
        </div>
      )}

    </div>
  )
}

export default JobListing;
