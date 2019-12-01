export default class RestoService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  }

  async getMenuItems() {
    return await this.getResource('/menu')
  }

}
