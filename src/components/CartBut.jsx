import { useQuery } from '@tanstack/react-query';
import { getCarts } from 'api/firebase';
import { useAuthApi } from 'context/AuthContext';
import React from 'react';
import { SlHandbag } from "react-icons/sl";
export default function CartBut({ onClick }) {
    const { uid } = useAuthApi();
    const { data:items} = useQuery(['cart'],()=>getCarts(uid))
    
    return (
        <button className="relative ml-2" onClick={() => onClick("buying")}>
            <SlHandbag
              size="20"
              className="text-slate-900"
            />
            <div className="absolute top-4 left-2 w-5 h-5 -pt-2 bg-purple-600 rounded-full text-white flex justify-center text-sm" >
                {items && <p>{items.length}</p>}
            </div>
        </button>
    );
}

