import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import GuesserDisplay from './components/GuesserDisplay';
import { LinkContainer } from 'react-router-bootstrap';
import ThemePicker from './components/ThemePicker';
import { useTranslation } from 'react-i18next';
import Logo from './logo.svg';
import './App.css';

function Homepage() {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <main className="home-content">
        <h1 className="text-primary">{t('title')}</h1>
        <p className="text-center">{t('sub_title')}</p>
        <LinkContainer to="/themes">
          <Button className="start-btn" variant="outline-primary">
            {t('begin')}
          </Button>
        </LinkContainer>
      </main>
    </Suspense>
  );
}

function BlindTest() {
  const { t, i18n } = useTranslation();

  function handleChangeLang(newLang) {
    i18n.changeLanguage(newLang);
  }

  return (
    <Router basename="/BlindTest">
      <Navbar collapseOnSelect expand="sm">
        <Navbar.Brand className="text-primary">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' Blind Test'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              {t('home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/themes">
              {t('theme', { count: 12 })}
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              onSelect={handleChangeLang}
              title="Language"
              id="basic-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item eventKey="en" active={i18n.language === 'en'}>
                {'English'}
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="fr" active={i18n.language === 'fr'}>
                {'Français'}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/themes" component={ThemePicker} exact />
        <Route path="/themes/:themeId" component={GuesserDisplay} />
        <Route
          render={() => (
            <h1 className="text-primary text-center">{t('404')}</h1>
          )}
        />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <Suspense fallback="loading">
      <BlindTest />
    </Suspense>
  );
}

export default App;
