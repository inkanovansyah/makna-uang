import Image from 'next/image'
import React from 'react'
import profileCharacter from "../../../public/character.png"

const AboutCoverSection = () => {
  return (
    <section className='w-full md:h-[130vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
        <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center'> 
            <Image src={profileCharacter} alt="CodeBucks" 
            className='w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center'
            priority
            sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
            />
        </div>

        <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
            <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left'>
           Dream Big, Work Hard, Achieve More!
            </h2>
            <p className='font-medium capitalize mt-4 mb-4 text-base'>
              This mantra drives my work as a passionate freelancer. I blend innovative technology with timeless design 
              to create captivating digital experiences. Inspired by nature and literature, I am a lifelong learner 
              who embraces challenges. With each project, I strive to leave a meaningful impact—one pixel at a time.
            </p>
            <p className='font-medium capitalize mt-4 mb-4 text-base'>
              The same spirit flows into <strong>Maknauang.com</strong>, a digital media platform dedicated to exploring 
              the intersection of global politics, economic direction, and investment opportunities. With a strong 
              commitment to trustworthy journalism, Maknauang.com provides readers with reliable insights, sharp analysis, 
              and diverse perspectives on how political shifts shape financial markets and long-term investments.
            </p>
            <ul>
              <li><strong>Global Politics &amp; Economy</strong> – Examining how world politics influence trade, markets, and financial stability.</li>
              <li><strong>Investment Insights</strong> – Delivering balanced analysis on emerging opportunities and risks across sectors.</li>
              <li><strong>Trusted News &amp; Reports</strong> – Presenting fact-checked information to empower readers in making informed decisions.</li>
              <li><strong>Opinion &amp; Analysis</strong> – Featuring perspectives from experts, analysts, and thought leaders.</li>
              <li><strong>Trends &amp; Future Outlook</strong> – Exploring the future of global finance, technology, and policy directions.</li>
            </ul>
            <p className='font-medium capitalize mt-4 mb-4 text-base'>
              Maknauang.com seeks to be more than just a news platform—it is a bridge between politics, investment, and reliable journalism. 
              With a growing community of readers, contributors, and experts, Maknauang.com invites everyone to engage, share, and build a deeper 
              understanding of the world’s changing landscape.
            </p>
        </div>
    </section>
  )
}

export default AboutCoverSection