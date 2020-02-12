<template>
  <section id="register-section" class="container">
    <div class="row">
      <div class="mt-5 offset-md-3 col-md-6">
        <div class="card">
          <h1 class="card-header text-center">CURRENCY CONVERTER</h1>
          <div class="card-body">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <form class="p-4" @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-group">
                  <ValidationProvider rules="required|number" v-slot="{ errors }">
                    <label for>Currency</label>
                    <input
                      class="form-control"
                      type="text"
                      name="currency"
                      placeholder="THB"
                      v-bind:class="{ 'is-invalid': errors[0] }"
                      v-model.trim="form.currency"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <label for>Currency Type</label>
                    <select
                      class="form-control"
                      name="currency_type"
                      v-bind:class="{ 'is-invalid': errors[0] }"
                      v-model.trim="form.currency_type"
                    >
                      <option value>Choose</option>
                      <option
                        v-for="option in currency_type_datas"
                        v-bind:key="option"
                        v-bind:value="option"
                      >{{ option }}</option>
                    </select>
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                <div class="form-group">
                  <button
                    type="submit"
                    @click="onSubmit()"
                    class="btn btn-sm btn-info btn-block mt-5"
                  >Get Currency</button>
                </div>

                <h4 v-if="rate_info.convert" class="mt-3">Your convert rate</h4>
                <hr v-if="rate_info.convert" />
                <p v-if="rate_info.convert_from">From: {{ rate_info.convert_from }}</p>
                <p v-if="rate_info.convert_to">To: {{ rate_info.convert_to }}</p>
                <p v-if="rate_info.convert">Rate: {{ rate_info.convert }}</p>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        currency: "",
        currency_type: ""
      },
      currency_type_datas: [
        "AED",
        "ARS",
        "AUD",
        "BGN",
        "BRL",
        "BSD",
        "CAD",
        "CHF",
        "CLP",
        "CNY",
        "COP",
        "CZK",
        "DKK",
        "DOP",
        "EGP",
        "EUR",
        "FJD",
        "GBP",
        "GTQ",
        "HKD",
        "HRK",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "ISK",
        "JPY",
        "KRW",
        "KZT",
        "MXN",
        "MYR",
        "NOK",
        "NZD",
        "PAB",
        "PEN",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "RON",
        "RUB",
        "SAR",
        "SEK",
        "SGD",
        "TRY",
        "TWD",
        "UAH",
        "USD",
        "UYU",
        "ZAR"
      ],
      rate_info: {
        convert_from: "",
        convert_to: "",
        convert: ""
      },
      errorMessage: ""
    };
  },
  name: "Register",
  methods: {
    async onSubmit() {
      console.log(this.form);
      try {
        let res = await axios
          .get(`https://api.exchangerate-api.com/v4/latest/THB`)
          .catch(err => {
            console.log(err.response.data.message);
            this.errorMessage = err.response.data.message;
          });
        if (res) {
          // console.log(res.data.rates);

          this.rate_info.convert_from = "THB";
          this.rate_info.convert_to = this.form.currency_type;
          this.rate_info.convert =
            this.form.currency * res.data.rates[this.form.currency_type];
          // console.log(this.rate_info);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style scope>
.img-logo {
  width: 80%;
  display: block;
  margin: auto;
}
</style>
