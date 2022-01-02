window.APP = new window.Vue({
  name: 'APP',
  el: '#app',
  data: {
    choices: [
      {
        name: 'MONEY',
        state: 0
      },
      {
        name: 'PHYSIQUE',
        state: 0
      },
      {
        name: 'INTELLIGENCE',
        state: 0
      }
    ],
    guidestate: false,
    messagestate: false
  },
  mounted () {
    if (window.location.search) {
      let str = window.location.search.substr(1)
      let arr = str.split('&').filter(item => item !== 'msg=false')

      this.choices = []

      arr.map((item, index) => {
        if (item === 'msg=true') {
          return
        }
        if (index >= 3) {
          return
        }

        this.choices.push({
          name: item.replaceAll('%', ' '),
          state: false
        })
      })

      if (str.split('&').filter(item => item === 'msg=true').length > 0) {
        this.messagestate = true
      }
    }
  },
  methods: {
    select (index, state) {
      if (state) {
        this.choices[index].state = !this.choices[index].state
        return
      }

      let length
      if (this.choices.length - 2 <= 0) {
        length = 0
      } else {
        length = this.choices.length - 2
      }

      if (this.choices.filter(choice => choice.state).length > length) {
        let arr = []
        this.choices.map((choice, index) => {
          if (choice.state) {
            arr.push(index)
          }
        })

        this.choices[arr[Math.floor(Math.random() * (length + 1))]].state = false
      }

      this.choices[index].state = !this.choices[index].state
    },
    displayGuide () {
      this.guidestate = !this.guidestate
    },
    exitGuide () {
      this.guidestate = false
    }
  }
})
