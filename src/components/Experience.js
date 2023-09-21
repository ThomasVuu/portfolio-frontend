import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/experience")
    .then((res) => res.json())
    .then((data) => {
      this.setState({ apiData: data }, 
        // () => console.log("Experience fetched...", data)
        );  
    })
    .catch((err) => console.log(err));
  }

  render() {
    if (this.state.apiData) {
      var work = this.state.apiData.map(function (work, i) {
        const technologies = work.technologies;
        var tech = technologies.map((technology, i) => {
          return (
            <Badge pill className="experience-badge mr-2 mb-2" key={i}>
              {technology.name}
            </Badge>
          );
        });
        var end_date = work.end_date==null ? "Present" : work.end_date;
        var date = work.start_date + " - " + end_date;
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={date}
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className="fab fa-python experience-icon"></i>}
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              <Badge pill className="main-badge mr-2 mb-2" key={i}>
              {work.main_tech}
            </Badge>
            </div>

            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {work.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {work.company}
            </h4>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });
    }
    return (
      <section id="resume" className="pb-5">
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black" style={{ textAlign: "center" }}>
                EXPERIENCE
              </span>
            </h1>
          </div>
        </div>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>
            {work}
            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </section>
    );
  }
}

export default Experience;
