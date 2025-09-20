import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState ("")
  const [location, setlocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const {isLoaded} = useUser();

  const { fn: fnJobs,
     data: dataJobs,
      loading: loadingJobs
     } = useFetch(getJobs, {location, company_id, searchQuery});

  useEffect(() => {
     if(isLoaded) fnJobs();
  }, [isLoaded,location, company_id, searchQuery]);

  useEffect(() => {
    if (dataJobs) {
      console.log(dataJobs);
    }
  }, [dataJobs]);
  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />
  }


  return (
    <div>
      JobListing
    </div>
  )
}

export default JobListing;
