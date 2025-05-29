<script setup>
import { ref } from "vue";
import { Head, Link } from '@inertiajs/vue3';
import $ from "jquery";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const introSliderImgs = ref([
    "/images/introbg.jpg",
    "/images/introbg2.jpg",
    "/images/introbg3.jpg",
    "/images/introbg4.jpg",
]);

const servicesSliderImgs = ref([
    "/images/s1.jpg",
    "/images/s2.jpg",
    "/images/s3.jpg",
    "/images/s4.jpg",
    "/images/s5.jpg",
    "/images/s6.jpg",
    "/images/s7.jpg",
    "/images/s8.jpg",
    "/images/s9.jpg",
    "/images/s10.jpg",
    "/images/s11.jpg",
    "/images/s12.jpg",
    "/images/s13.jpg",
    "/images/s14.jpg",
    "/images/s15.jpg",
    "/images/s16.jpg",
]);

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    }
});

function handleImageError() {
    document.getElementById('screenshot-container')?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document.getElementById('docs-card-content')?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
}

const scrollToDiv = (divId) => {
    const element = document.getElementById(divId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const openMobileMenu = () => {
    if ($('#mobile-menu-button').hasClass('open')) {
        $('#mobile-menu-button').removeClass('open')
        $('#navigation-menu').slideUp()
    } else {
        $('#mobile-menu-button').addClass('open')
        $('#navigation-menu').slideDown()
    }
}

</script>


<style type="text/css">
img-comparison-slider {
    --divider-width: 5px;
    --divider-color: #1d3852;
    --default-handle-opacity: 1;
    --default-handle-width: 100px;
    --default-handle-color: #1d3852;
    --default-handle-stroke: 5px;
    outline: none !important;
}
</style>


<template>

    <Head title="Home" />

    <!-- <html class="h-full" lang="en"> 
         <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous">
  <link id="google-fonts-link"
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;family=Work+Sans:wght@300;400;500;600;700&amp;display=swap"
    rel="stylesheet">

  <style media="all" id="fa-kit-upload"></style>
  <link rel="stylesheet" href="./styles/fontawsome.css">
  <link rel="stylesheet" href="./styles/fontface.css">
  <link rel="stylesheet" href="./styles/tailwind.css">
</head> -->


    <body class="h-full bg-white pt-[18px]">
        <div class="frame-root">
            <div class="frame-content">
                <div class="[font-family:var(--font-family-body)]">
                    <div>
                        <section class="code-section pb-[18px]" id="slpchw4">
                            <div class="p-[18px] bg-[#EFEFED] rounded-[35px] mx-[18px]">
                                <header class="w-full code-section mb-[60px]" id="sor4t18">
                                    <nav class="ml-auto">
                                        <div class="relative flex items-center justify-between">
                                            <a href="/" class="logo"></a>

                                            <button id="mobile-menu-button" data-collapse-toggle="navigation-menu"
                                                type="button"
                                                class="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#1d3852] lg:hidden"
                                                aria-controls="navigation-menu" aria-expanded="false"
                                                aria-label="Navigation Menu" @click=openMobileMenu()>
                                                <i class="fa-regular fa-bars-sort text-xl text-white"
                                                    aria-hidden="true"></i>
                                            </button>

                                            <div id="navigation-menu"
                                                class="absolute left-0 top-full z-50 mt-4 hidden w-full flex-1 bg-[#FFFFFF] lg:static lg:mt-0 lg:flex items-stretch lg:justify-between lg:bg-transparent">
                                                <ul
                                                    class="flex flex-1 flex-col lg:flex-row lg:items-center justify-end">
                                                    <li
                                                        class="flex items-center border-t border-[var(--light-border-color)] px-2 py-4 lg:border-t-transparent lg:p-0 mr-[20px]">
                                                        <a href="javascript:;" @click="scrollToDiv('about')"
                                                            class="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm">
                                                            About Us
                                                        </a>
                                                    </li>

                                                    <li
                                                        class="flex items-center border-t border-[var(--light-border-color)] px-2 py-4 lg:border-t-transparent lg:p-0 mr-[20px]">
                                                        <div class="group relative">
                                                            <a href="javascript:;" @click="scrollToDiv('services')"
                                                                class="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm">
                                                                Our Services
                                                            </a>
                                                        </div>
                                                    </li>

                                                    <li
                                                        class="flex items-center border-t border-[var(--light-border-color)] px-2 py-4 lg:border-t-transparent lg:p-0 mr-[20px]">
                                                        <a href="javascript:;" @click="scrollToDiv('contact')"
                                                            class="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm">Contact</a>
                                                    </li>
                                                </ul>

                                                <div v-if="canLogin"
                                                    class="mt-4 flex flex-col items-center space-y-4 lg:mt-0 lg:flex-row lg:space-x-4 lg:space-y-0">
                                                    <Link v-if="$page.props.auth.user" :href="route('dashboard')"
                                                        class="secBtn flex items-center justify-between gap-1 rounded-full bg-[#FFFFFF] h-[50px] p-[5px] pl-6 text-sm font-medium text-black xl:gap-6 xl:text-lg">
                                                    Dashboard
                                                    <span
                                                        class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-color)]">
                                                        <i class="fa-regular fa-arrow-right text-lg text-[var(--light-text-color)]"
                                                            aria-hidden="true"></i>
                                                    </span>
                                                    </Link>

                                                    <template v-else>
                                                        <Link :href="route('login')"
                                                            class="secBtn flex items-center justify-between gap-1 rounded-full bg-[#FFFFFF] h-[50px] p-[5px] pl-6 text-sm font-medium text-black xl:gap-6 xl:text-lg">
                                                        Log in
                                                        <span
                                                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-color)]">
                                                            <i class="fa-regular fa-arrow-right text-lg text-[var(--light-text-color)]"
                                                                aria-hidden="true"></i>
                                                        </span>
                                                        </Link>

                                                        <!-- <Link v-if="canRegister" :href="route('register')"
                                                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                                        Register
                                                        </Link> -->
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </header>

                                <div class="relative m-0 bg-cover bg-center bg-no-repeat">
                                    <!-- <div
                  class="absolute left-2.5 top-[90px] flex hidden h-[209px] w-[209px] items-center justify-center rounded-full bg-[var(--light-background-color)] bg-opacity-10 xl:top-[232px] xl:block">
                </div> -->
                                    <!-- <div
                  class="absolute right-[22vw] top-[-75px] hidden h-[1000px] w-[230px] rotate-[-18.74deg] bg-[var(--primary-color)] opacity-[0.1] xl:top-[-102px] xl:block xl:h-[1500px] xl:w-[326px]">
                </div> -->
                                    <span
                                        class="absolute left-[15%] top-[10%] flex h-[270px] w-[270px] items-center justify-center rounded-full bg-[var(--primary-color)] opacity-30 blur-[80px] sm:left-[32%] sm:h-[315px] sm:w-[315px] lg:top-[25%]"></span>
                                    <div class="ml-auto">
                                        <div class="flex flex-col items-center lg:flex-row">
                                            <div class="w-full lg:w-[50%]">
                                                <div
                                                    class="relative logobg h-[600px] w-full rounded-[35px] overflow-hidden ">
                                                    <div id="introSlider">
                                                        <Swiper
                                                            :autoplay="{ delay: 2500, disableOnInteraction: false, }"
                                                            :pagination="{ clickable: true, }" :slides-per-view="1"
                                                            :loop="true" :modules="[Autoplay, Pagination, Navigation]">
                                                            <SwiperSlide v-for="(image, index) in introSliderImgs"
                                                                :key="index">
                                                                <img :src="image" alt="Image" />
                                                            </SwiperSlide>
                                                        </Swiper>
                                                    </div>
                                                    <!-- <img
                          src="https://images.unsplash.com/photo-1684607632829-1e5bf4f21dab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyMXx8b3J0aG9kb250aWNzfGVufDB8MHx8fDE3Mzc3OTE0MTF8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920"
                          class="w-full object-cover lg:h-[500px] rounded-[35px] dont-replace" alt=""
                          data-landingsite-gallery-type="image" data-seo-image=""
                          data-media="{&quot;id&quot;:&quot;f6a2ZaBytUM&quot;,&quot;src&quot;:&quot;unsplash&quot;,&quot;type&quot;:&quot;image&quot;}"
                          oncontextmenu="return false;"> 

                          <div class="absolute bottom-[20px] right-[20px] hidden lg:block">
                          <div
                            class="ml-auto max-w-[350px] rounded-[20px] border border-white border-opacity-50 bg-[#A0A0A0] bg-opacity-30 p-4 backdrop-blur-[2.5px] xl:max-w-[420px]">
                            <h4 class="text-2xl font-medium text-[#FFFFFF]">Are you a dentist?</h4>
                            <p class="text-base font-normal leading-5 text-[#FFFFFF] xl:text-lg xl:leading-[30px]">
                              Upload your model file and request a quote
                            </p>
                            <div class="mt-2.5 flex items-center justify-end xl:mt-5">
                              <a href="/login"
                                class="primBtn pl-[20px] flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-[var(--primary-color)] text-base font-medium text-[var(--primary-button-text-color)] xl:gap-[18px] xl:text-lg">
                                Go To Portal
                                <span
                                  class="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]">
                                  <i class="fa-regular fa-arrow-right text-lg text-[var(--primary-color)]"
                                    aria-hidden="true"></i>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div> -->
                                                </div>
                                            </div>
                                            <div class="relative w-full px-5 text-center lg:w-[50%] pl-6 lg:text-left">
                                                <h1 class="mb-5 font-semibold leading-[42px] text-black text-[35px]">
                                                    Orthodontics . Pedodontics . Clear Aligners
                                                </h1>
                                                <p
                                                    class="mb-10 max-w-full text-center text-lg font-normal leading-[30px] text-black sm:mb-5 lg:max-w-[400px] lg:text-left lg:text-sm lg:leading-5 xl:mb-9 xl:max-w-[620px] xl:leading-[30px] 2xl:text-lg">
                                                    Orthodentlb specializes in crafting high-quality appliances that
                                                    ensure
                                                    optimal comfort and
                                                    effectiveness. Our commitment to precision guarantees treatment
                                                    success
                                                    and patient’s
                                                    satisfaction.
                                                </p>
                                                <a href="javascript:;" @click="scrollToDiv('contact')"
                                                    class="primBtn mx-auto inline-flex  items-center justify-center rounded-full bg-[var(--primary-color)] h-[50px] p-[5px] pl-6 text-lg font-medium text-[var(--primary-button-text-color)] sm:mx-0">
                                                    <i class="fa-solid fa-envelope text-[var(--primary-button-text-color)]"
                                                        aria-hidden="true"></i>&nbsp;
                                                    Reach Out Today
                                                    <span
                                                        class="ml-[20px] flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-button-text-color)]">
                                                        <i class="fa-regular fa-arrow-right text-lg text-[var(--primary-color)]"
                                                            aria-hidden="true"></i>
                                                    </span>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section class="block bg-[#EFEFED] code-section" id="s6z9ier">
                        <div class="z-[100] w-full p-[18px] py-[50px]" id="about">
                            <div class="mx-[auto] w-full max-w-[90rem]">
                                <div class="px-0">
                                    <div>
                                        <div class="flex justify-between gap-4 pb-[50px]">
                                            <div class="flex flex-col items-start gap-4 w-[40%] mr-[20px]">
                                                <p
                                                    class="my-0 font-medium text-[var(--accent-color)] md:text-lg text-[var(--primary-color)]">
                                                    About us</p>
                                                <h2 class="my-0 text-[30px] font-semibold leading-[1.2]"><i>Excellence
                                                        in
                                                        Every Case</i></h2>
                                                <p class="my-0">
                                                    At Orthodentlb, we combine advanced technology, expert
                                                    craftsmanship,
                                                    and an unwavering
                                                    commitment to excellence to deliver precision and quality in every
                                                    case.
                                                    With over 15 years of
                                                    experience, we proudly collaborate with international dental
                                                    professionals to provide
                                                    efficient solutions that meet the highest standards of care.
                                                </p>
                                            </div>

                                            <div class="w-[50%] pl-[20px]" style="z-index:1;">
                                                <div class="flex flex-col items-start gap-4 bg-[#dadddd] relative p-[20px]  rounded-[30px]"
                                                    style="z-index:1;">
                                                    <h2 class="my-0 text-[30px] font-semibold leading-[1.2]">
                                                        Let's become partners</h2>
                                                    <p class="my-0">
                                                        Simply go through the below simple steps
                                                    </p>

                                                    <ul class="stepsList">
                                                        <li>Create an account</li>
                                                        <li>Upload STL file</li>
                                                        <li>Fill in the details</li>
                                                        <li>Submit</li>
                                                        <li>Wait for our confirmation</li>
                                                    </ul>

                                                    <p class="my-0 text-sm text-gray-500 italic">
                                                        PS. You can track your case order throughout the manufacturing
                                                        process.
                                                    </p>

                                                    <div class="actions flex justify-end w-[100%]">

                                                        <div v-if="canLogin"
                                                            class="mt-4 flex flex-col items-center space-y-4 lg:mt-0 lg:flex-row lg:space-x-4 lg:space-y-0">
                                                            <Link v-if="$page.props.auth.user"
                                                                :href="route('dashboard')"
                                                                class="primBtn pl-[20px] inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-[var(--primary-color)] text-base font-medium text-[var(--primary-button-text-color)] xl:gap-[18px] xl:text-lg">
                                                            Dashboard
                                                            <span
                                                                class="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]">
                                                                <i class="fa-regular fa-arrow-right text-lg text-[var(--primary-color)]"
                                                                    aria-hidden="true"></i>
                                                            </span>
                                                            </Link>

                                                            <template v-else>
                                                                <Link :href="route('login')"
                                                                    class="primBtn pl-[20px] inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-[var(--primary-color)] text-base font-medium text-[var(--primary-button-text-color)] xl:gap-[18px] xl:text-lg">
                                                                Log in
                                                                <span
                                                                    class="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]">
                                                                    <i class="fa-regular fa-arrow-right text-lg text-[var(--primary-color)]"
                                                                        aria-hidden="true"></i>
                                                                </span>
                                                                </Link>
                                                            </template>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="bg-[#EFEFED] px-[18px] z-1 relative" style="display:none;">
                        <div class="rounded-[30px] overflow-hidden bg-cover bg-no-repeat sm:rounded-[50px]  bg-center-bottom bg-[#EFEFED] bg-[url(&quot;https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/0af669b6-0d2a-4e26-b481-895d34650e00/public&quot;)] code-section"
                            data-landingsite-gallery-type="image"
                            data-media="{&quot;id&quot;:&quot;926557466&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"
                            id="sin4ufd">
                            <div class="mx-auto">
                                <div
                                    class="bg-[#000000] bg-opacity-40 px-5 pb-10 pt-10 backdrop-blur-[5px] sm:py-10 sm:backdrop-opacity-[2.5px] xl:px-0 xl:pb-[90px] xl:pt-[100px]">
                                    <div class="text-center">
                                        <h2 class="mb-3 text-[30px] font-semibold leading-[60px] text-[#FFFFFF] ">
                                            Unlock Your Perfect Smile</h2>
                                        <p
                                            class="mx-auto max-w-[837px] text-lg font-medium leading-[30px] text-[#FFFFFF] sm:leading-6 md:text-xl lg:leading-[30px]">
                                            Orthodentlb is your premier orthodontics lab dedicated to delivering
                                            exceptional
                                            retainers and
                                            teeth
                                            alignment devices. Our expertly crafted braces provide unparalleled comfort
                                            while effectively
                                            aligning your teeth, empowering you to smile with confidence.</p>
                                    </div>
                                    <div class="mx-auto mt-9 max-w-[290px] sm:max-w-[1170px]">
                                        <div class="flex flex-nowrap items-start justify-center flexcont">
                                            <div class="mb-[26px] w-1/2 pr-4 sm:mb-0 sm:w-auto lg:pr-[50px]">
                                                <h2
                                                    class="text-[28px] font-medium leading-none text-[#FFFFFF] sm:text-3xl lg:text-[44px] lg:leading-normal xl:text-[60px] xl:leading-[78px]">
                                                    350</h2>
                                                <p class="leading-3.5 text-xs font-normal text-[#FFFFFF]">
                                                    Orthodontic Devices Crafted</p>
                                            </div>
                                            <div class="w-1/2 px-4 sm:w-auto lg:px-[50px]">
                                                <h2
                                                    class="text-[28px] font-medium leading-none text-[#FFFFFF] sm:text-3xl lg:text-[44px] lg:leading-normal xl:text-[60px] xl:leading-[78px]">
                                                    1200</h2>
                                                <p class="leading-3.5 text-xs font-normal text-[#FFFFFF]">
                                                    Happy Clients Served</p>
                                            </div>
                                            <div class="w-1/2 pr-4 sm:w-auto sm:px-4 lg:px-[50px]">
                                                <h2
                                                    class="text-[28px] font-medium leading-none text-[#FFFFFF] sm:text-3xl lg:text-[44px] lg:leading-normal xl:text-[60px] xl:leading-[78px]">
                                                    400</h2>
                                                <p class="leading-3.5 text-xs font-normal text-[#FFFFFF]">
                                                    Custom Solutions Developed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="relative  px-[18px] code-section bg-[#EFEFED] " id="s0m4vzq">
                        <div class="mx-auto py-[60px]" id="services">
                            <div class="flex lg:flex-row justify-between items-center">
                                <div class=" w-[50%] ">
                                    <div class="servicesslider" id="servicesSlider">
                                        <Swiper :autoplay="{ delay: 2500, disableOnInteraction: false, }"
                                            :pagination="{ clickable: true, }" :slides-per-view="1" :loop="true"
                                            :modules="[Autoplay, Pagination, Navigation]">
                                            <SwiperSlide v-for="(image, index) in servicesSliderImgs" :key="index">
                                                <img :src="image" alt="Image" />
                                            </SwiperSlide>
                                        </Swiper>
                                        <!-- <div class="relative">
                                            <img src="../../../public/images/s1.jpg" alt="">
                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">Orthodontic
                                                    &amp; Pedodontic appliances</h6>
                                                <p class="font-normal text-white">
                                                    Designed for orthodontic care and precise results.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s2.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">OrthoApnea
                                                </h6>
                                                <p class="font-normal text-white">
                                                    We prioritize your comfort and satisfaction throughout your
                                                    treatment.


                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s3.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">Digital positioning of
                                                    MSE

                                                </h6>
                                                <p class="font-normal text-white">
                                                    Our products are built with the best materials to ensure
                                                    long-lasting
                                                    durability.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s4.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">Clear aligners
                                                </h6>
                                                <p class="font-normal text-white">
                                                    Trust in our team of skilled orthodontic experts for exceptional
                                                    results.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s5.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">Mouthguards &
                                                    Nightguards
                                                </h6>
                                                <p class="font-normal text-white">
                                                    Our custom-fitted mouthguards and nightguards provide optimal
                                                    protection
                                                    and comfort.


                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s6.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">PUL concept

                                                </h6>
                                                <p class="font-normal text-white">
                                                    Discover our innovative solutions.
                                                </p>
                                            </div>
                                        </div>

                                        <div class="relative">
                                            <img src="../../../public/images/s7.jpg" alt="">

                                            <div
                                                class="absolute bottom-[20px] left-[20px] serviceInfo  backdrop-blur-[5px] ">
                                                <h6 class="text-white text-l font-semibold">Digital study model

                                                </h6>
                                                <p class="font-normal text-white">
                                                    We take a comprehensive approach to orthodontic care for better
                                                    outcomes.
                                                </p>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>


                                <div class="mb-5 pl-[20px] w-[50%]">
                                    <div
                                        class="flex items-center text-lg font-medium text-[var(--dark-text-color)] sm:text-base xl:text-lg">
                                        <p
                                            class="my-0 font-medium text-[var(--accent-color)] md:text-lg text-[var(--primary-color)]">
                                            Our Services
                                        </p>
                                    </div>
                                    <h2
                                        class="mx-auto mb-2.5 text-[30px] font-medium leading-[45px] text-[var(--dark-text-color)]">
                                        Unmatched
                                        <span class="text-[var(--primary-color)]">Orthodontics</span>
                                        Solutions
                                    </h2>
                                    <p class="mb-[15px] font-normal leading-[30px] text-[var(--dark-text-color)]">
                                        Experience unparalleled orthodontic expertise with Orthodentlb. Each device is
                                        designed to fit your
                                        patient's needs and concerns, ensuring the journey towards a confident smile is
                                        both
                                        effective and
                                        pleasant. Connect with us today and let's take your practice to the next level
                                        together!
                                    </p>
                                    <div class="servicesList">
                                        <ul>
                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > Orthodontic &amp; Pedodontic appliances
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > OrthoApnea
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > Digital positioning of MSE
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > Clear aligners
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > Mouthguards & Nightguards
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > PUL concept
                                                </h6>
                                            </li>

                                            <li>
                                                <h6 class="text-l text-[var(--dark-text-color)] font-semibold">
                                                    > Digital study model
                                                </h6>
                                            </li>

                                        </ul>
                                    </div>
                                    <!-- <div class="text-left">
                    <a href="javascript:;" @click="scrollToDiv('contact')"
                      class="primBtn mx-auto inline-flex h-[50px] items-center justify-start gap-3 rounded-full bg-[var(--primary-color)] p-[5px] pl-6 text-lg font-medium text-[var(--primary-button-text-color)] md:mx-0">
                      View All Services
                      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]">
                        <i class="fa-regular fa-arrow-right text-lg text-[var(--primary-color)]" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div> -->

                                </div>

                            </div>
                        </div>
                        <!-- <div class="absolute left-0 top-[194px] hidden sm:block">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/0166019e-a1a1-47f5-f881-36be06926d00/publicContain"
                alt="">
            </div> -->
                    </section>

                    <section class="relative  px-[18px] code-section bg-[#EFEFED] " id="s0m4vzqq">
                        <div class="mx-auto py-[60px]" id="services">
                            <div class="flex lg:flex-row justify-between items-center">
                                <div class="mb-5 pr-[20px] w-[50%]">
                                    <div
                                        class="flex items-center text-lg font-medium text-[var(--dark-text-color)] sm:text-base xl:text-lg">
                                        <p
                                            class="my-0 font-medium text-[var(--accent-color)] md:text-lg text-[var(--primary-color)]">
                                            Before and After
                                        </p>
                                    </div>
                                    <h2
                                        class="mx-auto mb-2.5 text-[30px] font-medium leading-[45px] text-[var(--dark-text-color)]">
                                        Transformations That 
                                        <span class="text-[var(--primary-color)]">Speak Volumes</span>

                                    </h2>
                                    <p class="mb-[15px] font-normal leading-[30px] text-[var(--dark-text-color)]">
                                        At Orthodent, we take pride in creating smiles that not only look beautiful but
                                        also boost our
                                        patients' confidence. Explore some of our remarkable smile transformations
                                        below.
                                    </p>
                                </div>

                                <div class=" w-[50%] comparison-section rounded-[30px] overflow-hidden">
                                    <ImgComparisonSlider>
                                        <!-- eslint-disable -->
                                        <img slot="first" style="width: 100%" src="images/before1.jpg" />

                                        <img slot="second" style="width: 100%" src="images/after1.jpg" />
                                        <!-- eslint-enable -->

                                        <svg slot="handle" class="custom-animated-handle"
                                            xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 24 24"
                                            fill="none">
                                            <path
                                                d="M16.1359 18.2928C16.5264 18.6833 17.1596 18.6833 17.5501 18.2928L22.4375 13.4006C23.2179 12.6194 23.2176 11.3536 22.4369 10.5728L17.5465 5.68247C17.156 5.29195 16.5228 5.29195 16.1323 5.68247C15.7418 6.073 15.7418 6.70616 16.1323 7.09669L20.3179 11.2823C20.7085 11.6729 20.7085 12.306 20.3179 12.6965L16.1359 16.8786C15.7454 17.2691 15.7454 17.9023 16.1359 18.2928Z"
                                                fill="#1d3852" />
                                            <path
                                                d="M7.88675 5.68247C7.49623 5.29195 6.86307 5.29195 6.47254 5.68247L1.58509 10.5747C0.804698 11.3559 0.805008 12.6217 1.58579 13.4024L6.47615 18.2928C6.86667 18.6833 7.49984 18.6833 7.89036 18.2928C8.28089 17.9023 8.28089 17.2691 7.89036 16.8786L3.70471 12.6929C3.31419 12.3024 3.31419 11.6692 3.70472 11.2787L7.88675 7.09669C8.27728 6.70616 8.27728 6.073 7.88675 5.68247Z"
                                                fill="#1d3852" />
                                        </svg>
                                    </ImgComparisonSlider>
                                </div>

                            </div>
                        </div>
                        <!-- <div class="absolute left-0 top-[194px] hidden sm:block">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/0166019e-a1a1-47f5-f881-36be06926d00/publicContain"
                alt="">
            </div> -->
                    </section>

                    <section class="bg-[#EFEFED] px-[18px]" style="display:none;">
                        <div class="rounded-[30px] bg-cover bg-no-repeat overflow-hidden sm:rounded-[50px] bg-[url(&quot;https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/f044ee79-9d51-4952-0fef-2beaea107c00/public&quot;)] code-section"
                            data-landingsite-gallery-type="image"
                            data-media="{&quot;id&quot;:&quot;611902592&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"
                            id="sjmydc">
                            <div class="mx-auto">
                                <div
                                    class=" rounded-[40px] bg-[#000000] bg-opacity-40 px-5 pb-10 pt-10 backdrop-blur-[5px] sm:backdrop-opacity-[2.5px]">

                                    <div class="mx-auto max-w-[740px] px-5 text-center sm:px-0 xl:max-w-[920px]">
                                        <h2 class=" mb-4 text-[30px] font-medium leading-10 text-[#FFFFFF]">
                                            Transform Your Smile with Orthodentlb's Expertise
                                        </h2>
                                        <p
                                            class="mx-auto max-w-[865px] text-lg font-normal leading-[30px] text-[#FFFFFF] sm:text-base xl:text-lg">
                                            Achieve a beautifully aligned smile with our custom-crafted retainers and
                                            braces, designed for
                                            your
                                            unique dental needs. Each appliance is a blend of precision and innovation,
                                            ensuring both comfort
                                            and effectiveness throughout your orthodontic journey.
                                        </p>
                                    </div>

                                    <div
                                        class="contactusdiv flex mt-14 gap-[20px] justify-between px-[18px] items-center">

                                        <div class="left w-[50%] rounded-[20px]  bg-opacity-30 px-4 py-4"
                                            style="border:1px solid rgba(255,255,255,0.7);display:none;">
                                            <h6 class="mb-4 text-[25px] font-bold leading-10 text-[#ffffff]">Send Us a
                                                Message</h6>

                                            <form class="contact-form mb-0">
                                                <!-- <label for="name">Name</label> -->
                                                <input type="text" id="name" name="name" placeholder="Your Name"
                                                    required
                                                    class="bg-opacity-30 p-2 px-4 backdrop-blur-[5px] bg-[#ffffff]">

                                                <!-- <label for="email">Email</label> -->
                                                <input type="email" id="email" name="email" placeholder="Your Email"
                                                    required
                                                    class="bg-opacity-30 p-2 px-4 backdrop-blur-[5px] bg-[#ffffff]">

                                                <!-- <label for="message">Message</label> -->
                                                <textarea id="message" name="message" rows="5"
                                                    placeholder="Your Message" required
                                                    class="bg-opacity-30 p-2 px-4 backdrop-blur-[5px] bg-[#ffffff]"></textarea>
                                                <br>
                                                <div class="actions flex justify-end">
                                                    <a
                                                        class="secBtn inline-flex items-center justify-between gap-1 rounded-full bg-[#FFFFFF] h-[50px] p-[5px] pl-6 text-sm font-medium text-black xl:gap-6  xl:text-lg">Send
                                                        <span
                                                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-color)]">
                                                            <i class="fa-regular fa-arrow-right text-lg text-[var(--light-text-color)]"
                                                                aria-hidden="true"></i>
                                                        </span>
                                                    </a>
                                                </div>

                                            </form>
                                        </div>

                                        <div class="right w-[30%] px-5 py-2">
                                            <div class="flex flex-col flex-wrap gap-4 lg:static lg:-translate-x-0">
                                                <div class="flex items-center flexitems-center gap-3">

                                                    <a href="tel:+961 76 803 965"
                                                        class="p-[10px] pr-[20px] rounded-[50px] flex items-center text-base font-normal text-[#FFFFFF] xl:text-[22px]"
                                                        target="_blank" rel="noopener noreferrer">
                                                        <div
                                                            class="icondiv flex mr-[20px] h-11 w-11 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px] border-solid border-[1px] border-[#ffffff]">
                                                            <i class="fa-light fa-phone text-2xl text-[#ffffff]"
                                                                aria-hidden="true"></i>
                                                        </div>
                                                        +961 76 803 965
                                                    </a>
                                                </div>

                                                <div class="flex items-center flexitems-center gap-3">

                                                    <a href="mailto:orthodentlebanon@gmail.com"
                                                        class="p-[10px] pr-[20px] rounded-[50px] flex items-center text-base font-normal text-[#FFFFFF] xl:text-[22px]"
                                                        target="_blank" rel="noopener noreferrer">
                                                        <div
                                                            class="icondiv mr-[20px] flex h-11 w-11 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px] border-solid border-[1px] border-[#ffffff]">
                                                            <i class="fa-light fa-envelope text-2xl text-[#ffffff]"
                                                                aria-hidden="true"></i>
                                                        </div>
                                                        orthodentlebanon@gmail.com
                                                    </a>
                                                </div>

                                                <div class="flex items-center flexitems-center gap-3">

                                                    <a href="https://www.google.com/maps/place/Orthodent+lab/@33.8367096,35.5229492,689m/data=!3m2!1e3!4b1!4m15!1m8!3m7!1s0x151f1829296f9431:0x4c0c1f6ac0a0a9fa!2sHadath,+Lebanon!3b1!8m2!3d33.8504679!4d35.5278726!16s%2Fg%2F12215380!3m5!1s0x151f1900217a796d:0xb28c732b65a24393!8m2!3d33.8367052!4d35.5278201!16s%2Fg%2F11lp6169ns?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
                                                        class="p-[10px] pr-[20px] rounded-[50px] flex items-center text-base font-normal text-[#FFFFFF] xl:text-[22px]"
                                                        target="_blank" rel="noopener noreferrer">
                                                        <div
                                                            class="icondiv mr-[20px] flex h-11 w-11 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px] border-solid border-[1px] border-[#ffffff]">
                                                            <i class="fa-light fa-location-dot text-2xl text-[#ffffff]"
                                                                aria-hidden="true"></i>
                                                        </div>
                                                        Hadath, Lebanon
                                                    </a>
                                                </div>


                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                    <section class=" code-section bg-[#EFEFED]" id="shjd7wk">
                        <div id="contact" class=" py-12">
                            <h2
                                class="px-[18px] mx-auto mb-5 text-[30px] font-medium leading-[45px] text-[var(--dark-text-color)] ">
                                Connect with <span class="text-[var(--primary-color)]">Orthodentlb</span></h2>

                            <div class="contactusdiv gap-[20px] justify-between px-[18px] items-center">
                                <div class="right mb-5 w-full py-2 flex">
                                    <div class="flex flex-wrap gap-4 lg:static lg:-translate-x-0 ">
                                        <div class="flex items-center flexitems-center gap-3 mr-[20px]">

                                            <a href="http://wa.me/0096176803965"
                                                class="p-[10px] pr-[20px] rounded-[50px] flex items-center text-base font-normal text-[#FFFFFF] xl:text-[22px]"
                                                target="_blank" rel="noopener noreferrer">
                                                <div
                                                    class="icondiv flex mr-[20px] h-11 w-11 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px] border-solid border-[1px] border-[#ffffff]">
                                                    <i class="fa fa-whatsapp text-2xl text-[#ffffff]"
                                                        aria-hidden="true"></i>
                                                </div>
                                                +961 76 803 965
                                            </a>
                                        </div>

                                        <div class="flex items-center flexitems-center gap-3">

                                            <a href="mailto:orthodentlebanon@gmail.com"
                                                class="p-[10px] pr-[20px] rounded-[50px] flex items-center text-base font-normal text-[#FFFFFF] xl:text-[22px]"
                                                target="_blank" rel="noopener noreferrer">
                                                <div
                                                    class="icondiv mr-[20px] flex h-11 w-11 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px] border-solid border-[1px] border-[#ffffff]">
                                                    <i class="fa-light fa-envelope text-2xl text-[#ffffff]"
                                                        aria-hidden="true"></i>
                                                </div>
                                                orthodentlebanon@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="relative overflow-hidden">

                                <a href="https://www.instagram.com/orthodentlb/" target="_blank"
                                    class="iglink absolute p-4 left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 rounded-full bg-[#08223C] bg-opacity-30 text-center backdrop-blur-[5px]"
                                    style="z-index:1">
                                    <i class="fa-brands fa-instagram text-3xl text-[var(--light-text-color)]"
                                        aria-hidden="true"></i>
                                    <h6
                                        class="text-base font-medium text-[var(--light-text-color)] sm:text-sm xl:text-base whitespace-nowrap">
                                        Follow us
                                        to
                                        enhance your smile journey</h6>
                                </a>
                                <div class="relative flex gap-3.5">

                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/882e5d26-a56e-4575-6580-4c5a1dda7b00/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;2159954113&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/d3284f4a-a0c1-464b-b93f-ac276f8bcf00/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1429256190&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/90e1674b-9e20-41ed-e0c1-6df9dca93200/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1810063951&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">

                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3587d046-6cc5-43c0-b32f-adb05c64e600/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;920978658&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6ff348a1-45d0-463e-94a1-cc9569423300/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1187328108&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src=" https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/24845f5d-25fa-4b47-4534-30d240941c00/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;849810056&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>

                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/882e5d26-a56e-4575-6580-4c5a1dda7b00/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;2159954113&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/d3284f4a-a0c1-464b-b93f-ac276f8bcf00/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1429256190&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/90e1674b-9e20-41ed-e0c1-6df9dca93200/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1810063951&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">

                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/3587d046-6cc5-43c0-b32f-adb05c64e600/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;920978658&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/6ff348a1-45d0-463e-94a1-cc9569423300/publicContain"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;1187328108&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                    <div class="galleryPhoto relative w-[350px]">
                                        <img src=" https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/24845f5d-25fa-4b47-4534-30d240941c00/public"
                                            class="aspect-square rounded-[35px] object-cover" alt=""
                                            data-landingsite-gallery-type="image"
                                            data-media="{&quot;id&quot;:&quot;849810056&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

                <footer class="relative overflow-hidden pt-[130px] bg-[#EFEFED]  md:pt-[180px] code-section"
                    id="slje64">
                    <div class="absolute top-16 flex w-[102%] -translate-y-4 transform justify-end md:left-0 md:w-full">
                        <div
                            class="h-[200px] w-full rotate-[-6deg] transform rounded-tl-[55px] rounded-tr-[35px] opacity-[0.3] bg-[var(--primary-color)] md:w-[98%] md:rotate-[-3deg]">
                        </div>
                    </div>
                    <div class="absolute top-16 flex w-[101%] justify-start md:left-0 md:right-0 md:w-full">
                        <div
                            class="h-[200px] w-full rotate-[-6deg] transform rounded-tl-[55px] rounded-tr-[35px] bg-[var(--primary-color)] md:rotate-[-3deg]">
                        </div>
                    </div>
                    <div class="relative z-50 bg-[var(--primary-color)] px-6 pb-7 sm:px-5 md:px-10 2xl:px-28">
                        <div class="flex justify-between w-full">
                            <div class="w-[40%]">
                                <a class="logo logo_white">

                                </a>
                                <p
                                    class="my-5 max-w-full text-base font-normal leading-7 text-[var(--light-text-color)] sm:text-sm lg:mb-6 lg:mt-9 lg:max-w-[330px] xl:max-w-[418px] xl:text-base">
                                    We are an advanced dental laboratory, specializing in providing aligning and
                                    retaining
                                    devices to suit
                                    every case
                                </p>
                                <!-- <ul>
                  <li class="mb-3.5">
                    <a href="/"
                      class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                      <span class="block w-6">
                        <i class="fa-regular fa-phone text-lg" aria-hidden="true"></i>
                      </span>
                      +961 76 803 965
                    </a>
                  </li>
                  <li class="mb-3.5">
                    <a href="/"
                      class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                      <span class="block w-6">
                        <i class="fa-regular fa-envelope text-lg" aria-hidden="true"></i>
                      </span>
                      info@orthodentlb.com
                    </a>
                  </li>
                  <li>
                    <a href="https://www.google.com/maps/place/Orthodent+lab/@33.8367096,35.5229492,689m/data=!3m2!1e3!4b1!4m15!1m8!3m7!1s0x151f1829296f9431:0x4c0c1f6ac0a0a9fa!2sHadath,+Lebanon!3b1!8m2!3d33.8504679!4d35.5278726!16s%2Fg%2F12215380!3m5!1s0x151f1900217a796d:0xb28c732b65a24393!8m2!3d33.8367052!4d35.5278201!16s%2Fg%2F11lp6169ns?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                      <span class="block w-6">
                        <i class="fa-regular fa-location-dot text-lg" aria-hidden="true"></i>
                      </span>
                      Hadath, Lebanon
                    </a>
                  </li>
                </ul> -->
                            </div>

                            <div class="w-[30%]">
                                <h5 class="mb-4 hidden text-xl font-medium text-[var(--light-text-color)] sm:block">
                                    Contact
                                    Us</h5>

                                <ul>
                                    <li class="mb-3.5">
                                        <a href="tel:+961 76 803 965"
                                            class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                                            <span class="block w-6">
                                                <i class="fa-regular fa-phone text-lg" aria-hidden="true"></i>
                                            </span>
                                            +961 76 803 965
                                        </a>
                                    </li>
                                    <li class="mb-3.5">
                                        <a href="mailto:orthodentlebanon@gmail.com"
                                            class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                                            <span class="block w-6">
                                                <i class="fa-regular fa-envelope text-lg" aria-hidden="true"></i>
                                            </span>
                                            orthodentlebanon@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.google.com/maps/place/Orthodent+lab/@33.8367096,35.5229492,689m/data=!3m2!1e3!4b1!4m15!1m8!3m7!1s0x151f1829296f9431:0x4c0c1f6ac0a0a9fa!2sHadath,+Lebanon!3b1!8m2!3d33.8504679!4d35.5278726!16s%2Fg%2F12215380!3m5!1s0x151f1900217a796d:0xb28c732b65a24393!8m2!3d33.8367052!4d35.5278201!16s%2Fg%2F11lp6169ns?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
                                            target="_blank"
                                            class="flex items-center gap-3 text-lg font-normal text-[var(--light-text-color)]">
                                            <span class="block w-6">
                                                <i class="fa-regular fa-location-dot text-lg" aria-hidden="true"></i>
                                            </span>
                                            Hadath, Lebanon
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- <div class="col-md-1 empty"></div> -->

                            <!-- <div class="col-md-4"> -->
                            <!-- <h5 class="mb-1.5 flex items-center justify-between text-[22px] font-medium text-[var(--light-text-color)] sm:mb-4 sm:text-xl">
                  Our services
                </h5>

                <ul>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">Orthodontic & Pedodontic appliances</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">OrthoApnea</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">Digital positioning ofMSE</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">Clear aligners</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">Mouthguards & Nightguards</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">PUL concept</a>
                  </li>
                  <li class="mb-2.5">
                    <a href="/services" class="block font-normal text-[var(--light-text-color)]">Digital study model</a>
                  </li>
                </ul> -->
                            <!-- </div> -->

                            <!-- <div class="mb-[22px] w-full sm:mb-0 sm:w-3/12 md:w-4/12 lg:w-[15%]">
                <h5
                  class="mb-1.5 flex items-center justify-between text-[22px] font-medium text-[var(--light-text-color)] sm:mb-4 sm:text-xl">
                  Get In Touch <a
                    href="/"
                    class="flex items-center sm:hidden"><i class="fa-regular fa-plus text-lg"
                      aria-hidden="true"></i></a></h5>
                <ul>
                  <li>
                    <a href="javascript:;" @click="scrollToDiv('contact')"
                      class="mb-2.5 block text-lg font-normal text-[var(--light-text-color)] sm:mb-4">Contact Us</a>
                  </li>
                  <li>
                    <a href="/"
                      class="mb-2.5 block text-lg font-normal text-[var(--light-text-color)] sm:mb-4">Careers</a>
                  </li>
                </ul>
              </div> -->

                            <!-- <div class="col-md-1 empty"></div> -->

                            <div class=" w-[30%]">
                                <h5 class="mb-1.5 hidden text-xl font-medium text-[var(--light-text-color)] sm:mb-4">
                                    Stay
                                    Updated</h5>
                                <p
                                    class="mb-6 hidden max-w-[418px] text-lg font-normal leading-7 text-[var(--light-text-color)] sm:mt-9 sm:text-base">
                                    Sign up to our newsletter for the latest insights on orthodontic products and care
                                    tips.
                                </p>
                                <form class="relative mb-[30px] hidden sm:mb-[50px]">
                                    <input type="email"
                                        class="h-[60px] w-full rounded-full border-0 bg-white/[7%] px-[30px] text-lg font-normal text-[var(--light-text-color)] placeholder:text-[var(--light-text-color)] focus:ring-0"
                                        placeholder="Your Email">
                                    <a href="/"
                                        class="absolute right-[5px] top-1/2 flex h-[50px] w-[130px] -translate-y-1/2 items-center justify-center rounded-full bg-[var(--primary-color)] text-lg font-medium text-[var(--primary-button-text-color)]">Subscribe</a>
                                </form>
                                <h5 class="mb-4 hidden text-xl font-medium text-[var(--light-text-color)] sm:block">
                                    Follow
                                    Us</h5>
                                <ul
                                    class="flex items-center justify-center gap-3.5 sm:justify-start sm:gap-1.5 lg:gap-[14px]">
                                    <li>
                                        <a href="http://wa.me/0096176803965"
                                            class="socialLink flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--light-text-color)] text-[var(--light-text-color)] sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]">
                                            <i class="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <!-- <li>
                    <a href=""
                      class="socialLink flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--light-text-color)] text-[var(--light-text-color)] sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]">
                      <i class="fa-brands fa-x-twitter text-lg" aria-hidden="true"></i>
                    </a>
                  </li> -->
                                    <li>
                                        <a href="https://www.instagram.com/orthodentlb/" target="_blank"
                                            class="socialLink flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--light-text-color)] text-[var(--light-text-color)] sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]">
                                            <i class="fa-brands fa-instagram text-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@orthodentlb.com"
                                            class="socialLink flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--light-text-color)] text-[var(--light-text-color)] sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]">
                                            <i class="fa-regular fa-envelope text-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <!-- <li>
                    <a href=""
                      class="socialLink flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--light-text-color)] text-[var(--light-text-color)] sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]">
                      <i class="fa-brands fa-youtube text-lg" aria-hidden="true"></i>
                    </a>
                  </li> -->
                                </ul>
                            </div>
                        </div>
                        <div class="border-[var(--light-text-color)]/[20%] mt-11 border-t pt-4 sm:mt-16 sm:pt-7">
                            <div class="flex flex-col items-center justify-center md:flex-row">
                                <p
                                    class="text-center text-base font-normal leading-7 text-[var(--light-text-color)] sm:text-left sm:text-sm lg:text-base">
                                    © 2025 Orthodentlb. All Rights Reserved.</p>
                                <ul class="hidden items-center gap-2">
                                    <li>
                                        <a href="/"
                                            class="block text-base font-normal text-[var(--light-text-color)] lg:text-lg">
                                            Privacy
                                            Policy</a>
                                    </li>
                                    <li>
                                        <span
                                            class="block text-base font-normal text-[var(--light-text-color)] lg:text-lg">
                                            |</span>
                                    </li>
                                    <li>
                                        <a href="/"
                                            class="block text-base font-normal text-[var(--light-text-color)] lg:text-lg">
                                            Terms &amp;
                                            Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

        <!-- <script src="./scripts/plugins.js"></script>
  <script src="https://cdn.tailwindcss.com/"></script>
  <script src="https://kit.fontawesome.com/8e98006f77.js" crossorigin="anonymous"></script>
  <script src="./scripts/jquery.min.js"></script>
  <script src="./scripts/owlcarousel.js"></script>
  <script>
    $(document).ready(function () {
      $('#introSlider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        loop: true
      });

      $('#servicesSlider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        loop: true,
        onInitialized: function (event) {
          window.dispatchEvent(new Event('resize'));
        }
      });
    });

    function scrollToDiv(div) {
      console.log('#' + div);
      $('html, body').animate({
        scrollTop: $('#' + div).offset().top
      }, 500);
    }
  </script> -->
    </body>
</template>
