import React from 'react';

export default function MyPage() {
    return (
        <div className='w-full flex p-2 flex-wrap'>
            <div className='xl:w-1/3 w-full'>
                <div className='xl:pt-10 space-y-6 w-auto'>
                <div>
                    <p className='text-md font-semibold'>나의 주문 내역</p>
                    <ul>
                    <li className='text-sm'>마이페이지</li>
                    </ul>
                </div>
                <div>
                    <p className='text-md font-semibold'>나의 활동</p>
                    <ul>
                    <li className='text-sm'>위시리스트</li>
                    </ul>
                </div>
                <div>
                    <p className='text-md font-semibold'>나의 활동</p>
                    <ul>
                    <li className='text-sm'>위시리스트</li>
                    </ul>
                </div>
                </div>    
            </div>
            <div className='xl:w-2/3 w-full flex justify-center text-xl font-semibold p-2 border-b border-b-zinc-600'>
                마이페이지
            </div>
        </div>
    );
}

