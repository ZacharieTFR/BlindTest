import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import themes from './themes';

class ThemePicker extends Component {
  constructor(props) {
    super(props);
    this.handleThemeClick = this.handleThemeClick.bind(this);
  }

  handleThemeClick(themeId) {
    this.props.history.push(this.props.location.pathname + '/' + themeId);
  }

  render() {
    const { t } = this.props;
    return (
      <div className="theme-picker-container">
        <h4 className="theme-picker-title text-primary text-center">
          {t('themes_title')}
        </h4>
        <CardDeck>
          {themes.map(({ name, id, icon }) => (
            <Card
              key={id}
              bg="light"
              border="primary"
              onClick={this.handleThemeClick.bind(null, id)}
            >
              <Card.Body className="theme-display text-center">
                <span
                  className="playlist-logo"
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              </Card.Body>
              <Card.Footer className="text-center">{t(id)}</Card.Footer>
            </Card>
          ))}
        </CardDeck>
      </div>
    );
  }
}
export default withRouter(withTranslation()(ThemePicker));
