// import React, { useState } from 'react';
// import './ImageGallery.css';

// // Image Imports (keeping all your original imports)
// import case1 from '../assets/ProjectCaseCrack/case1.jpg'
// import case2 from '../assets/ProjectCaseCrack/case2.jpg'
// import case3 from '../assets/ProjectCaseCrack/case3.jpg'
// import case4 from '../assets/ProjectCaseCrack/case4.jpg'
// import case5 from '../assets/ProjectCaseCrack/case5.jpg'
// import case6 from '../assets/ProjectCaseCrack/case6.jpg'
// import case7 from '../assets/ProjectCaseCrack/case7.jpg'
// import case8 from '../assets/ProjectCaseCrack/case8.jpg'

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

// const ImageGallery = () => {
//   const [selectedFolder, setSelectedFolder] = useState(null);
  
//   const programs = [
//     {
//       id: 1,
//       name: "Blood Donation Camp",
//       images: [blod1, blod2, blod3, blod4, blod5]
//     },
//     {
//       id: 2,
//       name: "Fellowship Hiking and Cleanliness Program",
//       images: [hik1, hik2, hik3, hik4, hik5]
//     },
//     {
//       id: 3,
//       name: "Tree Plantation",
//       images: [tree1, tree2, tree3, tree4, tree5]
//     },
//     {
//       id: 4,
//       name: "3rd Installation Ceremony",
//       images: [chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9, chart10, chart11, chart12, chart13, chart14, chart15]
//     },
//     {
//       id: 5,
//       name: "Photography Contest",
//       images: [pc1, pc2, pc3, pc4, pc5, pc6, pc7, pc8]
//     },
//     {
//       id: 6,
//       name: "Case Study Workshop",
//       images: [case1, case2, case3, case4, case5, case6, case7, case8]
//     },
//     {
//       id: 7,
//       name: "Academic & Research Essentials – Season 2",
//       images: [anr1, anr2, anr3, anr4, anr5]
//     },
//     {
//       id: 8,
//       name: "Atithi – Welcoming the Guests",
//       images: [ati1, ati4, ati3]
//     },
//     {
//       id: 9,
//       name: "Ekata – Celebrating Unity",
//       images: [ekata1, ekata2, ekata3, ekata4, ekata5]
//     },
//     {
//       id: 10,
//       name: "Filmora Workshop",
//       images: [film1, film2, film3, film4, film5]
//     },
//     {
//       id: 11,
//       name: "Sachin Blood Donation Camp",
//       images: [sacblo1, sacblo2, sacblo3, sacblo4, sacblo5]
//     },
//     {
//       id: 12,
//       name: "Secret Santa & New Year Greetings",
//       images: [santa1, santa2, santa3, santa4, santa5]
//     },
//     {
//       id: 13,
//       name: "Website Launching",
//       images: [site1, site2]
//     }
//   ];

//   const handleFolderClick = (program) => {
//     setSelectedFolder(program);
//   };

//   const handleBackClick = () => {
//     setSelectedFolder(null);
//   };

//   return (
//     <section className="image-gallery">
//       <div className="container">
        
//         {/* Page Header */}
//         <div className="image-gallery__header text-center mb-5">
//           <h1 className="heading-1 heading-underline heading-center">Our Programs Gallery</h1>
//         </div>

//         {!selectedFolder ? (
//           /* Folders View */
//           <div className="image-gallery__folders">
//             <div className="image-gallery__folders-grid grid grid-3">
//               {programs.map(program => (
//                 <div 
//                   key={program.id} 
//                   className="image-gallery__folder-item card"
//                   onClick={() => handleFolderClick(program)}
//                 >
//                   <div className="image-gallery__folder-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                       <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
//                     </svg>
//                   </div>
//                   <h3 className="image-gallery__folder-name heading-5">{program.name}</h3>
//                   <span className="image-gallery__folder-count body-small">{program.images.length} images</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           /* Images View */
//           <div className="image-gallery__images">
//             <button className="image-gallery__back-button btn btn-secondary mb-4" onClick={handleBackClick}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//                 <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
//               </svg>
//               Back to Programs
//             </button>
            
//             <div className="image-gallery__images-header text-center mb-5">
//               <h2 className="heading-2 heading-center">{selectedFolder.name} - Event Photos</h2>
//             </div>
            
//             <div className="image-gallery__images-grid grid grid-4">
//               {selectedFolder.images.map((image, index) => (
//                 <div key={index} className="image-gallery__image-item card">
//                   <img 
//                     src={image} 
//                     alt={`${selectedFolder.name} ${index + 1}`}
//                     className="image-gallery__image img-responsive img-rounded img-hover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ImageGallery.css';

const ImageGallery = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/programs');
        setPrograms(res.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading gallery...</div>;

  if (!programs.length) return <div className="container" style={{ padding: '2rem' }}>No programs found.</div>;

  const handleFolderClick = (program) => {
    setSelectedProgram(program);
  };

  const handleBackClick = () => {
    setSelectedProgram(null);
  };

  return (
    <section className="image-gallery">
      <div className="container">
        <div className="image-gallery__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">Our Programs Gallery</h1>
        </div>

        {!selectedProgram ? (
          // Folders View
          <div className="image-gallery__folders">
            <div className="image-gallery__folders-grid grid grid-3">
              {programs.map(program => (
                <div
                  key={program.id}
                  className="image-gallery__folder-item card"
                  onClick={() => handleFolderClick(program)}
                >
                  <div className="image-gallery__folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
                    </svg>
                  </div>
                  <h3 className="image-gallery__folder-name heading-5">{program.title}</h3>
                  <span className="image-gallery__folder-count body-small">{program.images ? program.images.length : 0} images</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Images View
          <div className="image-gallery__images">
            <button className="image-gallery__back-button btn btn-secondary mb-4" onClick={handleBackClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
              </svg>
              Back to Programs
            </button>

            <div className="image-gallery__images-header text-center mb-5">
              <h2 className="heading-2 heading-center">{selectedProgram.title} - Event Photos</h2>
            </div>

            <div className="image-gallery__images-grid grid grid-4">
              {selectedProgram.images && selectedProgram.images.map((image, index) => (
                <div key={image.id} className="image-gallery__image-item card">
                  <img
                    src={image.image_url}
                    alt={`${selectedProgram.title} ${index + 1}`}
                    className="image-gallery__image img-responsive img-rounded img-hover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;