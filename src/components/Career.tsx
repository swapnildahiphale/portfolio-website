import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Staff SRE</h4>
                <h5>VMO India Private Limited</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <ul>
              <li>Led Call-AI acquisition, containerized services with bespoke CI/CD</li>
              <li>Architected dynamic environment provisioning for Health Exchange SaaS</li>
              <li>Building voice AI agent infrastructure & agentic AI systems</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Staff SRE</h4>
                <h5>Mobile Premier League (MPL)</h5>
              </div>
              <h3>2019–23</h3>
            </div>
            <ul>
              <li>Migrated 100+ microservices to Kubernetes with Istio Service Mesh</li>
              <li>HA AWS infrastructure for India's largest gaming platform (100M+ users)</li>
              <li>ELK log management handling 10+ TB daily; Terraform + Atlantis IaC</li>
              <li>Observability with Prometheus, Thanos & Grafana</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founding Member &amp; DevOps Lead</h4>
                <h5>Crevise Technologies (Acquired by MPL)</h5>
              </div>
              <h3>2016–19</h3>
            </div>
            <ul>
              <li>Designed HA, scalable AWS architectures from the ground up</li>
              <li>CI pipelines with Jenkins; infrastructure automation with Chef</li>
              <li>Monitoring & logging with DataDog and Loggly</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Whitehedge Technologies</h5>
              </div>
              <h3>2015–16</h3>
            </div>
            <ul>
              <li>Led cloud migration for Cathay Pacific as project lead & Ansible developer</li>
              <li>Containerized microservices with Docker & Kubernetes</li>
              <li>Integrated automated tests into CI pipeline with DroneCI</li>
            </ul>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Webonise Labs (Haptiq)</h5>
              </div>
              <h3>2014–15</h3>
            </div>
            <ul>
              <li>Managed Linux servers; automated deployments with Webistrano & Capistrano</li>
              <li>Multi-stack deployments across ROR, Django, NodeJS & Tomcat</li>
              <li>LDAP auth, automated backups & Nagios monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
