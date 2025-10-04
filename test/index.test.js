// Test file for SuperRefactor Pro extension

const assert = require('assert');

// Simple test runner for vanilla JS
function runTests() {
    console.log('Running SuperRefactor Pro tests...');
    
    // Test 1: Extension can be required (with mock vscode module)
    try {
        // Setup mock before requiring extension
        const Module = require('module');
        const originalRequire = Module.prototype.require;
        Module.prototype.require = function(id) {
            if (id === 'vscode') {
                return require('./vscode-mock');
            }
            return originalRequire.apply(this, arguments);
        };
        
        const extension = require('../src/extension');
        assert(typeof extension.activate === 'function', 'Extension should have activate function');
        assert(typeof extension.deactivate === 'function', 'Extension should have deactivate function');
        console.log('✅ Extension structure test passed');
        
        // Restore original require
        Module.prototype.require = originalRequire;
    } catch (error) {
        console.error('❌ Extension structure test failed:', error.message);
    }

    // Test 2: Core module exists
    try {
        const { RefactorEngine } = require('../src/core');
        const engine = new RefactorEngine();
        assert(typeof engine.addJob === 'function', 'RefactorEngine should have addJob method');
        console.log('✅ Core module test passed');
    } catch (error) {
        console.error('❌ Core module test failed:', error.message);
    }

    // Test 3: Adapters module exists
    try {
        const { JSToTSMigrator, PythonRefactor } = require('../src/adapters');
        const migrator = new JSToTSMigrator();
        const pythonRefactor = new PythonRefactor();
        assert(typeof migrator.migrate === 'function', 'JSToTSMigrator should have migrate method');
        assert(typeof pythonRefactor.refactor === 'function', 'PythonRefactor should have refactor method');
        console.log('✅ Adapters module test passed');
    } catch (error) {
        console.error('❌ Adapters module test failed:', error.message);
    }

    console.log('Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests };