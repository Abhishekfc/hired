import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, } from "@/components/ui/carousel"
import companies from "../data/companies.json"
import faqs from "../data/faq.json"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

const LandingPage = () => {
  return <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
    <section className='text-center'>
      <h1 className='flex flex-col justify-center items-center gradient-title text-4xl font-black sm:text-6xl lg:text-8xl tracking-tighter  py-4'> Find your dream Job <span
        className='flex items-center gap-2 sm:gap-6'>and get {" "}
        <img
          src="/logo.png"
          alt='hirrd logo'
          className='h-14 sm:h-24 lg:h-32'
        />
      </span>
      </h1>

      <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
        Explore the thousands of job listings or find the perfect candidate
      </p>
    </section>
    <div className='flex justify-center  gap-6'>
      {/* buttons  */}
      <Link to="/jobs">
        <Button variant="blue" size="xl">Find Jobs</Button>
      </Link>
      <Link to="/post-job">
        <Button variant="destructive" size="xl">Post Job</Button>
      </Link>

    </div>
    {/* carousel */}
    <Carousel plugins={[
      Autoplay({
        delay: 2000,
      }),
    ]} className="w-full py-10">
      <CarouselContent className="flex gap-5 sm:gap-10 items-center">
        {companies.map(({ name, id, path }) => {
          return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
            <img src={path}
              alt={name}
              className='h-9 sm:h-14 object-contain' />
          </CarouselItem>
        })}
      </CarouselContent>

    </Carousel>

    {/* banner */}
    <img src="/banner.jpeg" alt="" className='w-full' />

    <section className='grid gird-cols-1 md:grid-cols-2 gap-4'>
      {/* cards */}
      <Card>
        <CardHeader>
          <CardTitle>For Job Seekers</CardTitle>
        </CardHeader>
        <CardContent>
          Seaarch and apply for jobs, track applications, and more.
        </CardContent>

      </Card>
      <Card>
        <CardHeader>
          <CardTitle>For Employers</CardTitle>
        </CardHeader>
        <CardContent>
          Post jobs, manage applications, and find the best candidates.
        </CardContent>

      </Card>
    </section>

    {/* accodian */}
    <Accordion type="single" collapsible>
      {
        faqs.map(( faq, index) => {
          return( <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq. answer}</AccordionContent>
          </AccordionItem>)
        })}
    </Accordion>
  </main>
}

{/* <AccordionTrigger>Is it accessible?</AccordionTrigger>
<AccordionContent>
  Yes. It adheres to the WAI-ARIA design pattern.
</AccordionContent> */}
export default LandingPage
