import React, { PureComponent } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class news extends PureComponent {
  // articles = [
  //   {
  //     "source": {
  //     "id": null,
  //     "name": "CBS Sports"
  //     },
  //     "author": "",
  //     "title": "2024 NFL playoff schedule, bracket: Dates, times and TV for every round of AFC and NFC postseason - CBS Sports",
  //     "description": "Here's the full schedule for the 2024 NFL playoffs",
  //     "url": "https://www.cbssports.com/nfl/news/2024-nfl-playoff-schedule-bracket-dates-times-and-tv-for-every-round-of-afc-and-nfc-postseason/",
  //     "urlToImage": "https://sportshub.cbsistatic.com/i/r/2024/01/08/fdac9629-9694-4e86-ad02-11a37993d1a7/thumbnail/1200x675/3fc4f4232db0aa7f077d1aec30fcade1/nflplayoffs2024-social.png",
  //     "publishedAt": "2024-01-09T00:51:59Z",
  //     "content": "The NFL playoffs are finally upon us. After a wild 18 weeks, the NFL regular-season is finally in the books and it's now time for the postseason as the wild card round is now upon us. \r\nAlthough ther… [+4042 chars]"
  //     }
  // ]

    static defaultProps = {
      country: "in",
      pageSize: 5,
      category: "general"
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4253f97736e48c0ad24bd37daf22bf4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json(data);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,       loading: false })
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4253f97736e48c0ad24bd37daf22bf4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json(data);
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }

  handleNext = async () => {
    if (this.state.page +1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4253f97736e48c0ad24bd37daf22bf4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json(data);
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }

  }

  render() {
    return (
      <div className="container my-3">
        <h1>News-Monkey Top-Headline</h1>
        {this.state.loading && <Spinner/>}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((e) => {
            return <div className="col-md-3 mx-3" key={e.url}>
              {/* <Newsitem title={e.title.slice(0,45)} description={e.description.slice(0,90)} imgUrl={e.urlToImage} newUrl={e.url} /> */}
              <Newsitem title={e.title ? e.title.slice(0, 45) : ""} description={e.description ? e.description.slice(0, 90) : ""} imgUrl={e.urlToImage} newUrl={e.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevious}>&larr;Previous</button>
          <button disabled={this.state.page  >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNext}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}
