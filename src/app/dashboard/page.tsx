'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authProvider';
import TransactionHistory from './TransactionHistory';
import CreatePin from '@/components/CreatePin';
import Overview from './Overview';
import Transfers from './Transfers';
import Deposit from './Deposit';

const Dashboard: React.FC = () => {
  const [refetch, setRefetch] = useState(false);
  const [tab, setTab] = useState(0)
  const { user, userData, fetchUserData } = useAuth();
  const [deposit, setDeposit] = useState(false)

  // console.log(userData?.transactions)

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refetch]);


  return (
    <main>
      <div className='flex items-start justify-between'>
        <h1 className='font-semibold text-3xl'>Dashboard</h1>
        <button onClick={()=>{setDeposit(true)}} className='rounded-md py-2 px-4 bg-primary text-white text-sm'>Add Money</button>
      </div>
      <div className='my-5 flex items-center gap-2 bg-gray-200 *:text-sm *:py-1 *:px-4 *:rounded w-fit p-1 rounded'>
        <button value={0} onClick={(e)=>{setTab(Number((e.target as HTMLButtonElement).value))}} className={tab == 0 ? 'bg-white text-black': 'bg-gray-200 text-gray-400'}>Overview</button>
        <button value={1} onClick={(e)=>{setTab(Number((e.target as HTMLButtonElement).value))}} className={tab == 1 ? 'bg-white text-black': 'bg-gray-200 text-gray-400'}>Transfer</button>
      </div>
      {tab == 0? 
      <Overview userData={userData}/>
      :
      <Transfers/>
      }
      <TransactionHistory/>
      {userData?.firstTimeUser && <CreatePin refetch={setRefetch} />}
      {deposit && <Deposit close={setDeposit}/>}
    </main>
  )
}

export default Dashboard;
