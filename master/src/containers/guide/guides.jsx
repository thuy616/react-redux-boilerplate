import React from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import {Grid, Row, Col, Dropdown, MenuItem} from 'react-bootstrap';
import Base from '../../components/Layout/Base';
import fetch from 'isomorphic-fetch';
import { fetchGuides } from '../../actions/index';
import Radium from 'radium';
import { connect } from 'react-redux';

class Guides extends React.Component {
    render() {
        return (
          <div>
            <ContentWrapper>
                <div className="content-heading">
                    Tours
                    <small data-localize="dashboard.WELCOME">Welcome to Decentral!</small>
                </div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h2 className="text-thin">Single view content</h2>
                        <p>
                            This project is an application skeleton. You can use it to quickly bootstrap your ReactJS webapp projects and dev environment for these projects.
                            <br/>
                            The seed app doesn't do much and has most of the feature removed so you can add theme as per your needs just following the demo app examples.
                        </p>
                    </Col>
                </Row>
            </ContentWrapper>
          </div>
        );
    }
}

/**
 * Radium connect.
 */
GuidesContainer = Radium(GuidesContainer);

/**
 * Redux connect.
 */
export default connect(
  state => ({ guides: state.guides })
)(GuidesContainer)
