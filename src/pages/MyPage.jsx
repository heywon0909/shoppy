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
            <div className='xl:w-2/3 w-full flex flex-col justify-center text-xl p-2'>
                <div className='border-b border-b-zinc-600 w-full h-7 flex justify-center font-semibold'>마이페이지</div>
                <div className='p-2 grow-0 flex flex-wrap'>
                    <div className='md:w-1/2 p-2 flex w-full flex-wrap'>
                        <div className='w-24 h-24 bg-slate-300 rounded-full'></div>
                        <div className='flex flex-col p-2'>
                            <p>박혜원 님</p>
                            <div className='flex text-sm text-zinc-600 flex-wrap'>
                                누적 구매 금액
                                <p className='font-semibold'>77,000 원</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 p-2 flex'>
                        <div>
                            <div className='font-semibold text-base'>상품리뷰</div>
                            <p>5</p>
                        </div>
                        <div>
                            <div className='font-semibold text-base'>쿠폰</div>
                            <p>5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

