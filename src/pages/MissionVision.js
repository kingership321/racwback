import './MissionVision.css';

const MissionVision = () => {
  return (
    <section className="mission-vision">
      <div className="container">
        
        {/* Mission Section */}
        <div className="mission-vision__card mission-vision__card--mission card card-lg">
          <div className="mission-vision__icon">🎯</div>
          <h3 className="mission-vision__title heading-3 text-center">Our Mission</h3>
          <div className="mission-vision__content">
            <p className="mission-vision__text body-large text-center">
              "To empower students through fellowship, leadership development, and impactful community service, while fostering sustainable growth and meaningful collaborations locally and globally."
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mission-vision__card mission-vision__card--vision card card-lg">
          <div className="mission-vision__icon">🔭</div>
          <h3 className="mission-vision__title heading-3 text-center">Our Vision</h3>
          <div className="mission-vision__content">
            <p className="mission-vision__text body-large text-center">
              "To be a dynamic service University based organization, dedicated to professional development while fostering fellowship. We aim to integrate Rotaract principles, uplifting our members through impactful initiatives."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;