let options = {
  template: '<p>{{firstName}}{{lastName aka {{alias}}</p>',
  data: function() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  },
  created(){
    console.log('onCreated-1')
  }
}
