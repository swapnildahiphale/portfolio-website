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
            <p>
              Strategic execution of Call-AI acquisition, revamping services with
              containerization and bespoke CI/CD. Architected end-to-end dynamic
              environment provisioning for Health Exchange SaaS platform. Leading
              AI voice agent infrastructure and agentic AI implementations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Staff SRE</h4>
                <h5>Mobile Premier League (MPL)</h5>
              </div>
              <h3>2019–23</h3>
            </div>
            <p>
              Led architecture and migration of 100+ microservices to Kubernetes
              with Istio Mesh. Engineered highly available AWS infrastructure for
              India's largest mobile gaming platform (100M+ users). Implemented
              log management with ELK handling 10+ TB daily data. Designed
              Terraform and Atlantis-based IaC; observability with Prometheus,
              Thanos, and Grafana.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founding Member &amp; DevOps Lead</h4>
                <h5>Crevise Technologies (Acquired by MPL)</h5>
              </div>
              <h3>2016–19</h3>
            </div>
            <p>
              Proposed and implemented highly available, scalable architectures
              on AWS. CI pipelines with Jenkins, infrastructure automation with
              Chef. Monitoring and logging with DataDog and Loggly.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Whitehedge Technologies</h5>
              </div>
              <h3>2015–16</h3>
            </div>
            <p>
              Led cloud migration for Cathay Pacific Airways as project lead and
              Ansible developer. Containerized microservices with Docker and
              Kubernetes. Integrated automated tests with CI pipeline using
              DroneCI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Webonise Labs (Haptiq)</h5>
              </div>
              <h3>2014–15</h3>
            </div>
            <p>
              Managed Linux servers and automated deployment with Webistrano,
              Capistrano, and Chef. Deployment automation across ROR, Django,
              NodeJS, and Tomcat stacks. LDAP authentication, automated backups,
              and Nagios monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
