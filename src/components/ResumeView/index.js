import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { connect as reduxConnect } from "react-redux";
import Education from "./Education";
import TechnicalSkill from "./TechnicalSkill";
import Experience from "./Experience";
import "./styles.css";

const mapStateToProps = ({ Resume: { Experience, Education, TechnicalSkill } }) => ({
  Experience,
  Education,
  TechnicalSkill
});

const mapDispatchToProps = {};

class ResumeView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    Experience: PropTypes.array.isRequired,
    Education: PropTypes.array.isRequired,
    TechnicalSkill: PropTypes.array.isRequired
  };

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  renderEducation = educations => educations.map((e, i) => <Education key={i} {...e} />);

  renderTechnicalSkill = technicalskills => technicalskills.map((e, i) => <TechnicalSkill key={i} {...e} />);

  renderExperience = experiences => experiences.map((e, i) => <Experience key={i} {...e} />);

  render() {
    const { Experience, Education, TechnicalSkill } = this.props;
    return (
      <Container fluid className="ResumeView">
        <Row>
          <Col xs={12}>
            <span className="ExperienceTitle">EDUCATION</span>
          </Col>
        </Row>
        {this.renderEducation(Education)}
        <Row>
          <Col xs={12}>
            <span className="ExperienceTitle">TECHNICAL SKILLS</span>
          </Col>
        </Row>
        {this.renderTechnicalSkill(TechnicalSkill)}
        <Row>
          <Col xs={12}>
            <span className="ExperienceTitle">EXPERIENCE</span>
          </Col>
        </Row>
        {this.renderExperience(Experience)}
      </Container>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(ResumeView);
