// Axios example that actually not used in the end,
// but quite nice

// axios.get('/bankList.json')
// .then(response => {
//     const banks = response.data.banks;
//     bankList = [...banks];
// })
// .catch(error => console.error(error));

if (document.querySelector("#fundingForm")) {
  let selectedBank = [];
  for (i of bank) {
    selectedBank.push(bankList.banks[i - 1])
  }
  let currencies = bankList.currency;

  // Initialize VueCleave
  Vue.use(VueCleave);

  let fundingForm = new Vue({
    el: "#fundingForm",
    data: {
      banks: selectedBank,
      currencies: currencies,
      errors: [],
      form: {
        currency: currencies[0],
        amount: null,
        paymentMethod: 1,
        name: "",
        whatsapp: "",
      },
      options: {
        amount: {
          numeral: true,
          numeralDecimalMark: ',',
          delimiter: '.'
        }
      },
      currency: currencies[0],
      amount: null,
      amountOption: {
        numeral: true,
        numeralDecimalMark: ',',
        delimiter: '.'
      },
      step: 0,
      paymentMethod: 1,
      name: "",
      whatsapp: ""
    },
    computed: {
      amountFormatted: function () {
        return this.thousandSeparator(this.form.amount)
      }
    },
    methods: {
      checkForm: function () {
        if (this.form.name && this.form.whatsapp && this.form.amount && this.form.paymentMethod && this.form.currency) {
          this.errors = [];
          this.step++;
        }
        this.errors = [];

        if (!this.form.amount) {
          this.errors.push(' Jumlah donasi');
        }
        if (!this.form.currency) {
          this.errors.push(' Mata uang');
        }
        if (!this.form.name) {
          this.errors.push(' Nama');
        }
        if (!this.form.whatsapp) {
          this.errors.push(' Nomor Whatsapp');
        }
        if (!this.form.paymentMethod) {
          this.errors.push(' Metode pembayaran');
        }

      },
      thousandSeparator(amount) {
        if (amount !== '' && amount !== undefined && amount !== 0 && amount !== '0' && amount !== null) {
          return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          return amount;
        }
      },
      nextStep: function () {
        this.step++;
      },
      previousStep: function () {
        this.step--;
      },
    }
  })
}