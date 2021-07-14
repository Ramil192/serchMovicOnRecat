import React, { useCallback } from 'react';
import './serch.scss';
import PropsTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default function Serch({ getSerchValue, onClickReted, selectedRetedFlag }) {
  let value = '';

  const debSave = useCallback(
    debounce((value) => getSerchValue(value), 600),
    []
  );

  function setSerchValue(e) {
    if (e.target.value) {
      value = e.target.value;
      debSave(value);
    }
  }

  function onClickRetedFlagTrue() {
    onClickReted(true);
  }
  function onClickRetedFlagFalse() {
    onClickReted(false);
  }

  const selectedSerch = `${selectedRetedFlag ? '' : 'selected'} serch__textSerch `;
  const selectedReted = `${selectedRetedFlag ? 'selected' : ''} serch__textRated `;

  return (
    <div className="serch">
      <div className="serch__text">
        <button
          type="button"
          className={selectedSerch}
          onClick={onClickRetedFlagFalse}
          onKeyDown={onClickRetedFlagFalse}
        >
          Search
        </button>
        <button type="button" className={selectedReted} onClick={onClickRetedFlagTrue} onKeyDown={onClickRetedFlagTrue}>
          Reted
        </button>
      </div>
      <input onChange={setSerchValue} type="text" className="serch__input" placeholder="Type to search..." />
    </div>
  );
}

Serch.propTypes = {
  getSerchValue: PropsTypes.func.isRequired,
  onClickReted: PropsTypes.func.isRequired,
  selectedRetedFlag: PropsTypes.bool.isRequired,
};
