#!/usr/bin/env node

/**
 * Main Build Orchestration Script
 *
 * This script orchestrates all build steps in the correct order:
 * 1. Clean dist/ directory first
 * 2. Run markdown compilation and image optimization in parallel
 * 3. Execute CSS bundling and critical CSS generation sequentially after content tasks
 * 4. Implement error aggregation and exit codes for CI/CD integration
 * 5. Log total build time and summary statistics
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

class BuildOrchestrator {
  constructor() {
    this.startTime = Date.now();
    this.errors = [];
    this.buildStats = {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      skippedTasks: 0
    };
  }

  /**
   * Log a message with timestamp
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = level.toUpperCase().padEnd(5);
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  /**
   * Log an error and add to error collection
   */
  logError(message, error = null) {
    this.log(message, 'error');
    this.errors.push({ message, error: error?.message || error });
    this.buildStats.failedTasks++;
  }

  /**
   * Execute a build script and return promise
   */
  async executeScript(scriptPath, description) {
    return new Promise((resolve, reject) => {
      this.log(`Starting: ${description}`);

      const child = spawn('node', [scriptPath], {
        stdio: 'inherit',
        cwd: process.cwd()
      });

      child.on('close', (code) => {
        if (code === 0) {
          this.log(`Completed: ${description}`);
          this.buildStats.completedTasks++;
          resolve();
        } else {
          const errorMsg = `Failed: ${description} (exit code: ${code})`;
          this.logError(errorMsg);
          reject(new Error(errorMsg));
        }
      });

      child.on('error', (error) => {
        const errorMsg = `Error executing: ${description}`;
        this.logError(errorMsg, error);
        reject(error);
      });
    });
  }

  /**
   * Clean the dist/ directory
   */
  async cleanDistDirectory() {
    this.log('Phase 1: Cleaning dist/ directory');
    this.buildStats.totalTasks++;

    try {
      const distPath = path.join(process.cwd(), 'dist');

      // Check if dist directory exists
      try {
        await fs.access(distPath);
        // Remove all contents
        await fs.rm(distPath, { recursive: true, force: true });
        this.log('Removed existing dist/ directory');
      } catch (error) {
        // Directory doesn't exist, which is fine
        this.log('dist/ directory does not exist (this is fine)');
      }

      // Create fresh dist directory
      await fs.mkdir(distPath, { recursive: true });
      this.log('Created fresh dist/ directory');
      this.buildStats.completedTasks++;

    } catch (error) {
      this.logError('Failed to clean dist/ directory', error);
      throw error;
    }
  }

  /**
   * Run content processing tasks in parallel (markdown compilation + image optimization)
   */
  async runContentProcessing() {
    this.log('Phase 2: Running content processing tasks in parallel');
    this.buildStats.totalTasks += 2;

    const tasks = [];

    // Check if markdown compilation script exists
    const markdownScript = path.join(process.cwd(), 'build', 'compile-markdown.js');
    try {
      await fs.access(markdownScript);
      tasks.push(this.executeScript(markdownScript, 'Markdown compilation'));
    } catch (error) {
      this.log('Warning: compile-markdown.js not found, skipping markdown compilation', 'warn');
      this.buildStats.skippedTasks++;
      this.buildStats.totalTasks--;
    }

    // Check if image optimization script exists
    const imageScript = path.join(process.cwd(), 'build', 'optimize-images.js');
    try {
      await fs.access(imageScript);
      tasks.push(this.executeScript(imageScript, 'Image optimization'));
    } catch (error) {
      this.log('Warning: optimize-images.js not found, skipping image optimization', 'warn');
      this.buildStats.skippedTasks++;
      this.buildStats.totalTasks--;
    }

    if (tasks.length === 0) {
      this.log('No content processing tasks found to execute');
      return;
    }

    try {
      await Promise.all(tasks);
      this.log('All content processing tasks completed');
    } catch (error) {
      this.logError('Content processing phase failed');
      throw error;
    }
  }

  /**
   * Run CSS processing tasks sequentially (CSS bundling → critical CSS generation)
   */
  async runCssProcessing() {
    this.log('Phase 3: Running CSS processing tasks sequentially');

    // CSS Bundling
    const cssScript = path.join(process.cwd(), 'build', 'bundle-css.js');
    try {
      await fs.access(cssScript);
      this.buildStats.totalTasks++;
      await this.executeScript(cssScript, 'CSS bundling');
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.log('Warning: bundle-css.js not found, skipping CSS bundling', 'warn');
        this.buildStats.skippedTasks++;
      } else {
        throw error;
      }
    }

    // Critical CSS Generation (runs after CSS bundling)
    const criticalCssScript = path.join(process.cwd(), 'build', 'generate-critical-css.js');
    try {
      await fs.access(criticalCssScript);
      this.buildStats.totalTasks++;
      await this.executeScript(criticalCssScript, 'Critical CSS generation');
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.log('Warning: generate-critical-css.js not found, skipping critical CSS generation', 'warn');
        this.buildStats.skippedTasks++;
      } else {
        throw error;
      }
    }
  }

  /**
   * Log build summary and statistics
   */
  logBuildSummary() {
    const endTime = Date.now();
    const totalTime = endTime - this.startTime;
    const minutes = Math.floor(totalTime / 60000);
    const seconds = ((totalTime % 60000) / 1000).toFixed(2);

    this.log('='.repeat(60));
    this.log('BUILD SUMMARY');
    this.log('='.repeat(60));
    this.log(`Total build time: ${minutes}m ${seconds}s`);
    this.log(`Total tasks: ${this.buildStats.totalTasks}`);
    this.log(`Completed tasks: ${this.buildStats.completedTasks}`);
    this.log(`Failed tasks: ${this.buildStats.failedTasks}`);
    this.log(`Skipped tasks: ${this.buildStats.skippedTasks}`);

    if (this.errors.length > 0) {
      this.log('');
      this.log('ERRORS ENCOUNTERED:');
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error.message}`);
        if (error.error) {
          this.log(`   Details: ${error.error}`);
        }
      });
    }

    this.log('='.repeat(60));
  }

  /**
   * Main build orchestration method
   */
  async build() {
    try {
      this.log('Starting build orchestration');
      this.log(`Working directory: ${process.cwd()}`);

      // Phase 1: Clean dist/ directory
      await this.cleanDistDirectory();

      // Phase 2: Run content processing in parallel
      await this.runContentProcessing();

      // Phase 3: Run CSS processing sequentially
      await this.runCssProcessing();

      this.log('Build orchestration completed successfully');
      this.logBuildSummary();

      // Exit with success code
      process.exit(0);

    } catch (error) {
      this.logError('Build orchestration failed', error);
      this.logBuildSummary();

      // Exit with error code for CI/CD integration
      process.exit(1);
    }
  }
}

// Execute build if this script is run directly
if (require.main === module) {
  const orchestrator = new BuildOrchestrator();
  orchestrator.build();
}

module.exports = BuildOrchestrator;