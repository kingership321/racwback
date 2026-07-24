import './AboutSectionIntro.css';
import raclogo from '../assets/raclogo.png';

const AboutSectionIntro = () => {
  return (
    <section className="about-section-intro">
      <div className="container">
        <div className="about-section-intro__content card card-lg">
          
          {/* Logo Section */}
          <div className="about-section-intro__logo">
            <img 
              src={raclogo} 
              alt="Rotaract Club of Tribhuvan University Logo" 
              className="about-section-intro__logo-image img-responsive"
            />
          </div>

          {/* Title */}
          <h2 className="about-section-intro__title heading-3 text-center">
            Rotaract Club of Tribhuvan University
          </h2>

          {/* Content Sections */}
          <div className="about-section-intro__text">
            <p className="about-section-intro__paragraph body-large">
              Chartered on 29 August 2023 under the leadership of Charter President Rtr. Bibek Bhattrai, the Rotaract Club of Tribhuvan University is a non-political, university-based service club sponsored by the Rotary Club of Kirtipur. Established at the Central Campus, Kirtipur, the club unites young minds driven by the spirit of <em>"Service Above Self"</em>.
            </p>
            
            <p className="about-section-intro__paragraph body-large">
              The club's vision, as outlined by the Charter President, Rtr. Bibek Bhattarai is <em>"to be a dynamic university-based service organization, dedicated to professional development while fostering fellowship, and uplifting members through impactful initiatives"</em>. This vision continues to guide the club in every step, inspiring members to grow as leaders and responsible citizens.
            </p>
            
            <p className="about-section-intro__paragraph body-large">
              Since its inception, the club has been an active and impactful part of campus life, engaging students through social initiatives, training programs, and community projects. It strives to enhance both academic and soft skills, create opportunities for global networking, and contribute towards building a better society while aligning with the global Rotary movement.
            </p>
          </div>

          {/* Stats Section */}
          <div className="about-section-intro__stats grid grid-3">
            <div className="about-section-intro__stat">
              <h3 className="about-section-intro__stat-number">40+</h3>
              <p className="about-section-intro__stat-label body-large font-semibold">Members</p>
            </div>
            <div className="about-section-intro__stat">
              <h3 className="about-section-intro__stat-number">150+</h3>
              <p className="about-section-intro__stat-label body-large font-semibold">Projects</p>
            </div>
            <div className="about-section-intro__stat">
              <h3 className="about-section-intro__stat-number">2+</h3>
              <p className="about-section-intro__stat-label body-large font-semibold">Years of Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionIntro;