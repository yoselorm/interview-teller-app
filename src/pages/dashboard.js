import React from 'react';
import Boardform from '../components/boardform';
import TransactionHistory from '../components/transactionHistory';

const Dashboard = () => {
    return (
        <div className='sm:flex sm:justify-center mx-3 mb-3 sm:space-x-20 mt-20 sm:max-w-[1440px]'>
            <Boardform />
            <TransactionHistory />
        </div>
    );
}

export default Dashboard;
