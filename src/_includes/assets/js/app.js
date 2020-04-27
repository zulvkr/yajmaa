// place for vue app
var navbar = new Vue({
  el: "#navbar"
});


var fundingForm = new Vue({
  el: "#fundingForm",
  data: {
    amount: '',
    toggle: true,
    currency: "Rp",
    step: 0,
    paymentMethod: false,
  },
  computed: {
    amountFormatted: function () {
      return this.thousandSeprator(this.amount)
    }
  },
  methods: {
    onBlurNumber() {
      this.toggle = false;
    },
    onFocusText() {
      this.toggle = true;
      this.amount = '';
    },
    thousandSeprator(amount) {
      if (amount !== '' || amount !== undefined || amount !== 0 || amount !== '0' || amount !== null) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return amount;
      }
    },
    nextStep: function() {
      this.step++;
    },
    previousStep: function() {
      this.step--;
    }
  }
})