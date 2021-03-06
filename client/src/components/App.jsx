import React from 'react';
import moment from 'moment-timezone';
import Graph from './Graph';

const timeUpdate = jsonData => (
  jsonData.map((stockObj, index) => ({
    price: stockObj.price,
    time: moment(stockObj.dateTime).add(8, 'hour').format('h:mm A').concat(' ET'),
    id: index,
    marketOpen: false,
    hover: false,
  }))
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyName: undefined,
      displayPrice: 0,
      marketOpen: true,
    };
    this.handleChartHover = this.handleChartHover.bind(this);
    this.handleChartLeave = this.handleChartLeave.bind(this);
    this.marketOpenCheck = this.marketOpenCheck.bind(this);
  }

  componentDidMount() {
    const id = Math.floor(Math.random() * 10) + 1;
    fetch(`/chart/stocks/${id}`)
      .then(res => res.json())
      .then((jsonData) => {
        const data = timeUpdate(jsonData);
        const displayPrice = data[data.length - 1].price;
        this.setState({ data, displayPrice });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`/chart/companies/${id}`)
      .then(res => res.json())
      .then((jsonData) => {
        const companyName = jsonData[0].name;
        this.setState({ companyName });
      })
      .catch((err) => {
        console.log(err);
      });
    this.marketOpenCheck();
  }

  handleChartHover(event) {
    if (event.activePayload) {
      const { price } = event.activePayload[0].payload;
      this.setState({
        displayPrice: price,
        hover: true,
      });
    }
  }

  handleChartLeave() {
    const { data } = this.state;
    const currentMarketPrice = data[data.length - 1].price;
    this.setState({
      displayPrice: currentMarketPrice,
      hover: false,
    });
  }

  marketOpenCheck() {
    const currentTime = moment().tz('America/New_York');
    const open = moment().tz('America/New_York')
      .hour(9)
      .minute(30)
      .second(0)
      .millisecond(0);
    const close = moment().tz('America / New_York')
      .hour(16)
      .minute(0)
      .second(0)
      .millisecond(0);
    const openTradingHours = (
      (currentTime.hour() > open.hour()
        || (currentTime.hour() === open.hour() && currentTime.minutes() >= open.minutes()))
      && currentTime.hour() < close.hour()
    );
    const isWeekDay = (currentTime.day() !== 6) && (currentTime.day() !== 0);
    this.setState({
      marketOpen: (openTradingHours && isWeekDay),
    });
  }

  render() {
    const {
      data,
      companyName,
      displayPrice,
      marketOpen,
      hover,
    } = this.state;
    if (data.length) {
      return (
        <Graph
          data={data}
          companyName={companyName}
          displayPrice={displayPrice}
          marketOpen={marketOpen}
          hover={hover}
          handleChartHover={this.handleChartHover}
          handleChartLeave={this.handleChartLeave}
        />
      );
    }
    return '';
  }
}

export default App;
