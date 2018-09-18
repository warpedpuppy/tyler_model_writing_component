import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBar from './top-bar';
import { createPageTitle } from '../actions';
import Genres from './json/genres.json';
import Imgs from './json/images.json';
import Keywords from './json/keywords.json';
import './writer.css';

class Writer extends Component {
  constructor(props) {
    super(props);
    this.intervalHandler = this.intervalHandler.bind(this);
    this.startWriting = this.startWriting.bind(this);
    this.saveSentence = this.saveSentence.bind(this);
    this.testing = this.testing.bind(this);
    this.timerObj = undefined;
    this.state = {
      writing: false,
      startTime: 60,
      endTime: 0,
      genre: 'awesome',
      keyword: 'inpsired',
      img: '',
      imgActive: false,
      imgActiveTime: 30,
      currentSentence: '',
      story: '',
      testing: 'test'
    };
  }
  // Timer
  // Periodically add picture
  // Periodically

  // Genre

  // Saving current sentence to the story (Local State)

  // Load JSON

  startWriting() {
    this.setState({
      writing: true,
      genre: Genres.array[Math.floor(Math.random() * (Genres.array.length))],
      keyword: Keywords.array[Math.floor(Math.random() * (Keywords.array.length))],
      img: Imgs.array[Math.floor(Math.random() * (Imgs.array.length - 1))],
      imgActiveTime: (Math.floor(Math.random() * 20 + 20)),
    });
    // this.setState({
    //   story: 'Write the first sentence of your story in the box above and hit Enter. Don’t forget to include the word of the sentence!',
    // });
    this.timer();
  }

  timer() {
    //this.timerObj = setInterval(this.intervalHandler, 1000);
  }

  intervalHandler() {
    this.setState({
      startTime: this.state.startTime - 1,
    });
    if (this.state.startTime <= this.state.endTime) {
      clearInterval(this.timerObj);
    }
  }

  componentWillMount() {
    // console.log(Genres);
    // this.setState({
    //   genre: Genres.array[Math.floor(Math.random() * (Genres.array.length))],
    //   keyword: Keywords.array[Math.floor(Math.random() * (Keywords.array.length))],
    //   img: Imgs.array[Math.floor(Math.random() * (Imgs.array.length - 1))],
    // });
  }

  setSentence = (e) => {
    e.preventDefault();
    this.setState({currentSentence: e.target.value})
    console.log('current sentence = ', e.target.value)

  }
  enterKeySaveSentence = (e) => {
    if (e.key === "Enter" || e.key === ".") {
      console.log("submit activated");
      this.saveSentence();
    }
  }
  saveSentence = () => {
    if (this.state.imgActiveTime >= this.state.startTime) {
      this.setState({
        imgActive: true
      })
    }
    if (this.state.currentSentence === "") {
      return ""
    };
    if (this.state.story === "") {
      this.setState({
        currentSentence: "",
        story: `${this.state.currentSentence}.`,
        keyword: Keywords.array[Math.floor(Math.random() * (Keywords.array.length))],
        startTime: this.state.startTime + (Math.floor(Math.random() * 6) + 3)
      });
    }
    console.log(this.state.imgActiveTime);
    this.setState({
      currentSentence: "",
      story: `${this.state.story} ${this.state.currentSentence}.`,
      keyword: Keywords.array[Math.floor(Math.random() * (Keywords.array.length))],
      startTime: this.state.startTime + (Math.floor(Math.random() * 6) + 3),
    });
  }
  componentDidMount() {
    this.props.createPageTitle('writer');
  }
  testing(e){
    this.setState({testing: e.target.value})
  }
  render() {

    const WriterMain = (this.state.writing)?
          <div className="writer-container">
            <div className="story-header text-shadow-static">
            <input 
            placeholder="this is for testing"
            className="testing" 
            onChange={e => this.testing(e)} 
            value={this.state.testing}
            />
            </div>
          </div>:
          <div className="writer-starter">
          <div>
            <button className="button btn-light shadow" onClick={() => this.startWriting()}>start your story</button>
          </div>
        </div>;
     

    

    return (
      <div className="writer" >
        <TopBar />
        <main className="writer-main">
          {WriterMain}
        </main>
        <ul className="writer-footer">
          <li><button className="button btn-light">Save</button></li>
          <li><button className="button btn-light">Share</button></li>
        </ul>
      </div >
    );
  }
}

Writer.propTypes = {
  docTitle: PropTypes.string,
  createPageTitle: PropTypes.func,
};

const mapStateToProps = (state) => ({
  mainMenuActive: state.mainMenuActive,
  pageTitle: state.pageTitle,
  docTitle: state.docTitle,
});

const mapDispatchToProps = (dispatch) => ({
  createPageTitle: (title) => dispatch(createPageTitle(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Writer);
