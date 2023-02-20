module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: './build',
      settings: {
        skipAudits: [],
        chromeFlags: [
          '--no-sandbox',
          '--headless',
          '--disable-dev-shm-usage',
          '--no-first-run'
        ].join(' ')
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/audits'
    },
    // assert: {},
    // server: {},
    // wizard: {},
  },
};
