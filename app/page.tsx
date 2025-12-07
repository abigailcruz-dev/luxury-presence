'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Custom hook for scroll animations
function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7;
  
  // Section animation refs
  const aboutSection = useScrollAnimation();
  const servicesSection = useScrollAnimation();
  const searchSection = useScrollAnimation();
  const gallerySection = useScrollAnimation();
  const premiumSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const contactSection = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);
      
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax & Ken Burns Effect */}
        <div className="absolute inset-0 scale-110 animate-ken-burns">
          <Image
            src="/hero bg.jpg"
            alt="Luxury Real Estate"
            fill
            priority
            quality={100}
            className="object-cover"
            style={{
              transform: `scale(${1 + scrollY * 0.0002})`,
            }}
          />
        </div>

        {/* Multi-layered Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Animated Spotlight Effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 - scrollY * 0.03}%, rgba(251, 191, 36, 0.2) 0%, transparent 60%)`,
          }}
        />

        {/* Animated Particles/Dust Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-amber-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0" style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)',
        }} />

        {/* Content */}
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-6 py-24 text-center z-10">
          {/* Decorative Elements */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-amber-500/50" />
          
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border-2 border-amber-400/40 bg-black/30 backdrop-blur-xl text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase animate-fade-in-down shadow-2xl">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Luxury Real Estate
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up">
            <span className="block text-white drop-shadow-2xl">
              Your Dream Home
            </span>
            <span className="block mt-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl" style={{ WebkitTextStroke: '1px rgba(251, 191, 36, 0.3)' }}>
              Awaits You
            </span>
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in opacity-0 animation-delay-300">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-14 leading-relaxed animate-fade-in opacity-0 animation-delay-300 drop-shadow-lg font-light">
            MARCI METZGER - THE RIDGE REALTY GROUP
            <br />
            PAHRUMP REALTOR
          </p>
          
          {/* CTA Buttons with Glass Morphism */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 animation-delay-500">
            <a 
              href="tel:206-919-6886" 
              className="group relative w-14 h-14 hover:w-auto hover:px-6 flex items-center justify-center bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-900 rounded-full font-bold text-base overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-amber-500/60 transform hover:scale-105"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              <span className="relative flex items-center gap-0 group-hover:gap-2 transition-all duration-500">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out">
                  Call Now: (206) 919-6886
                </span>
              </span>
            </a>
            
            <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white rounded-full font-bold text-base overflow-hidden hover:bg-white/20 hover:border-white/60 transition-all duration-700 hover:scale-110 transform shadow-2xl">
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <span className="relative flex items-center gap-2">
                View Listings
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>


        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-8 h-8 text-white/70 hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-amber-400/20 opacity-50" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-amber-400/20 opacity-50" />
      </section>

      {/* About Section - Meet Your Realtor */}
      <section className="pt-20 pb-20 px-6 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
        
        <div 
          ref={aboutSection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200/50 shadow-lg mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-900 text-sm font-bold tracking-[0.2em] uppercase">
                Meet Your Realtor
              </span>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Marci Metzger
            </h2>
            <p className="text-xl text-amber-600 font-semibold">
              Licensed Real Estate Professional
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="grid lg:grid-cols-[300px_1fr] gap-0">
              {/* Profile Image - Compact Side Panel */}
              <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col items-center justify-center">
                {/* Circular Profile Image */}
                <div className="relative group mb-6">
                  {/* Glow Ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full opacity-75 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  
                  {/* Image Container */}
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <Image
                      src="/marci.jpg"
                      alt="Marci Metzger"
                      fill
                      className="object-cover object-center scale-110"
                      quality={95}
                      sizes="200px"
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-400/30" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-400/30" />
              </div>

              {/* Content Area */}
              <div className="p-10 lg:p-12">
                {/* Description */}
                <div className="space-y-6 mb-10">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    With <span className="text-amber-600 font-semibold">over a decade of experience</span> in Pahrump and Nevada, I've helped <span className="text-amber-600 font-semibold">hundreds of families</span> achieve their real estate goals through expert <span className="text-amber-600 font-semibold">local market knowledge</span> and personalized service.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    As part of <span className="text-amber-600 font-semibold">The Ridge Realty Group</span>, I specialize in residential and commercial properties. Whether you're <span className="text-amber-600 font-semibold">buying, selling, or investing</span>, I'm committed to making your journey smooth and successful.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-10">
                  {[
                    { 
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                      text: 'Top Residential Sales',
                      subtext: 'Last 5 Years'
                    },
                    { 
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                      text: 'Expert Market',
                      subtext: 'Knowledge'
                    },
                    { 
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
                      text: 'Personalized Service',
                      subtext: 'Client Focused'
                    },
                    { 
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
                      text: 'Proven Results',
                      subtext: 'Track Record'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/50 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm leading-tight">{item.text}</div>
                        <div className="text-xs text-slate-500">{item.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <a 
                    href="tel:206-919-6886" 
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    
                    <div className="relative">
                      <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold">Contact Me Today</div>
                      <div className="text-base font-bold">(206) 919-6886</div>
                    </div>
                    
                    <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Get It Sold */}
      <section className="pt-12 pb-32 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/20 to-transparent rounded-full blur-3xl" />
        
        <div 
          ref={servicesSection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200/50 shadow-lg mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-900 text-sm font-bold tracking-[0.2em] uppercase">
                Our Services
              </span>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Get It Sold
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Expert strategies to market your property and find your dream home
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: '/Top Residential Sales Last 5 Years.jpg',
                title: 'Top Residential Sales',
                subtitle: 'Last 5 Years',
                description: 'Our team works hard to excel in our market, providing exceptional service and proven results for every client.'
              },
              {
                image: '/dont just list it.jpg',
                title: "Don't Just List It...",
                subtitle: 'Marketing Excellence',
                description: 'We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.'
              },
              {
                image: '/guide to buyers.jpg',
                title: 'Guide to Buyers',
                subtitle: 'Expert Guidance',
                description: 'Nobody knows the market like we do. Enjoy having a pro at your service with market analysis, upgrades lists, and contractors on speed dial.'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {/* Title on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-1">
                      {service.subtitle}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-amber-400/60" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Read More Link */}
                  <button className="group/btn inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all duration-300">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Your Dream Home - Search Section */}
      <section className="py-20 pb-40 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Find Your Dream Home.jpg"
            alt="Find Your Dream Home"
            fill
            className="object-cover opacity-20"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div 
          ref={searchSection.elementRef}
          className={`max-w-6xl mx-auto relative transition-all duration-700 ${
            searchSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-bold tracking-[0.2em] uppercase">
                Property Search
              </span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Find Your Dream Home
            </h2>
            <p className="text-lg text-slate-300">
              Search our curated selection of premium properties
            </p>
          </div>

          {/* Search Form Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
            <form className="space-y-5">
              {/* Top Row - Location, Type, Sort By */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300">
                    <option value="">Select Location</option>
                    <option value="pahrump">Pahrump, NV</option>
                    <option value="las-vegas">Las Vegas, NV</option>
                    <option value="henderson">Henderson, NV</option>
                    <option value="reno">Reno, NV</option>
                  </select>
                </div>

                {/* Property Type */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Property Type
                  </label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300">
                    <option value="">All Types</option>
                    <option value="house">Single Family Home</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    Sort By
                  </label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300">
                    <option value="newest">Newest Listings</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="beds">Most Bedrooms</option>
                    <option value="sqft">Largest Sq Ft</option>
                  </select>
                </div>
              </div>

              {/* Middle Row - Bedrooms, Bathrooms & Price */}
              <div className="grid md:grid-cols-4 gap-4">
                {/* Bedrooms */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Bedrooms
                  </label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4a2 2 0 012-2h4a2 2 0 012 2v12a1 1 0 001 1h4a1 1 0 001-1V8a2 2 0 012-2h2" />
                    </svg>
                    Bathrooms
                  </label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Min Price */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Min Price
                  </label>
                  <input
                    type="text"
                    placeholder="$0"
                    className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300"
                  />
                </div>

                {/* Max Price */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Max Price
                  </label>
                  <input
                    type="text"
                    placeholder="No Max"
                    className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-900 text-sm font-medium group-hover:border-amber-300"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-900 py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Properties Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Circular Image Divider */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex justify-center items-center gap-6 md:gap-10">
              {['1.jpg', '2.jpg', '3.jpg', '4.jpg'].map((img, index) => (
                <div 
                  key={index} 
                  className="group relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-110 transition-all duration-500 bg-white"
                >
                  <div className={img === '2.jpg' ? 'absolute inset-4' : 'absolute inset-2'}>
                    <Image
                      src={`/${img}`}
                      alt={`Property ${index + 1}`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      quality={90}
                      sizes="150px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="pt-32 pb-32 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div 
          ref={gallerySection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            gallerySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-50 backdrop-blur-md border border-amber-200 shadow-lg mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-600 text-sm font-bold tracking-[0.2em] uppercase">
                Our Portfolio
              </span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Property Gallery
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our exceptional properties and success stories
            </p>
          </div>

          {/* 3D Carousel Gallery - Desktop View (hidden on mobile) */}
          <div className="hidden md:block relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
            
            {/* Gallery Container */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
              {['pg 1.jpg', 'pg 2.jpg', 'pg 3.jpg', 'pg 4.jpg', 'pg 5.jpg', 'pg 6.jpg', 'pg 7.jpg'].map((img, index) => {
                const position = index - currentSlide;
                const isCenter = position === 0;
                const distance = Math.abs(position);
                
                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ease-out ${isCenter ? 'z-30' : distance === 1 ? 'z-20' : 'z-10'}`}
                    style={{
                      transform: `
                        translateX(${position * 280}px)
                        translateZ(${-distance * 300}px)
                        rotateY(${position * -15}deg)
                        scale(${1 - distance * 0.25})
                      `,
                      filter: `blur(${distance * 3}px)`,
                      opacity: distance > 2 ? 0 : 1 - distance * 0.2,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                      isCenter ? 'w-[500px] h-[500px] ring-4 ring-amber-400' : 'w-[400px] h-[400px]'
                    }`}>
                      <Image
                        src={`/${img}`}
                        alt={`Property ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500"
                        quality={100}
                        unoptimized
                        sizes="500px"
                      />
                      
                      {/* Overlay for non-center images */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-slate-900/50" />
                      )}
                      
                      {/* Center Image Info */}
                      {isCenter && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent">
                          <div className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
                            Featured Property {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white">Premium Estate</h3>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
              className="absolute left-8 z-40 group p-4 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-amber-400 transition-all duration-300 shadow-xl"
            >
              <svg className="w-6 h-6 text-white group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
              className="absolute right-8 z-40 group p-4 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-amber-400 transition-all duration-300 shadow-xl"
            >
              <svg className="w-6 h-6 text-white group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-12 bg-amber-400' : 'w-2 bg-slate-400/60 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Gallery - Swipeable Card View */}
          <div className="md:hidden relative w-full px-4">
            <div className="relative overflow-hidden">
              {/* Single Card Display */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-amber-400">
                  <Image
                    src={`/pg ${currentSlide + 1}.jpg`}
                    alt={`Property ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw"
                  />
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                      Featured Property {currentSlide + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white">Premium Estate</h3>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Mobile Optimized */}
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 backdrop-blur-md active:bg-amber-400 transition-all duration-200 shadow-xl"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/90 backdrop-blur-md active:bg-amber-400 transition-all duration-200 shadow-xl"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicators - Mobile */}
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-400/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-900 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">View Full Portfolio</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900/95 relative overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-amber-400 to-transparent rounded-full blur-3xl" />
        </div>

        <div 
          ref={premiumSection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            premiumSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-bold tracking-[0.2em] uppercase">Excellence in Service</span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-amber-50 to-white bg-clip-text text-transparent">
              Our Signature Services
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your unique needs
            </p>
          </div>

          {/* Services Grid - Staggered Layout */}
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Service 1 */}
            <div className="group relative md:mt-0">
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/service 1.jpg"
                    alt="Premium Service 1"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-slate-900 font-bold text-lg">01</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    Real Estate Done Right
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!
                  </p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Buy & Sell with Confidence
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Investment Property Guidance
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Market Insights & Analysis
                    </li>
                  </ul>

                  <button className="group/btn inline-flex items-center gap-2 text-amber-400 font-semibold hover:gap-3 transition-all hover:text-amber-300">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative md:mt-8">
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/service 2.jpg"
                    alt="Premium Service 2"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-slate-900 font-bold text-lg">02</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    Commercial & Residential
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Large or small, condo or mansion, we can find it and get at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.
                  </p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Condos to Luxury Estates
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Fixer-Uppers & Investment Properties
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Local Community Expertise
                    </li>
                  </ul>

                  <button className="group/btn inline-flex items-center gap-2 text-amber-400 font-semibold hover:gap-3 transition-all hover:text-amber-300">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative md:mt-0">
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/service 3.jpg"
                    alt="Premium Service 3"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-slate-900 font-bold text-lg">03</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    Rely on Expertise
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.
                  </p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Affordability & Credit Guidance
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Loan Options & Financing
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Expert Connections & Support
                    </li>
                  </ul>

                  <button className="group/btn inline-flex items-center gap-2 text-amber-400 font-semibold hover:gap-3 transition-all hover:text-amber-300">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tl from-amber-500 via-orange-500 to-amber-600 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="testimonial-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
          </svg>
        </div>
        
        <div 
          ref={testimonialsSection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-bold tracking-[0.2em] uppercase">
                Client Testimonials
              </span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Hear what our clients say about their experience working with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah & John M.', role: 'First-Time Home Buyers', comment: 'Marci made our home buying experience seamless. Her knowledge of the market and dedication to finding us the perfect home was outstanding.', initial: 'S', color: 'from-amber-400 to-orange-500' },
              { name: 'Robert K.', role: 'Luxury Property Seller', comment: 'Sold our property above asking price in less than two weeks! Her marketing strategy and negotiation skills are unmatched.', initial: 'R', color: 'from-amber-500 to-orange-600' },
              { name: 'Jennifer L.', role: 'Investment Property Buyer', comment: 'Working with Marci was a pleasure. She guided us through every step and was always available to answer our questions. Highly recommend!', initial: 'J', color: 'from-orange-400 to-amber-500' }
            ].map((testimonial, index) => (
              <div key={index} className="group relative">
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                {/* Quote Icon Background */}
                <div className="absolute -top-6 -left-6 text-amber-500/20 group-hover:text-amber-500/30 transition-colors duration-500 z-0">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-amber-500/20 border border-white/10 group-hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-200 mb-8 leading-relaxed text-base flex-grow relative z-10 italic">
                    "{testimonial.comment}"
                  </p>

                  {/* Decorative Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full rotate-45" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center font-bold text-white text-lg shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                      <span className="relative">{testimonial.initial}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg group-hover:text-amber-300 transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold">
                Trusted by 100+ Happy Clients
              </span>
              <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 lg:py-24 px-4 md:px-6 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />

        <div 
          ref={contactSection.elementRef}
          className={`max-w-7xl mx-auto relative transition-all duration-700 ${
            contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200/50 shadow-lg mb-4 md:mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-900 text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">
                Get In Touch
              </span>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 md:mb-4 px-4">
              Let's Make Your Move
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-amber-600 font-semibold px-4 max-w-3xl mx-auto">
              Ready to buy or sell your property? I'm here to help you every step of the way
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Contact Form */}
            <div>
              {/* Contact Form */}
              <div className="p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 flex flex-col">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Send a Message</h3>
                  <p className="text-sm md:text-base text-slate-600">Fill out the form below and I'll get back to you within 24 hours</p>
                </div>

                <form className="flex-1 flex flex-col min-h-0">
                  <div className="space-y-4 md:space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white text-slate-900 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white text-slate-900 transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white text-slate-900 transition-all duration-300"
                          placeholder="(206) 555-0123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        I'm Interested In
                      </label>
                      <select className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white text-slate-900 transition-all duration-300">
                        <option>Buying a Property</option>
                        <option>Selling a Property</option>
                        <option>Property Valuation</option>
                        <option>Investment Opportunities</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white text-slate-900 resize-none transition-all duration-300 h-20 lg:h-24"
                        placeholder="Tell me about your real estate needs..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full py-2 md:py-3 mt-2 md:mt-3 flex-shrink-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 overflow-hidden flex items-center justify-center gap-2 md:gap-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <span className="relative font-semibold">Send Message</span>
                    
                    <svg className="relative w-5 h-5 md:w-6 md:h-6 text-amber-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Google Map */}
            <div className="space-y-6 flex flex-col">
              <div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white h-[300px] lg:h-[420px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.1234567890!2d-115.9552875!3d36.1844024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDExJzAzLjgiTiAxMTXCsDU3JzE5LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-0 contrast-110"
                  />
                  
                  {/* Map Overlay Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-slate-900">Our Office</span>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <div className="absolute bottom-4 right-4">
                    <a
                      href="https://maps.google.com/?q=3190+HW-160+Suite+F+Pahrump+Nevada+89048"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-md hover:bg-amber-500 rounded-xl font-semibold text-slate-900 hover:text-white shadow-lg transition-all duration-300 border border-slate-200 hover:border-amber-500 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards - Responsive Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  title: 'Call Us',
                  content: '(206) 919-6886',
                  link: 'tel:206-919-6886',
                  color: 'from-amber-400 to-yellow-500'
                },
                {
                  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                  title: 'Visit Us',
                  content: '3190 HW-160, Suite F, Pahrump, NV',
                  link: 'https://maps.google.com/?q=3190+HW-160+Suite+F+Pahrump+Nevada+89048',
                  color: 'from-amber-400 to-yellow-500'
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  title: 'Hours',
                  content: 'Daily: 8:00 AM - 7:00 PM',
                  color: 'from-amber-400 to-yellow-500'
                }
              ].map((item, index) => (
                <div key={index} className="group relative h-full">
                  <div className="relative p-5 md:p-6 bg-slate-50 rounded-2xl shadow-md hover:shadow-lg border border-slate-200/50 hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300 hover:-translate-y-1 h-full md:min-h-[140px] flex flex-col">
                    <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div className="w-full flex-1 flex flex-col justify-center text-left md:text-center">
                        <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-600 text-sm font-normal hover:text-amber-600 transition-colors break-words">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-slate-600 text-sm font-normal">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Social Links - Below Map */}
          <div className="mt-6 md:mt-8">
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl shadow-md border border-slate-200/50">
              <h3 className="font-bold text-slate-900 text-base md:text-lg mb-3 md:mb-4 text-center">Connect With Us</h3>
              <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
                {[
                  { 
                    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>, 
                    name: 'Facebook',
                    url: 'https://www.facebook.com/MarciHomes/'
                  },
                  { 
                    icon: <><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></>, 
                    name: 'Instagram',
                    url: 'https://www.instagram.com/marciandlauren_nvrealtors/'
                  },
                  { 
                    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>, 
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/marci-metzger-30642496/'
                  },
                  { 
                    icon: <><ellipse cx="12" cy="5.5" rx="3" ry="5" transform="rotate(-20 12 12)"/><ellipse cx="12" cy="6" rx="2.5" ry="4" transform="rotate(52 12 12)"/><ellipse cx="12" cy="6" rx="2.5" ry="4" transform="rotate(124 12 12)"/><ellipse cx="12" cy="6" rx="2.5" ry="4" transform="rotate(196 12 12)"/><ellipse cx="12" cy="6" rx="2.5" ry="4" transform="rotate(268 12 12)"/></>, 
                    name: 'Yelp',
                    url: 'https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w'
                  }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social p-3 md:p-4 rounded-xl border-2 border-slate-300 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-110 active:scale-95" 
                    title={social.name}
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-slate-600 group-hover/social:text-amber-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-slate-400 mb-3 text-lg">
              © 2025 Marci Metzger - The Ridge Realty Group. All rights reserved.
            </p>
            <p className="text-sm text-slate-500">
              Pahrump's Premier Real Estate Professional | Licensed Realtor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
