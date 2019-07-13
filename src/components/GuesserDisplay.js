import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';
import { withTranslation } from 'react-i18next';
import AudioVizualizer from './AudioVizualizer';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import themes from './themes';
import {
  faPause,
  faPlay,
  faPlayCircle,
  faForward,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import Timer from './Timer';
import $ from 'jquery';

class GuesserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuizStarted: false,
      isQuizFinished: false,
      theme: {},
      playlist: [],
      currentTrack: {},
      trackSource: {},
      isTrackRevealed: false,
      isTrackPlaying: false,
      trackCurrentTime: 0,
      tracksPlayed: []
    };
    this.audio = React.createRef();
  }

  getRandomTrack = () => {
    if (!this.state.playlist.data) {
      return;
    }
    let track;
    let trackFound = false;
    while (!trackFound) {
      const randomTrackIndex = Math.floor(
        Math.random() * this.state.playlist.data.length
      );
      track = this.state.playlist.data[randomTrackIndex];
      // Deezer API can send tracks without preview => mandatory to be played with audio src
      if (track.preview && !this.state.tracksPlayed.includes(track)) {
        trackFound = true;
      } else if (
        this.state.tracksPlayed.length >= this.state.playlist.data.length
      ) {
        this.setState({ isQuizFinished: true });
        return;
      }
    }

    return track;
  };

  setAudio = track => {
    if (!track || !track.preview) {
      return;
    }
    this.setState({ trackSource: track.preview }, function() {
      this.audio.current.pause();
      this.audio.current.load();
      const audioPromise = this.audio.current.play();
      if (audioPromise !== undefined) {
        audioPromise
          .then(_ => {
            // autoplay started
          })
          .catch(err => {
            // if autoplay wasn't able to start
            this.setState({ isTrackRevealed: false, isTrackPlaying: false });
          });
      }
      this.setState({ isTrackRevealed: false, isTrackPlaying: true });
    });
  };

  startBlindTest = () => {
    const timerComponent = this.refs.timer;
    if (timerComponent) {
      timerComponent.resetAnimation();
    }

    let track = this.getRandomTrack();
    if (!track) {
      return;
    }

    const tracksPlayed = this.state.tracksPlayed;
    tracksPlayed.push(track);
    this.setState({
      isQuizStarted: true,
      currentTrack: track,
      tracksPlayed: tracksPlayed
    });
    this.setAudio(track);
  };

  revealTrack = () => {
    this.setState({ isTrackRevealed: true });
  };

  setTimer = () => {
    let currentTime = this.audio.current.currentTime;
    currentTime = Math.ceil(30 - currentTime);
    this.setState({
      trackCurrentTime: currentTime
    });
  };

  playTrack = () => {
    if (this.refs.timer) {
      this.refs.timer.playAnimation();
    }
    this.setState({ isTrackPlaying: true });
    this.audio.current.play();
  };

  pauseTrack = () => {
    if (this.refs.timer) {
      this.refs.timer.pauseAnimation();
    }
    this.setState({ isTrackPlaying: false });
    this.audio.current.pause();
  };

  getPlaylist = url => {
    $.ajax({
      dataType: 'jsonp',
      url: url,
      timeout: 5000,
      success: function(data) {
        let tracks;
        if (data.tracks) {
          tracks = data.tracks;
        } else {
          tracks = data;
        }
        tracks.data = tracks.data.filter(track => track.preview);
        this.setState({
          playlist: tracks
        });
      }.bind(this),
      error: function(err) {
        if (this.refs.timer) {
          this.refs.timer.pauseAnimation();
        }
      }.bind(this)
    });
  };

  getThemeFromId(themeId) {
    return themes.find(theme => theme.id === themeId);
  }

  componentDidMount() {
    const theme = this.getThemeFromId(this.props.match.params.themeId);
    this.setState({ theme: theme });
    this.getPlaylist(theme.url);
  }

  render() {
    const { t } = this.props;
    let rounded_display;

    const playButton = (
      <Button variant="primary" onClick={this.pauseTrack}>
        <FontAwesomeIcon icon={faPause} /> {t('pause')}
      </Button>
    );
    const pauseButton = (
      <Button variant="primary" onClick={this.playTrack}>
        <FontAwesomeIcon icon={faPlay} /> {t('play')}
      </Button>
    );

    if (!this.state.isQuizStarted) {
      rounded_display = (
        <React.Fragment>
          <p className="text-center">{t('start_instruction')}</p>
          <FontAwesomeIcon
            onClick={this.startBlindTest}
            icon={faPlayCircle}
            className="btn-primary shadow startBlindTest-btn"
          />
        </React.Fragment>
      );
    } else if (this.state.isTrackRevealed && !this.state.isQuizFinished) {
      rounded_display = (
        <React.Fragment>
          <Image
            className="shadow picture"
            alt="artist picture"
            src={this.state.currentTrack.album.cover_medium}
            roundedCircle
          />
          <p className="text-center mt-3">{this.state.currentTrack.title}</p>
          <p className="text-center ">{this.state.currentTrack.artist.name}</p>
          <p className="text-center ">
            <a
              href={this.state.currentTrack.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('full_track')}
            </a>
          </p>
          <Button
            className="mt-1"
            variant="primary"
            onClick={this.startBlindTest}
          >
            <FontAwesomeIcon icon={faForward} /> {t('next')}
          </Button>
        </React.Fragment>
      );
    } else if (!this.state.isQuizFinished) {
      rounded_display = (
        <Timer
          className="shadow"
          ref="timer"
          timerNumber={this.state.trackCurrentTime}
        />
      );
    }
    return (
      <div
        style={{ minHeight: '80vh' }}
        className="guesser-container d-flex flex-column justify-content-around flex-nowrap align-items-center"
      >
        <h1 className="text-center text-primary mt-4 mb-4">
          {t('theme')}: {t(this.state.theme.id)}
        </h1>
        {this.state.isQuizFinished && (
          <React.Fragment>
            <p>{t('quiz_finished')}</p>
            <LinkContainer to="/themes">
              <Button variant="outline-primary">
                {t('back_to_theme_selection')}
              </Button>
            </LinkContainer>
          </React.Fragment>
        )}

        {rounded_display}
        <Button
          style={{
            visibility:
              this.state.isQuizStarted && !this.state.isTrackRevealed
                ? 'visible'
                : 'hidden'
          }}
          variant="outline-primary reveal-btn"
          onClick={this.revealTrack}
        >
          <FontAwesomeIcon icon={faEyeSlash} /> {t('reveal')}
        </Button>
        <div
          style={{
            visibility:
              this.state.isQuizStarted && !this.state.isTrackRevealed
                ? 'visible'
                : 'hidden'
          }}
        >
          {this.state.isTrackPlaying ? playButton : pauseButton}
        </div>
        <audio
          crossOrigin="anonymous"
          ref={this.audio}
          onEnded={this.revealTrack}
          onTimeUpdate={this.setTimer}
        >
          <source src={this.state.trackSource} type="audio/mp3" />
        </audio>
        {this.state.isQuizStarted && <AudioVizualizer audio={this.audio} />}
      </div>
    );
  }
}
export default withRouter(withTranslation()(GuesserDisplay));
