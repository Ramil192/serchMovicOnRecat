export default class SwapeServer {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8c6dbd7d4f04d89380a2407e93d496b2&language=en-US&query=';

  async getResurse(nameMovis, page = 1) {
    const res = await fetch(`${this._apiBase}${nameMovis}&page=${page}&per_page=5&include_adult=false`);
    if (!res.ok) {
      throw Error(`recoved ${res.status}`);
    }

    return res.json();
  }

  async getAllPeople(nameMovis, page) {
    return this.getResurse(nameMovis, page);
  }

  async getOnePage(nameMovis) {
    const res = await this.getResurse(nameMovis);
    return res.results;
  }

  async getAllGeneres() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=8c6dbd7d4f04d89380a2407e93d496b2&language=en-US`
    );
    if (!res.ok) {
      throw Error(`recoved ${res.status}`);
    }
    return res.json();
  }
}
