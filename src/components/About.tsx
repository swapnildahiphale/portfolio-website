import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <ul className="about-list">
          <li><span className="about-label">Now</span> — Staff SRE at VMO India, voice AI & agentic systems</li>
          <li><span className="about-label">Built</span> — OpenSRE.in, autonomous AI incident investigation (open source)</li>
          <li><span className="about-label">Before</span> — MPL (India's largest mobile gaming platform, 100M+ users)</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
