import React, { Component } from 'react';
import './block.scss';
import { Rate } from 'antd';
import PropsTypes from 'prop-types';

export default class Block extends Component {
  state = {
    loading: false,
  };

  selected = false;

  image = `https://image.tmdb.org/t/p/w600_and_h900_bestv2`;

  image1 = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg`;

  show = (genresId) => {
    const { genres } = this.props;
    return genresId.map((e) => {
      for (const iterator of genres) {
        if (iterator.id === e) {
          return iterator.name;
        }
      }
    });
  };

  click = (value) => {
    if (!this.selected) {
      this.selected = true;
      const { onClickReted } = this.props;
      onClickReted({ ...this.props, value });
    }
  };

  loadImg = () => {
    this.setState({ loading: true });
  };

  color = (voteAverage) => {
    if (voteAverage <= 3) {
      return 'red';
    }
    if (voteAverage <= 5) {
      return 'darkorange';
    }
    if (voteAverage <= 7) {
      return 'gold';
    }
    return 'lawngreen';
  };

  truncate = function (e) {
    let re = e.match(/^.{0,180}[\S]*/);
    const l = re[0].length;
    re = re[0].replace(/\s$/, '');
    if (l < e.length) {
      re += '...';
    }
    return re;
  };

  render() {
    const { loading } = this.state;
    const {
      poster_path: posterPath,
      original_title: originalTitle,
      overview,
      vote_average: voteAverage,
      release_date: releaseDate,
      genre_ids: genreIds,
    } = this.props;

    const genreId = this.show(genreIds);
    const newOverview = this.truncate(overview);
    const loadingImg = <div className={loading ? 'movies__imgLoadingNone' : 'movies__imgLoading'}>Loading...</div>;

    const genreElement = genreId.map((element, i) => {
      return <li key={i}>{element}</li>;
    });

    return (
      <div className="movies__body">
        <div className="movies__imgBody">
          {loadingImg}
          <img
            className="movies__img"
            src={posterPath ? this.image + posterPath : this.image1}
            alt=""
            onLoad={this.loadImg}
          />
        </div>
        <div className="movies__items">
          <div className="movies__header">
            <h3 className="movies__title">{originalTitle}</h3>
            <div className={`movies__rating ${this.color(voteAverage)}`}>{voteAverage}</div>
          </div>
          <span className="movies__date">{releaseDate}</span>
          <ul className="movies__genre">{genreElement.length === 0 ? <li>is unknown</li> : genreElement}</ul>
          <span className="movies__text">{newOverview}</span>
          <div className="wraperRate">
            <Rate allowHalf defaultValue={voteAverage} count={10} onChange={this.click} />
          </div>
        </div>
      </div>
    );
  }
}

Block.defaultProps = {
  poster_path: `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg`,
};

Block.propTypes = {
  onClickReted: PropsTypes.func.isRequired,
  poster_path: PropsTypes.string,
  original_title: PropsTypes.string.isRequired,
  overview: PropsTypes.string.isRequired,
  vote_average: PropsTypes.number.isRequired,
  genre_ids: PropsTypes.arrayOf(PropsTypes.oneOfType([PropsTypes.number])).isRequired,
  genres: PropsTypes.arrayOf(PropsTypes.oneOfType([PropsTypes.number])).isRequired,
  release_date: PropsTypes.string.isRequired,
};
