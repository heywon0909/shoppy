import React from 'react';
import {BsHeart} from 'react-icons/bs'

export default function ItemDetail() {
    return (
        <section className='w-full flex p-2 justify-center flex-wrap'>
            <div className='xl:w-3/6 w-full h-auto'>
              <img src="../assets/image/1.webp" className='h-max w-full' />   
            </div>
            <div className='flex flex-col p-2 h-auto'>
               <div className='space-y-4 border-b border-zinc-300 pb-4'> 
                    <p className='text-2xl'>골지 카디건형 반팔 티셔츠 - 카키</p>
                    <p className='text-purple-500 text-2xl'>24,900</p>
                </div> 
                <div className='p-2 space-y-4 border-b border-zinc-300'> 
                    <BsHeart/>
                </div>
                <div className='space-y-4 border-b border-zinc-300 pb-4 h-full'> 
                    <p className='text-2xl'>골지 카디건형 반팔 티셔츠 - 카키</p>
                    <p className='text-purple-500 text-2xl'>24,900</p>
                </div> 
            </div>
        </section>
    );
}

