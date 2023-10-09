import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const TransactionHistory = () => {
    const { user } = UserAuth()
    const [transactions, setTransactions] = useState([]);

    //fetchign data from firestore
    // useEffect(() => {
    //     onSnapshot(doc(db, 'transactions', `${user?.email}`), (doc) => {
    //         setTransactions(doc.data())
    //     })
    // }, [user?.email])

    //fetching data from Firestore
    const timestamp = new Date();
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, `${user?.email}`, formattedDate), (docSnapshot) => {
            const data = docSnapshot.data();
            if (data && Array.isArray(data.transactions)) {
                // Set transactions as an array if 'transactions' field exists and is an array
                setTransactions(data.transactions);
            } else {
                setTransactions([]);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user?.email, formattedDate]);


    console.log(transactions)
    return (
        <div >
            <p className='font-semibold text-gray-500 m-5'>Transactions ({formattedDate})</p>
            <div  >{transactions?.map((transaction) => {
                return (
                    <div className='hover:scale-105 ease-in-out duration-300 flex flex-row-reverse justify-between items-center border-b-[1px] shadow-lg p-3 ' key={transaction.id}>
                        <div className=''>
                            <p className='font-bold text-gray-400'></p>
                            <p className='text-xs font-medium text-gray-500'>{formattedDate}</p>
                        </div>
                        <div className=''>
                            <p className={transaction.type == 'deposit' ? 'text-green-600 font-semibold' : 'text-red-500 font-bold'}>{transaction.amount.toLocaleString()}</p>
                            <p className='text-xs font-medium text-gray-500'>{transaction.id}</p>
                        </div>

                    </div>
                )
            })}</div>
        </div>
    );
}

export default TransactionHistory;
