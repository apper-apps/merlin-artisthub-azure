import artistsData from '@/services/mockData/artists.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ArtistService {
  constructor() {
    this.artists = [...artistsData];
  }

  async getAll() {
    await delay(300);
    return [...this.artists];
  }

  async getById(id) {
    await delay(200);
    const artist = this.artists.find(a => a.Id === id);
    if (!artist) {
      throw new Error('Artist not found');
    }
    return { ...artist };
  }

  async create(artistData) {
    await delay(300);
    const newArtist = {
      Id: Math.max(...this.artists.map(a => a.Id)) + 1,
      ...artistData
    };
    this.artists.push(newArtist);
    return { ...newArtist };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.artists.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error('Artist not found');
    }
    this.artists[index] = { ...this.artists[index], ...updateData };
    return { ...this.artists[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.artists.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error('Artist not found');
    }
    this.artists.splice(index, 1);
    return true;
  }
}

export const artistService = new ArtistService();