import './History.css';

const HistorySection = () => {
  return (        
    <section className="history-section">
      <div className="container">
        <div className="faq-section__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">
            FAQs
          </h2>
        </div>
        
        {/* What is Rotaract Section */}
        <div className="history-section__content-block card card-lg">
          <h2 className="history-section__title heading-3">What is Rotaract?</h2>
          <div className="history-section__content">
            <p className="history-section__paragraph body-large">
              Rotaract is a Rotary-sponsored service club for young men and women aged 18 and above. Rotaract clubs can be either community-based or university-based and are always sponsored by a local Rotary club. This sponsorship makes them true "partners in service" and vital members of the Rotary family.
            </p>
            <p className="history-section__paragraph body-large">
              As one of Rotary's most dynamic and fastest-growing programs, Rotaract has expanded into a global movement with more than 8,400 clubs across 170 countries and regions. In Nepal alone, there are 208 active clubs, contributing to this worldwide network of service, leadership, and fellowship.
            </p>
          </div>
          <h2 className="history-section__title heading-3">Is Rotary and Rotaract the same?</h2>
          <div className="history-section__content">
            <p className="history-section__paragraph body-large">
              No, but they are closely connected. Rotary and Rotaract share the same values and vision of service, fellowship, and leadership. Rotary is the parent organization, while Rotaract is a global program under Rotary for young leaders to develop skills and create impact in their communities. Both work together to bring sustainable change locally and globally.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;