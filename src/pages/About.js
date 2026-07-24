import './About.css';
import ValuesSection from './Values';
import CharterPresident from './CharterPresident';
import AboutSection from './AboutSectionIntro';
import BoardMemberSection from './BoardMemberSection';
import MissionVision from './MissionVision';
import History from './HIstory';
import PreviousBoardMembers from './PreviousBoardMembers';
import LogoConcept from './Logodesign';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Page Header */}
        <div className="about__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">About Us</h1>
        </div>
        
        <div className="about__content">
          <div className="about-section mb-5">
            <AboutSection />
          </div>
          
          <div className="about-section mb-5">
            <CharterPresident />
          </div>
          
          <div className="about-section mb-5">
            <MissionVision />
          </div>
          
          <div className="about-section mb-5">
            <BoardMemberSection />
          </div>

          <div className="about-section">
            <PreviousBoardMembers />
          </div>
          
          <div className="about-section mb-5">
            <LogoConcept />
          </div>
          
          <div className="about-section mb-5">
            <ValuesSection />
          </div>
          
          <div className="about-section">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;