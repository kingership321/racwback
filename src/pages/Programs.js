// import React, { useState } from 'react';
// import './Programs.css';

// // Image Imports (keeping all your original imports)
// import karuna1 from '../assets/ProjectKaruna/FB_IMG_1758446587243.jpg'
// import karuna2 from '../assets/ProjectKaruna/FB_IMG_1758446593946.jpg'
// import karuna3 from '../assets/ProjectKaruna/FB_IMG_1758446639777.jpg'
// import karuna4 from '../assets/ProjectKaruna/FB_IMG_1758446652724.jpg'

// import case1 from '../assets/ProjectCaseCrack/case1.jpg'
// import case2 from '../assets/ProjectCaseCrack/case2.jpg'
// import case3 from '../assets/ProjectCaseCrack/case3.jpg'
// import case4 from '../assets/ProjectCaseCrack/case4.jpg'
// import case5 from '../assets/ProjectCaseCrack/case5.jpg'
// import case6 from '../assets/ProjectCaseCrack/case6.jpg'
// import case7 from '../assets/ProjectCaseCrack/case7.jpg'
// import case8 from '../assets/ProjectCaseCrack/case8.jpg'

// import mov1 from '../assets/ProjectMovieDay/mov1.jpg'
// import mov2 from '../assets/ProjectMovieDay/mov2.jpg'
// import mov3 from '../assets/ProjectMovieDay/mov3.jpg'
// import mov4 from '../assets/ProjectMovieDay/mov4.jpg'

// import sam1 from '../assets/ProjectSambidhan/sam1.jpg'
// import sam2 from '../assets/ProjectSambidhan/sam2.jpg'
// import sam3 from '../assets/ProjectSambidhan/sam3.jpg'
// import sam4 from '../assets/ProjectSambidhan/sam4.jpg'

// import gen1 from '../assets/ProjectGenZ/gen1.jpg'
// import gen2 from '../assets/ProjectGenZ/gen2.jpg'
// import gen3 from '../assets/ProjectGenZ/gen3.jpg'
// import gen4 from '../assets/ProjectGenZ/gen4.jpg'

// import pc1 from '../assets/ProjectPhotocontest/pc1.jpg'
// import pc2 from '../assets/ProjectPhotocontest/pc2.jpg'
// import pc3 from '../assets/ProjectPhotocontest/pc3.jpg'
// import pc4 from '../assets/ProjectPhotocontest/pc4.jpg'
// import pc5 from '../assets/ProjectPhotocontest/pc5.jpg'
// import pc6 from '../assets/ProjectPhotocontest/pc6.jpg'
// import pc7 from '../assets/ProjectPhotocontest/pc7.jpg'
// import pc8 from '../assets/ProjectPhotocontest/pc8.jpg'

// import hik1 from '../assets/ProjectHike/hik1.jpg'
// import hik2 from '../assets/ProjectHike/hik2.jpg'
// import hik3 from '../assets/ProjectHike/hik3.jpg'
// import hik4 from '../assets/ProjectHike/hik4.jpg'
// import hik5 from '../assets/ProjectHike/hik5.jpg'

// import chart1 from '../assets/ProjectCharter/chart1.jpg'
// import chart2 from '../assets/ProjectCharter/chart2.jpg'
// import chart3 from '../assets/ProjectCharter/chart3.jpg'
// import chart4 from '../assets/ProjectCharter/chart4.jpg'
// import chart5 from '../assets/ProjectCharter/chart5.jpg'
// import chart6 from '../assets/ProjectCharter/chart6.jpg'
// import chart7 from '../assets/ProjectCharter/chart7.jpg'
// import chart8 from '../assets/ProjectCharter/chart8.jpg'
// import chart9 from '../assets/ProjectCharter/chart9.jpg'
// import chart10 from '../assets/ProjectCharter/chart10.jpg'
// import chart11 from '../assets/ProjectCharter/chart11.jpg'
// import chart12 from '../assets/ProjectCharter/chart12.jpg'
// import chart13 from '../assets/ProjectCharter/chart13.jpg'
// import chart14 from '../assets/ProjectCharter/chart14.jpg'
// import chart15 from '../assets/ProjectCharter/chart15.jpg'

// import tree1 from '../assets/ProjectTreePlantation/tree1.jpg'
// import tree2 from '../assets/ProjectTreePlantation/tree2.jpg'
// import tree3 from '../assets/ProjectTreePlantation/tree3.jpg'
// import tree4 from '../assets/ProjectTreePlantation/tree4.jpg'
// import tree5 from '../assets/ProjectTreePlantation/tree5.jpg'

// import blod1 from '../assets/ProjectBlood/blod1.jpg'
// import blod2 from '../assets/ProjectBlood/blod2.jpg'
// import blod3 from '../assets/ProjectBlood/blod3.jpg'
// import blod4 from '../assets/ProjectBlood/blod4.jpg'
// import blod5 from '../assets/ProjectBlood/blod5.jpg'

// import anr1 from '../assets/ProjectAcademicandResearch/anr1.jpg'
// import anr2 from '../assets/ProjectAcademicandResearch/anr2.jpg'
// import anr3 from '../assets/ProjectAcademicandResearch/anr3.jpg'
// import anr4 from '../assets/ProjectAcademicandResearch/anr4.jpg'
// import anr5 from '../assets/ProjectAcademicandResearch/anr5.jpg'

// import ati1 from '../assets/ProjectAtithi/ati1.jpg'
// import ati4 from '../assets/ProjectAtithi/ati4.jpg'
// import ati3 from '../assets/ProjectAtithi/ati3.jpg'

// import ekata1 from '../assets/ProjectEkata/ekata1.jpg'
// import ekata2 from '../assets/ProjectEkata/ekata2.jpg'
// import ekata3 from '../assets/ProjectEkata/ekata3.jpg'
// import ekata4 from '../assets/ProjectEkata/ekata4.jpg'
// import ekata5 from '../assets/ProjectEkata/ekata5.jpg'

// import film1 from '../assets/Projectfilmora/film1.jpg'
// import film2 from '../assets/Projectfilmora/film2.jpg'
// import film3 from '../assets/Projectfilmora/film3.jpg'
// import film4 from '../assets/Projectfilmora/film4.jpg'
// import film5 from '../assets/Projectfilmora/film5.jpg'

// import sacblo1 from '../assets/ProjectSachinBlood/sacblo1.jpg'
// import sacblo2 from '../assets/ProjectSachinBlood/sacblo2.jpg'
// import sacblo3 from '../assets/ProjectSachinBlood/sacblo3.jpg'
// import sacblo4 from '../assets/ProjectSachinBlood/sacblo4.jpg'
// import sacblo5 from '../assets/ProjectSachinBlood/sacblo5.jpg'

// import santa1 from '../assets/ProjectSanta/santa1.jpg'
// import santa2 from '../assets/ProjectSanta/santa2.jpg'
// import santa3 from '../assets/ProjectSanta/santa3.jpg'
// import santa4 from '../assets/ProjectSanta/santa4.jpg'
// import santa5 from '../assets/ProjectSanta/santa5.jpg'

// import site1 from '../assets/ProjectSite/site1.jpg'
// import site2 from '../assets/ProjectSite/site2.jpg'

// const Programs = () => {
//   const [activeProgram, setActiveProgram] = useState(0);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const programs = [
//     {
//       id: 1,
//       title: "करुणा - Compassion in Action",
//       date: "September 19, 2025",
//       place: "Center for Rehabilitation of the Disabled Nepal, Gokarneshwor-4, KTM",
//       coorganizer: "",
//       images: [karuna1, karuna2, karuna3, karuna4]
//     },
//     {
//       id: 2,
//       title: "CASE CRACK TU: Strategize, Solve, Succeed",
//       date: "July 1, 2025",
//       place: "TU Central Library, Kirtipur",
//       images: [case1, case2, case3, case4, case5, case6, case7, case8]
//     },
//     {
//       id: 3,
//       title: "Movie Day: Screening for a Cause",
//       date: "September 6, 2025",
//       place: "CDCDP, TU",
//       images: [mov1, mov2, mov3, mov4]
//     },
//     {
//       id: 4,
//       title: "वैधानिक श्रृङ्खला - Unfolding the Constitution: Right, Role & Governance",
//       date: "September 19, 2025",
//       place: "Google Meet",
//       images: [sam1, sam2, sam3, sam4]
//     },
//     {
//       id: 5,
//       title: "Honoring the Martyrs of the Gen Z Protest",
//       date: "September 14, 2025",
//       place: "Near NBL counter, TU, Kirtipur",
//       images: [gen1, gen2, gen3, gen4]
//     },
//     {
//       id: 6,
//       title: "Stories Through Photo",
//       date: "August 15, 2025",
//       place: "Online Event",
//       images: [pc1, pc2, pc3, pc4, pc5, pc6, pc7, pc8]
//     },
//     {
//       id: 7,
//       title: "Fellowship Hiking & Cleaning Campaign",
//       date: "September 6, 2025",
//       place: "CDCDP, TU",
//       images: [hik1, hik2, hik3, hik4, hik5]
//     },
//     {
//       id: 8,
//       title: "3rd Installation Ceremony",
//       date: "July 19, 2025",
//       place: "CDCDP, TU",
//       images: [chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9, chart10, chart11, chart12, chart13, chart14, chart15]
//     },
//     {
//       id: 9,
//       title: "Rotary Tree Plantation Programme",
//       date: "July 26, 2025",
//       place: "CEDA courtyard, TU",
//       images: [tree1, tree2, tree3, tree4, tree5]
//     },
//     {
//       id: 10,
//       title: "Blood Donation Program",
//       date: "July 26, 2025",
//       place: "Chakhu Bakhu Park, New Baneshwor",
//       images: [blod1, blod2, blod3, blod4, blod5]
//     },
//     {
//       id: 11,
//       title: "Academic & Research Essentials – Season 2",
//       date: " November 27 to December 5, 2025",
//       place: "School of Management, Tribhuvan University, Kirtipur",
//       images: [anr1, anr2, anr3, anr4, anr5]
//     },
//     {
//       id: 12,
//       title: "एकता | Bridging friendships across borders",
//       date: "24th November, 2025",
//       place: "Central Department of Management, TU",
//       images: [ekata1, ekata2, ekata3, ekata4, ekata5]
//     },
//     {
//       id: 13,
//       title: "अतिथि देवो भव:",
//       date: "",
//       place: "Kathmandu, Nepal",
//       images: [ati1, ati3, ati4]
//     },
//     {
//       id: 14,
//       title: "The 12th Late Rtr. Sachin Memorial Nationwide Blood Donation Drive",
//       date: "",
//       place: "",
//       images: [sacblo1, sacblo2, sacblo3, sacblo4, sacblo5]
//     },
//     {
//       id: 15,
//       title: "Filmora Video Editing Training",
//       date: "9 December 2025",
//       place: "School of Management, Tribhuvan University",
//       images: [film1, film2, film3, film4, film5]
//     },
//     {
//       id: 16,
//       title: "We are officially LIVE! Website launching",
//       date: "",
//       place: "School of Management, Tribhuvan University",
//       images: [site1, site2]
//     },
//     {
//       id: 17,
//       title: "Secret Santa & New Year Greetings",
//       date: "December, 2025",
//       place: "School of Management, Tribhuvan University",
//       images: [santa1, santa2, santa3, santa4, santa5]
//     },
//   ];

//   const nextProgram = () => {
//     setActiveProgram((prev) => (prev + 1) % programs.length);
//     setActiveImageIndex(0);
//   };

//   const prevProgram = () => {
//     setActiveProgram((prev) => (prev - 1 + programs.length) % programs.length);
//     setActiveImageIndex(0);
//   };

//   const nextImage = () => {
//     setActiveImageIndex((prev) => (prev + 1) % programs[activeProgram].images.length);
//   };

//   const prevImage = () => {
//     setActiveImageIndex((prev) => (prev - 1 + programs[activeProgram].images.length) % programs[activeProgram].images.length);
//   };

//   return (
//     <div className="programs-page">
//       <div className="container">
        
//         {/* Page Header */}
//         <div className="programs-page__header text-center mb-5">
//           <h1 className="heading-1 heading-underline heading-center">Our Programs</h1>
//         </div>

//         {/* Programs Intro */}
//         <section className="programs-page__intro text-center mb-5">
//           <p className="lead text-gray max-w-3xl mx-auto">
//             The Rotaract Club of Tribhuvan University organizes impactful programs and activities 
//             focused on community service, leadership development, and fellowship. Explore our recent initiatives below.
//           </p>
//         </section>

//         {/* Programs Carousel */}
//         <div className="programs-carousel card card-lg">
//           <div className="programs-carousel__navigation">
//             <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={prevProgram}>
//               <i className="fas fa-chevron-left"></i>
//             </button>
            
//             <div className="programs-carousel__indicators">
//               {programs.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`programs-carousel__indicator ${index === activeProgram ? 'programs-carousel__indicator--active' : ''}`}
//                   onClick={() => {
//                     setActiveProgram(index);
//                     setActiveImageIndex(0);
//                   }}
//                 />
//               ))}
//             </div>
            
//             <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={nextProgram}>
//               <i className="fas fa-chevron-right"></i>
//             </button>
//           </div>

//           <div className="programs-carousel__content grid grid-2">
//             <div className="programs-carousel__info">
//               <h2 className="programs-carousel__title heading-3">{programs[activeProgram].title}</h2>
//               <div className="programs-carousel__details">
//                 <div className="programs-carousel__detail-item">
//                   <i className="fas fa-calendar-alt"></i>
//                   <span className="body-large">{programs[activeProgram].date}</span>
//                 </div>
//                 <div className="programs-carousel__detail-item">
//                   <i className="fas fa-map-marker-alt"></i>
//                   <span className="body-large">{programs[activeProgram].place}</span>
//                 </div>
//                 {programs[activeProgram].coorganizer && (
//                   <div className="programs-carousel__detail-item">
//                     <i className="fas fa-handshake"></i>
//                     <span className="body-large">Co-organized with: {programs[activeProgram].coorganizer}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Image Gallery */}
//             <div className="programs-carousel__gallery">
//               <div className="programs-carousel__gallery-main">
//                 <button className="programs-carousel__gallery-nav-btn btn-xl" onClick={prevImage}>
//                   <i className="fas fa-chevron-left"></i>
//                 </button>
//                 <img 
//                   src={programs[activeProgram].images[activeImageIndex]} 
//                   alt={`${programs[activeProgram].title} - Image ${activeImageIndex + 1}`}
//                   className="programs-carousel__gallery-image img-responsive img-rounded"
//                 />
//                 <button className="programs-carousel__gallery-nav-btn btn-lg" onClick={nextImage}>
//                   <i className="fas fa-chevron-right"></i>
//                 </button>
//               </div>
//               <div className="programs-carousel__gallery-thumbnails">
//                 {programs[activeProgram].images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className={`programs-carousel__thumbnail img-responsive img-rounded ${index === activeImageIndex ? 'programs-carousel__thumbnail--active' : ''}`}
//                     onClick={() => setActiveImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Upcoming Programs Section */}
//         <section className="upcoming-programs mt-5">
//           <div className="upcoming-programs__header text-center mb-5">
//             <h2 className="heading-2 heading-underline heading-center">Upcoming Programs</h2>
//           </div>
//           <div className="upcoming-programs__list grid grid-3">
//             <div className="upcoming-programs__item card-lg">
//               <h3 className="upcoming-programs__item-title heading-5">CEDA Hall Awareness Video</h3>
//               <p className="upcoming-programs__item-description body-small">
//                 A short video initiative to raise awareness about the facilities and use of CEDA Hall.
//               </p>
//             </div>
//             <div className="upcoming-programs__item card-lg">
//               <h3 className="upcoming-programs__item-title heading-5">Departmental Informational Video</h3>
//               <p className="upcoming-programs__item-description body-small">
//                 An ongoing informational video project designed to highlight and introduce different departments of Tribhuvan University.
//               </p>
//             </div>
//             <div className="upcoming-programs__item card-lg">
//               <h3 className="upcoming-programs__item-title heading-5">Wardrobe for Warmth | Make an Impact This New Year</h3>
//               <p className="upcoming-programs__item-description body-small">
//                 An ongoing project aimed at collecting and distributing warm clothing to those in need during the winter season.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Programs;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [upcomingPrograms, setUpcomingPrograms] = useState([]);
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, upcomingRes] = await Promise.all([
          api.get('/programs'),
          api.get('/upcoming-programs'),
        ]);
        setPrograms(programsRes.data);
        setUpcomingPrograms(upcomingRes.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading programs...</div>;

  if (!programs.length) return <div className="container" style={{ padding: '2rem' }}>No programs found.</div>;

  const currentProgram = programs[activeProgram];
  // Display only first 5 images in the Programs page
  const images = (currentProgram.images || []).slice(0, 5);

  const nextProgram = () => {
    setActiveProgram((prev) => (prev + 1) % programs.length);
    setActiveImageIndex(0);
  };

  const prevProgram = () => {
    setActiveProgram((prev) => (prev - 1 + programs.length) % programs.length);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="programs-page">
      <div className="container">
        <div className="programs-page__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">Our Programs</h1>
        </div>

        <section className="programs-page__intro text-center mb-5">
          <p className="lead text-gray max-w-3xl mx-auto">
            The Rotaract Club of Tribhuvan University organizes impactful programs and activities
            focused on community service, leadership development, and fellowship. Explore our recent initiatives below.
          </p>
        </section>

        <div className="programs-carousel card card-lg">
          <div className="programs-carousel__navigation">
            <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={prevProgram}>
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="programs-carousel__indicators">
              {programs.map((_, index) => (
                <button
                  key={index}
                  className={`programs-carousel__indicator ${index === activeProgram ? 'programs-carousel__indicator--active' : ''}`}
                  onClick={() => { setActiveProgram(index); setActiveImageIndex(0); }}
                />
              ))}
            </div>

            <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={nextProgram}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="programs-carousel__content grid grid-2">
            <div className="programs-carousel__info">
              <h2 className="programs-carousel__title heading-3">{currentProgram.title}</h2>
              <div className="programs-carousel__details">
                <div className="programs-carousel__detail-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span className="body-large">{currentProgram.date}</span>
                </div>
                <div className="programs-carousel__detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="body-large">{currentProgram.place}</span>
                </div>
                {currentProgram.coorganizer && (
                  <div className="programs-carousel__detail-item">
                    <i className="fas fa-handshake"></i>
                    <span className="body-large">Co-organized with: {currentProgram.coorganizer}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="programs-carousel__gallery">
              {images.length > 0 ? (
                <>
                  <div className="programs-carousel__gallery-main">
                    <button className="programs-carousel__gallery-nav-btn btn-xl" onClick={prevImage}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <img
                      src={images[activeImageIndex].image_url}
                      alt={`${currentProgram.title} - Image ${activeImageIndex + 1}`}
                      className="programs-carousel__gallery-image img-responsive img-rounded"
                    />
                    <button className="programs-carousel__gallery-nav-btn btn-lg" onClick={nextImage}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="programs-carousel__gallery-thumbnails">
                    {images.map((image, index) => (
                      <img
                        key={image.id}
                        src={image.image_url}
                        alt={`Thumbnail ${index + 1}`}
                        className={`programs-carousel__thumbnail img-responsive img-rounded ${index === activeImageIndex ? 'programs-carousel__thumbnail--active' : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="programs-carousel__gallery-main">
                  <p>No images for this program.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note about limited images and link to gallery */}
        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
          <p className="body-large" style={{ color: 'var(--dark-gray)', marginBottom: '1rem' }}>
            ⭐ Only the first 5 images are shown here. View all program photos in our gallery.
          </p>
          <Link to="/gallery" className="btn btn-primary">
            View Complete Gallery
          </Link>
        </div>

        {/* Upcoming Programs section - fetched from API */}
        <section className="upcoming-programs mt-5">
          <div className="upcoming-programs__header text-center mb-5">
            <h2 className="heading-2 heading-underline heading-center">Upcoming Programs</h2>
          </div>
          {upcomingPrograms.length > 0 ? (
            <div className="upcoming-programs__list grid grid-3">
              {upcomingPrograms.map(program => (
                <div key={program.id} className="upcoming-programs__item card-lg">
                  <h3 className="upcoming-programs__item-title heading-5">{program.title}</h3>
                  <p className="upcoming-programs__item-description body-small">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
              <p className="body-large">No upcoming programs at this time.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Programs;