"use client"
import React from 'react'
import useFetch from '@/api/useFetch'
import useData from '@/api/useData'

const Tickers = () => {

  const {data, error, loading} = useFetch()
  const {getData} = useData(data, error, loading)

  function getLastWorkingDay() {
    
    let date = new Date();
    // Check if today is Saturday (6) or Sunday (0)
    if (date.getDay() === 6) { // Saturday
        date.setDate(date.getDate() - 1); // Go back 1 day to Friday
    } else if (date.getDay() === 0) { // Sunday
        date.setDate(date.getDate() - 2); // Go back 2 days to Friday
    }

    return formatDate(date);
  }

  function formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const date = getLastWorkingDay()

  return (
    <div className="bg-black w-[100%] h-[10vh] top-0 flex flex-row gap-x-5 items-center justify-evenly">
      {data && Object.keys(data).map((ticker) => (
        <div className='flex flex-row gap-x-[0.5vw]' key={ticker}>
          <p className='text-white text-sm'> {ticker}: </p>
          <p className='text-white text-sm'> {!loading && getData(ticker, '2024-04-05', 'Close')}</p>
          <p className='text-white text-sm'>|</p>
          <p className={`${getData(ticker, date, 'Change %')! > 0 ? 'text-green-500':'text-red-500'} text-sm`}> {!loading && getData(ticker, date, 'Change %')}%</p>
        </div>
      ))}
    </div>
  )
}

export default Tickers