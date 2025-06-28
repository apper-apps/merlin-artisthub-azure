import notificationsData from '@/services/mockData/notifications.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class NotificationService {
  constructor() {
    this.notifications = [...notificationsData];
  }

  async getAll() {
    await delay(200);
    return [...this.notifications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await delay(150);
    const notification = this.notifications.find(n => n.Id === id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return { ...notification };
  }

  async markAsRead(id) {
    await delay(200);
    const index = this.notifications.findIndex(n => n.Id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }
    this.notifications[index].read = true;
    return { ...this.notifications[index] };
  }

  async markAllAsRead() {
    await delay(300);
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    return [...this.notifications];
  }

  async getUnreadCount() {
    await delay(100);
    return this.notifications.filter(n => !n.read).length;
  }

  async create(notificationData) {
    await delay(200);
    const newNotification = {
      Id: Math.max(...this.notifications.map(n => n.Id)) + 1,
      timestamp: new Date().toISOString(),
      read: false,
      ...notificationData
    };
    this.notifications.push(newNotification);
    return { ...newNotification };
  }

  async delete(id) {
    await delay(200);
    const index = this.notifications.findIndex(n => n.Id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }
    this.notifications.splice(index, 1);
    return true;
  }
}

export const notificationService = new NotificationService();