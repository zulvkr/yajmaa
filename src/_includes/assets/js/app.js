if (document.querySelector("#fundingForm")) {
  var fundingForm = new Vue({
    el: "#fundingForm",
    data: {
      errors: [],
      amount: '',
      seen: 'text',
      currency: 'Rp',
      step: 0,
      paymentMethod: false,
      name: null,
      whatsapp: null,
    },
    computed: {
      amountFormatted: function () {
        return this.thousandSeprator(this.amount)
      }
    },
    methods: {
      checkForm = function() {
        if (this.name && this.whatsapp && this.amount && this.paymentMethod && this.currency) {
          this.errors = [];
          this.step++;
        }
  
        this.errors = [];
  
        if (!this.amount) {
          this.errors.push('Jumlah donasi');
        }
        if (!this.currency) {
          this.errors.push('Mata uang');
        }
        if (!this.name) {
          this.errors.push('Nama');
        }
        if (!this.whatsapp) {
          this.errors.push('Whatsapp');
        }
        if (!this.paymentMethod) {
          this.errors.push('Metode pembayaran');
        }
  
      },
      onBlurNumber() {
        this.seen = "text";
      },
      onFocusText() {
        this.seen = "number";
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
}