const request = require('supertest');
const app = require('../server');
const dataManager = require('../utils/dataManager');

// Mock the dataManager
jest.mock('../utils/dataManager');

describe('App Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/apps', () => {
    it('should return all apps', async () => {
      const mockApps = [
        {
          appName: 'appOne',
          appData: {
            appPath: '/appSix',
            appOwner: 'ownerOne',
            isValid: true
          }
        }
      ];

      dataManager.getAllApps.mockResolvedValue(mockApps);

      const response = await request(app)
        .get('/api/apps')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockApps,
        count: 1
      });
    });

    it('should handle errors when getting apps', async () => {
      dataManager.getAllApps.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/apps')
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        error: 'Database error'
      });
    });
  });

  describe('GET /api/apps/search', () => {
    it('should search apps by criteria', async () => {
      const mockApps = [
        {
          appName: 'appOne',
          appData: {
            appPath: '/appSix',
            appOwner: 'ownerOne',
            isValid: true
          }
        }
      ];

      dataManager.searchApps.mockResolvedValue(mockApps);

      const response = await request(app)
        .get('/api/apps/search')
        .query({
          appName: 'app',
          appOwner: 'owner',
          isValid: 'true'
        })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockApps,
        count: 1,
        criteria: {
          appName: 'app',
          appOwner: 'owner',
          isValid: true
        }
      });
    });
  });

  describe('GET /api/apps/:appName', () => {
    it('should return specific app by appName', async () => {
      const mockApp = {
        appName: 'appOne',
        appData: {
          appPath: '/appSix',
          appOwner: 'ownerOne',
          isValid: true
        }
      };

      dataManager.findAppByAppName.mockResolvedValue(mockApp);

      const response = await request(app)
        .get('/api/apps/appOne')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockApp
      });
    });

    it('should return 404 when app not found', async () => {
      dataManager.findAppByAppName.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/apps/nonexistent')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'App not found'
      });
    });
  });

  describe('PUT /api/apps/:appName', () => {
    it('should update app successfully', async () => {
      const updatedApp = {
        appName: 'appOne',
        appData: {
          appPath: '/appSix',
          appOwner: 'newOwner',
          isValid: false
        }
      };

      dataManager.updateApp.mockResolvedValue(updatedApp);

      const response = await request(app)
        .put('/api/apps/appOne')
        .send({
          appOwner: 'newOwner',
          isValid: false
        })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: updatedApp,
        message: 'App updated successfully'
      });
    });

    it('should reject update of restricted fields', async () => {
      const response = await request(app)
        .put('/api/apps/appOne')
        .send({
          appName: 'newAppName',
          appPath: '/newPath'
        })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'Cannot update fields: appName, appPath. Only appOwner and isValid can be updated.'
      });
    });

    it('should return 404 when app not found for update', async () => {
      dataManager.updateApp.mockRejectedValue(new Error('App not found'));

      const response = await request(app)
        .put('/api/apps/nonexistent')
        .send({
          appOwner: 'newOwner'
        })
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'App not found'
      });
    });
  });

  describe('DELETE /api/apps/:appName', () => {
    it('should delete app successfully', async () => {
      const deletedApp = {
        appName: 'appOne',
        appData: {
          appPath: '/appSix',
          appOwner: 'ownerOne',
          isValid: true
        }
      };

      dataManager.deleteApp.mockResolvedValue(deletedApp);

      const response = await request(app)
        .delete('/api/apps/appOne')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: deletedApp,
        message: 'App deleted successfully'
      });
    });

    it('should return 404 when app not found for deletion', async () => {
      dataManager.deleteApp.mockRejectedValue(new Error('App not found'));

      const response = await request(app)
        .delete('/api/apps/nonexistent')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'App not found'
      });
    });
  });
}); 