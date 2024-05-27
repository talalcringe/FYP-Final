import React from 'react'
import Card from '../components/Card'
import banner from '../assets/banner.png'

const Data=[
  {source: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg',
    para: 'lorem ipsum hdschjds csdhcdshj dschjds hdssj',
    flag: 0
  },
  {source: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg',
    para: 'lorem ipsum hdschjds csdhcdshj dschjds hdssj',
    flag: 1
  },
  {source: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg',
    para: 'lorem ipsum hdschjds csdhcdshj dschjds hdssj',
    flag: 0
  }
]


const Home = () => {
  return (
    <div>
      <div>
        <img className='w-full min-h-[70vh] object-cover pt-16' src={banner} />
      </div>
      <div className='flex flex-col flex-wrap content-center m-2'>
        {
            Data.map((data,index)=><div key={index}>
              <Card img={data.source} para={data.para} flag={data.flag}/>
            </div>)
        }
      </div>
    </div>
  )
}

export default Home