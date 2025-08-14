const express = require('express');
const router = express.Router();
const dataManager = require('../utils/dataManager');

// GET /api/apps - Get all apps
router.get('/', async (req, res) => {
  try {
    const apps = await dataManager.getAllApps();
    res.json({
      success: true,
      data: apps,
      count: apps.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/apps/search - Search apps by criteria
router.get('/search', async (req, res) => {
  try {
    const { appName, appOwner, isValid } = req.query;
    const criteria = {};
    
    if (appName) criteria.appName = appName;
    if (appOwner) criteria.appOwner = appOwner;
    if (isValid !== undefined) criteria.isValid = isValid === 'true';

    const apps = await dataManager.searchApps(criteria);
    res.json({
      success: true,
      data: apps,
      count: apps.length,
      criteria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/apps/:appName - Get specific app by appName
router.get('/:appName', async (req, res) => {
  try {
    const { appName } = req.params;
    const app = await dataManager.findAppByAppName(appName);
    
    if (!app) {
      return res.status(404).json({
        success: false,
        error: 'App not found'
      });
    }

    res.json({
      success: true,
      data: app
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/apps/:appName - Update app
router.put('/:appName', async (req, res) => {
  try {
    const { appName } = req.params;
    const updateData = req.body;

    // Validate that only allowed fields are being updated
    const allowedFields = ['appOwner', 'isValid'];
    const invalidFields = Object.keys(updateData).filter(field => !allowedFields.includes(field));
    
    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot update fields: ${invalidFields.join(', ')}. Only appOwner and isValid can be updated.`
      });
    }

    const updatedApp = await dataManager.updateApp(appName, updateData);
    res.json({
      success: true,
      data: updatedApp,
      message: 'App updated successfully'
    });
  } catch (error) {
    if (error.message === 'App not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/apps/:appName - Delete app
router.delete('/:appName', async (req, res) => {
  try {
    const { appName } = req.params;
    const deletedApp = await dataManager.deleteApp(appName);
    
    res.json({
      success: true,
      data: deletedApp,
      message: 'App deleted successfully'
    });
  } catch (error) {
    if (error.message === 'App not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router; 