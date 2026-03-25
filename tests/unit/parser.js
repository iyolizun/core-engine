const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class Parser extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      encoding: 'utf8',
      strictMode: false,
      ...options
    };
  }

  async parseFile(filePath) {
    try {
      const absolutePath = path.resolve(filePath);
      if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
      }

      const data = await fs.promises.readFile(absolutePath, this.options.encoding);
      const parsedData = this._parse(data);
      this.emit('parsed', parsedData);
      return parsedData;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  _parse(data) {
    if (this.options.strictMode && !data.trim()) {
      throw new Error('Empty data provided in strict mode');
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      if (this.options.strictMode) {
        throw new Error(`Invalid JSON: ${error.message}`);
      }
      return data;
    }
  }

  static validateSchema(data, schema) {
    if (!schema) return true;

    const missingKeys = Object.keys(schema).filter(key => !(key in data));
    if (missingKeys.length > 0) {
      throw new Error(`Missing required fields: ${missingKeys.join(', ')}`);
    }

    return true;
  }
}

module.exports = Parser;