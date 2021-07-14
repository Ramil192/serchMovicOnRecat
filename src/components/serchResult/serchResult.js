import React from 'react';
import PropsTypes from 'prop-types';
import Block from '../block/block';

export default function SerchResult({ resultSerch, onClickReted, genres }) {
  const element = resultSerch.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <div key={id}>
        <Block {...itemProps} onClickReted={onClickReted} genres={genres} />
      </div>
    );
  });

  return <div className="movies">{element}</div>;
}

SerchResult.propTypes = {
  onClickReted: PropsTypes.func.isRequired,
  resultSerch: PropsTypes.arrayOf(PropsTypes.oneOfType([PropsTypes.number])).isRequired,
  genres: PropsTypes.arrayOf(PropsTypes.oneOfType([PropsTypes.number])).isRequired,
};
