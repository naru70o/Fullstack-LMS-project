import { Banner } from '@/components/components/banner';
import { Feed } from '@/components/app/courses/_components/feed';
import { Filtering } from '@/components/app/courses/_components/filtering';
import Footer from '@/components/components/footer';
import { Hero } from '@/components/components/hero';
import React from 'react'

const Page = () => {
    return (
      <>
      <Banner/>
      <Hero/>
      <Filtering/>
      <Feed/>
      <Footer/>
      </>
    );
}

export default Page;