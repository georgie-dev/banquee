'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authProvider';
import { ref, child, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { FaPlus, FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6";
import { PiHandWithdrawFill } from "react-icons/pi";
import Card from './Card';
import TransactionHistory from './TransactionHistory';
import CreatePin from '@/components/CreatePin'; // Ensure correct import
import Link from 'next/link';
import { UserData } from '@/components/data';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user } = useAuth();
  const [refetch, setRefetch] = useState(false);

  const fetchUserData = async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${user?.uid}`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setUserData(snapshot.val());
        sessionStorage.setItem('userData', JSON.stringify(snapshot.val()));
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refetch]);

  return (
    <main className='flex flex-col gap-14 p-1'>
      <div className='flex items-start flex-wrap gap-10'>
        <div className='w-full lg:w-3/5 flex items-center gap-5'>
          <Card />
          <div className='hidden md:block w-full'><Card /></div>
        </div>
        <div className='w-full lg:w-1/3 p-3 border rounded-md shadow-md'>
          <small className='dm-sans-bold text-lg'>Quick Actions</small>
          <div className='p-5 grid grid-cols-2 gap-4'>
            <Link href='/' className='flex flex-col items-center gap-4 text-black dms-sans-normal border rounded-md p-4'>
              <FaPlus className='font-semibold' />
              <span className='dm-sans-bold text-sm'>Account top-up</span>
            </Link>
            <Link href='/' className='flex flex-col items-center gap-4 text-black dms-sans-normal border rounded-md p-4'>
              <PiHandWithdrawFill className='font-semibold' />
              <span className='dm-sans-bold text-sm'>Withdraw</span>
            </Link>
            <Link href='/dashboard/transfers' className='flex flex-col items-center gap-4 text-black dms-sans-normal border rounded-md p-4'>
              <FaMoneyBillTransfer className='font-semibold' />
              <span className='dm-sans-bold text-sm'>Send Money</span>
            </Link>
            <Link href='/' className='flex flex-col items-center gap-4 text-black dms-sans-normal border rounded-md p-4'>
              <FaMoneyBills className='font-semibold' />
              <span className='dm-sans-bold text-sm'>Pay bills</span>
            </Link>
          </div>
        </div>
      </div>
      <TransactionHistory />
      {userData?.firstTimeUser && <CreatePin refetch={setRefetch} />}
    </main>
  )
}

export default Dashboard;
