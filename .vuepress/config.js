module.exports = {
  description: 'The shipcloud.io developer portal is your one stop for all developer needs.',
  title: 'shipcloud.io - Developer Portal',
  markdown: {
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-footnote'));
    },
    lineNumbers: true
  },

  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Basic Concepts',
        link: '/concepts/'
      },
      {
        text: 'Carrier Specifics',
        link: '/carrier/'
        // items: [
        //   {
        //     text: 'Basic info',
        //     link: '/carrier/'
        //   }, {
        //     text: 'DHL',
        //     link: '/carrier/dhl'
        //   }, {
        //     text: 'DHL Express',
        //     link: '/carrier/dhl_express'
        //   }, {
        //     text: 'UPS',
        //     link: '/carrier/ups'
        //   }
        // ]
      },
      {
        text: 'Examples',
        link: '/examples/'
      },
      {
        text: 'API Reference',
        link: '/reference/'
      }
    ],

    sidebar: {
      // '/': [
      //   {
      //     title: 'main',
      //     collapsable: false,
      //     children: [
      //       'concepts',
      //       'examples'
      //     ]
      //   }
      // ],
      '/carrier/': [
        'dhl',
        ['dhl_express', 'DHL Express'],
        'ups'
      ]
    }
  },

  port: 4000
};
