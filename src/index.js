import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Spin, Pagination } from 'antd';
import 'antd/dist/antd.css';
import SwapeServer from './components/swaipServer/swaipServer';
import './components/index.scss';
import Serch from './components/serch/serch';
import SerchResult from './components/serchResult/serchResult';
import Error404 from './components/error404/error404';

const swapeServer = new SwapeServer();
export default class App extends Component {
  flagOneDownloadPage = false;

  page = 1;

  genres = [];

  state = {
    resultSerch: [],
    totalResults: 0,
    loading: true,
    error404: false,
    valueSerch: '',
    selectedRetedFlag: false,
    reted: [],
  };

  componentDidMount() {
    swapeServer.getAllGeneres().then((r) => {
      this.genres = r.genres;
    });
    swapeServer
      .getAllPeople('The way back')
      .then((r) => {
        this.setState({ resultSerch: r.results, totalResults: r.total_results, loading: false, error404: false });
      })
      .catch(() => {
        this.setState({ error404: true, loading: false });
      });
  }

  pageClick = (current) => {
    const { valueSerch } = this.state;
    this.setState({ loading: true });
    this.getSerchValue(valueSerch, current);
  };

  getSerchValue = (nameMovis, page) => {
    const { valueSerch } = this.state;
    this.page = page;
    if (nameMovis !== valueSerch) {
      this.page = 1;
    }
    this.setState({ loading: true });
    swapeServer
      .getAllPeople(nameMovis, page)
      .then((r) => {
        this.setState({
          resultSerch: r.results,
          totalResults: r.total_results,
          loading: false,
          error404: false,
          valueSerch: nameMovis,
        });
      })
      .catch(() => {
        this.setState({ error404: true, loading: false });
      });
  };

  onClickRetedFlag = (flag) => {
    this.setState({ selectedRetedFlag: flag });
  };

  onClickReted = (value) => {
    this.setState(({ reted }) => {
      let newArr = [];
      if (reted) {
        newArr = [...reted, value];
      } else {
        newArr = [value];
      }

      return {
        reted: newArr,
      };
    });
  };

  render() {
    const { resultSerch, totalResults, loading, error404, selectedRetedFlag, reted } = this.state;
    const spin = (
      <div className="example">
        <Spin />
      </div>
    );
    const showPageOrReted = (
      <SerchResult
        resultSerch={selectedRetedFlag ? reted : resultSerch}
        onClickReted={this.onClickReted}
        genres={this.genres}
      />
    );
    return (
      <div>
        <Serch
          getSerchValue={this.getSerchValue}
          onClickReted={this.onClickRetedFlag}
          selectedRetedFlag={selectedRetedFlag}
        />
        {error404 ? <Error404 /> : loading ? spin : showPageOrReted}
        <div className="pageBody">
          <Pagination
            current={this.page}
            showSizeChanger={false}
            onChange={this.pageClick}
            total={selectedRetedFlag ? 1 : totalResults}
            defaultPageSize={20}
            pageSizeOptions={[20]}
            disabled={totalResults <= 20}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
