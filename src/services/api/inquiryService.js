import inquiriesData from '@/services/mockData/inquiries.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class InquiryService {
  constructor() {
    this.inquiries = [...inquiriesData];
  }

  async getAll() {
    await delay(300);
    return [...this.inquiries].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }

  async getById(id) {
    await delay(200);
    const inquiry = this.inquiries.find(i => i.Id === id);
    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    return { ...inquiry };
  }

  async create(inquiryData) {
    await delay(300);
    const newInquiry = {
      Id: Math.max(...this.inquiries.map(i => i.Id)) + 1,
      submittedAt: new Date().toISOString(),
      status: 'new',
      ...inquiryData
    };
    this.inquiries.push(newInquiry);
    return { ...newInquiry };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.inquiries.findIndex(i => i.Id === id);
    if (index === -1) {
      throw new Error('Inquiry not found');
    }
    this.inquiries[index] = { ...this.inquiries[index], ...updateData };
    return { ...this.inquiries[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.inquiries.findIndex(i => i.Id === id);
    if (index === -1) {
      throw new Error('Inquiry not found');
    }
    this.inquiries.splice(index, 1);
    return true;
  }

  async getByStatus(status) {
    await delay(300);
    return this.inquiries.filter(i => i.status === status);
  }
}

export const inquiryService = new InquiryService();