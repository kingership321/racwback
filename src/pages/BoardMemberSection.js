// import './BoardMemberSection.css';

// /* Image Import Section */
// import image16 from '../assets/mee.jpg';
// import image2 from '../assets/dipa.jpg';
// import image6 from '../assets/junu.jpg';
// import image18 from '../assets/jiban.jpg';
// import image9 from '../assets/sophia.jpg';
// import image10 from '../assets/amrit.jpg';
// import image11 from '../assets/neha.jpg';
// import image13 from '../assets/ankita.jpg';
// import image14 from '../assets/nabin.jpg';
// import image1 from '../assets/dipak.jpg';
// import image21 from '../assets/dipesh.jpg';
// import image4 from '../assets/indra.jpg';
// import image5 from '../assets/prati.jpeg';
// import image7 from '../assets/ritu.jpg';
// import image12 from '../assets/rajbir.jpg';
// import image3 from '../assets/karishma.jpg';
// import image8 from '../assets/bulbul.jpg';
// import image15 from '../assets/shree.jpg';

// const BoardMemberSection = () => {
//   const boardMembers = [
//     {
//       id: 1,
//       name: "Rtr. Dipak Dhakal",
//       position: "President",
//       image: image1,
//       facebook: "https://www.facebook.com/deepak.dhakal.180",
//       linkedin: "https://www.linkedin.com/in/dipak-dhakal-049813376/",
//       email: "rajan.shrestha@example.com"
//     },
//     {
//       id: 2,
//       name: "Rtr. Deepa Acharya",
//       position: "Immediate Past President",
//       image: image2,
//       facebook: "https://www.facebook.com/deepak.dhakal.180",
//       linkedin: "https://www.linkedin.com/in/dipak-dhakal-049813376/",
//       email: "acharyadeepa55@gmail.com"
//     },
//     {
//       id: 21,
//       name: "Rtr. Dipesh Rai",
//       position: "Vice President & President Elect",
//       image: image21,
//       facebook: "https://www.facebook.com/rai1dipesh",
//       linkedin: "https://www.linkedin.com/in/dipak-dhakal-049813376/",
//       email: "Dipesh10312@gmail.com"
//     },
//     {
//       id: 3,
//       name: "Rtr. Karishma Dhami",
//       position: "Secretary",
//       image: image3,
//       facebook: "https://www.facebook.com/kareeshma0",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "kreeshmadhami@gmail.com"
//     },
//     {
//       id: 4,
//       name: "Rtr. Indra Maya Limbu",
//       position: "Treasurer",
//       image: image4,
//       facebook: "https://www.facebook.com/sital.limbu.566",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "rajan.shrestha@example.com"
//     },
//     {
//       id: 5,
//       name: "Rtr. Pratiksha Bhattarai",
//       position: "Joint Secretary & Secretary Elect",
//       image: image5,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "pratikshya.2600@gmail.com"
//     },
//     {
//       id: 6,
//       name: "Rtr. Junu Dhakal",
//       position: "Joint Treasurer & Treasurer Elect",
//       image: image6,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "rajan.shrestha@example.com"
//     },
//     {
//       id: 7,
//       name: "Rtr. Ritu Chauhan",
//       position: "Club Administration Chair",
//       image: image7,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "seasonchn97@gmail.com"
//     },
//     {
//       id: 8,
//       name: "Rtr. Bulbul Shrestha",
//       position: "Joint Club Administration Chair",
//       image: image8,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "bulbulshrestha1@gmail.com"
//     },
//     {
//       id: 9,
//       name: "Rtr. Sophia Bista",
//       position: "Service Project Chair",
//       image: image9,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "sophiabista3@gmail.com"
//     },
//     {
//       id: 10,
//       name: "Rtr. Amrit Thapa",
//       position: "Joint Service Project Chair",
//       image: image10,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "amritthapa5546@gmail.com"
//     },
//     {
//       id: 11,
//       name: "Rtr. Neha Regmi",
//       position: "Professional Development Chair",
//       image: image11,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "neharegmi28@gmail.com"
//     },
//     {
//       id: 12,
//       name: "Rtr. Rajbir Budhathoki",
//       position: "Joint Professional Development Chair",
//       image: image12,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "rajbudhathoki09@gmail.com"
//     },
//     {
//       id: 13,
//       name: "Rtr. Ankita Thakur",
//       position: "International Service Chair",
//       image: image13,
//       facebook: "https://www.facebook.com/sital.limbu.566",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "thakurankita738@gmail.com"
//     },
//     {
//       id: 14,
//       name: "Rtr. Nabin Regmi",
//       position: "Joint International Service Chair",
//       image: image14,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "nabinspg@gmail.com"
//     },
//     {
//       id: 15,
//       name: "Rtr. Shreepriya Ghimire",
//       position: "Membership Chair",
//       image: image15,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "shreepriyaghimire1123@gmail.com"
//     },
//     {
//       id: 16,
//       name: "Rtr. Keshav Baniya",
//       position: "IT Officer",
//       image: image16,
//       facebook: "https://www.facebook.com/keshav.baniya/",
//       linkedin: "https://www.linkedin.com/in/keshavbaniya/",
//       email: "kingership321@gmail.com"
//     },
//     {
//       id: 17,
//       name: "Rtr. Jivan Shah",
//       position: "Seargent at Arms",
//       image: image18,
//       facebook: "https://facebook.com/rajan.shrestha",
//       linkedin: "https://linkedin.com/in/rajan-shrestha",
//       email: "shahsachin554@gmail.com"
//     }
//   ];

//   return (
//     <section className="board-members">
//       <div className="container">
//         <div className="board-members__header text-center mb-5">
//           <h2 className="heading-2 heading-underline heading-center">Our Board Members</h2>
//           <p className="lead text-gray">
//             Meet the dedicated team leading our club towards positive change
//           </p>
//         </div>
        
//         <div className="board-members__grid grid grid-4">
//           {boardMembers.map(member => (
//             <div key={member.id} className="board-member-card card">
//               <div className="board-member-card__image">
//                 <img 
//                   src={member.image} 
//                   alt={member.name}
//                   className="board-member-card__photo img-responsive img-circle"
//                 />
//                 <div className="board-member-card__overlay">
//                   <div className="board-member-card__social-links">
//                     {/* <a 
//                       href={member.facebook} 
//                       target="_blank" 
//                       rel="noopener noreferrer" 
//                       aria-label="Facebook"
//                       className="board-member-card__social-link"
//                     >
//                       <i className="fab fa-facebook-f"></i>
//                     </a>
//                     <a 
//                       href={member.linkedin} 
//                       target="_blank" 
//                       rel="noopener noreferrer" 
//                       aria-label="LinkedIn"
//                       className="board-member-card__social-link"
//                     >
//                       <i className="fab fa-linkedin-in"></i>
//                     </a> */}
//                     <a 
//                       href={`mailto:${member.email}`} 
//                       aria-label="Email"
//                       className="board-member-card__social-link"
//                     >
//                       <i className="fas fa-envelope"></i>
//                     </a>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="board-member-card__info text-center">
//                 <h3 className="board-member-card__name heading-5">{member.name}</h3>
//                 <p className="board-member-card__position body-small">{member.position}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BoardMemberSection;




import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './BoardMemberSection.css';

// ... image imports removed (we'll use URLs from API)

const BoardMemberSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get('/board');
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching board members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div>Loading board members...</div>;

  return (
    <section className="board-members">
      {/* header and grid same as before, but map over members */}
      <div className="board-members__grid">
        {members.map(member => (
          <div key={member.id} className="board-member-card card">
            <div className="board-member-card__image">
              <img 
                src={member.image_url} 
                alt={member.name}
                className="board-member-card__photo img-responsive img-circle"
              />
              {/* overlay and social links as before, using member.facebook_url, etc. */}
            </div>
            <div className="board-member-card__info text-center">
              <h3 className="board-member-card__name heading-5">{member.name}</h3>
              <p className="board-member-card__position body-small">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardMemberSection;