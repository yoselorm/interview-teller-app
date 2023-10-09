import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import SignIn from '../pages/SignIn';
import { useNavigate } from 'react-router-dom';
import { addDoc, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import lormy from '../assests/lormy.JPG'
const Boardform = () => {
    const [transactionType, setTransactionType] = useState('deposit')
    const navigate = useNavigate()
    const [amount, setAmount] = useState('')
    const { user, logout } = UserAuth()
    const [balance, setBalance] = useState(30000000)
    const [customerName, setCustomerName] = useState('Olive Crocs')
    const handlelogout = async (e) => {
        e.preventDefault()
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log(user)

    const handleTransaction = async () => {

        if (!amount || isNaN(amount)) {
            alert("Please enter a valid amount.");
            return
        }
        else {
            const transactionAmount = parseFloat(amount);
            const transactionDescription = transactionType === "deposit" ? `Deposit: +$${transactionAmount.toFixed(2)}` : `Withdrawal: -$${transactionAmount.toFixed(2)}`;
            const displayAmount = transactionType === "deposit" ? ` +$${transactionAmount.toFixed(2)}` : `-$${transactionAmount.toFixed(2)}`;


            const transactionData = {
                type: transactionType,
                amount: displayAmount,
                description: transactionDescription,
                timestamp: new Date(),
                user: user.email,
                id: uuidv4(),
                teller: user.uid
            };

            // Creating a reference to the document based on user email and the day speciically
            const timestamp = new Date();
            const day = timestamp.getDate(); // Get the day of the month (1-31)
            const month = timestamp.getMonth() + 1; // Get the month (0-11), so add 1 to get 1-12
            const year = timestamp.getFullYear(); // Get the full year (e.g., 2023)
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            console.log(formattedDate);


            const transactionDocRef = doc(db, user.email, formattedDate);

            // Checking if the document exists before updating or creating it
            const transactionDocSnap = await getDoc(transactionDocRef);

            if (transactionDocSnap.exists()) {
                //so here if the document exists, update it
                await updateDoc(transactionDocRef, {
                    transactions: arrayUnion(transactionData)
                });
            } else {
                // else if the doc doesn't exist, create it
                await setDoc(transactionDocRef, {
                    transactions: [transactionData]
                });
            }

            if (transactionType === 'deposit') {
                setBalance(balance + transactionAmount);
            } else {
                setBalance(balance - transactionAmount);
            }

            setAmount("");
        }
    };


    if (user) {
        return (

            <div>
                <div className='flex justify-center gap-2 mb-10 mx-4  items-center'>
                    <h3 className=''><span className='text-xl font-bold text-gray-400'>Welcome</span>,<span className='font-bold text-xl'>{user.email}</span></h3>
                    <button onClick={handlelogout} className='w-100 p-2 bg-slate-500 shadow-xl rounded-md'>Logout</button>
                </div>
                <div className='mt-5 space-y-4 flex flex-col justify-center'>
                    <p className='flex justify-center text-gray-400'>Teller Machine</p>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={lormy} className='h-20 w-20 rounded-full object-fit ' />
                        <p className='font-bold text-gray-400 flex justify-center'>{user.email}</p>
                        <p className='font-bold text-gray-400 flex justify-center'>Balance</p>
                        <h2 className='font-semibold text-3xl flex justify-center'>${balance.toLocaleString()}</h2>
                    </div>

                </div>
                <div className='flex justify-center gap-4 mt-8'>
                    <select className='w-20 h-10' value={transactionType} onChange={(e) => { setTransactionType(e.target.value) }}>
                        <option value='deposit' >deposit</option>
                        <option value='withdraw' >withdraw</option>
                    </select>
                    <input value={amount} placeholder='amount' type='number' onChange={(e) => { setAmount(e.target.value) }} className='w-20 h-10 border-b-2 p-2 border-black mb-10' />
                </div>
                <div className='flex justify-center'>
                    <button className='w-[320px] my-2 p-2 bg-[#64CCC5] rounded-2xl shadow-xl hover:bg-[#1AACAC]' onClick={handleTransaction}>Submit</button>
                </div>

            </div>

        );
    } else {
        return (
            <div>
                <SignIn />
            </div>
        )
    }

}

export default Boardform;
