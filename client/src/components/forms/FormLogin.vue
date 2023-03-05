<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="title title-fz20 form__title">Log in</div>
    <input-form
        id="username"
        label="username"
        v-model.trim="username"
        type="text"
        required
        minlength="2"
        class="validate"
    >
      <template v-slot:label>Username</template>
    </input-form>
    <div class="form__error" v-if="usernameError">{{ usernameError }}</div>

    <input-form
        id="password"
        label="password"
        v-model.trim="password"
        :type="passwordFieldType"
        required
        class="validate"
    >
      <template v-slot:label>Password</template>
      <template v-slot:icon>
        <i
            class="material-icons form__iconPassword"
            @click="switchVisibility"
        >
          {{ visible }}
        </i>
      </template>
    </input-form>
    <div class="form__error" v-if="passwordError">{{ passwordError }}</div>
    <div class="form__buttons">
      <main-button class="form__button" type="submit">
        <template v-slot:text>Log in</template>
        <template v-slot:icon>check_circle</template>
      </main-button>
      <router-link
          to="/register"
          class="form__button-flat waves-effect waves-light"
      >
        I haven`t account
      </router-link>
    </div>

  </form>
</template>

<script>
import InputForm from "@/components/UI/InputForm.vue";
import MainButton from "@/components/UI/MainButton.vue";
import router from "@/router";
export default {
  name: 'form-login',
  components: { MainButton, InputForm },
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      passwordFieldType: 'password',
      visible: 'visibility'
    }
  },
  methods: {
    validateForm() {
      let isValid = true

      if (this.username.length < 2) {
        this.usernameError = 'Username must be at least 2 characters'
        isValid = false
      } else {
        this.usernameError = ''
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters'
        isValid = false
      } else {
        this.passwordError = ''
      }

      return isValid
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.visible = this.visible === 'visibility' ? 'visibility_off' : 'visibility';
     },
    submitForm() {
      if (this.validateForm()) {
        this.$store.dispatch('authModule/onLogin', {
          username: this.username,
          password: this.password
        }).then((res) => {
          // this.$message(res?.data.message);
          this.usernameError = '';
          this.passwordError = '';
          this.username = '';
          this.password = '';
          router.push({ name: 'home' })
        }).catch();
      } else {
        console.log('Form is invalid')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__iconPassword {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
  }
  &__button-flat {
    border: 1px solid var(--color-accent3);
    color: var(--color-accent3);
    font-weight: 500;
    border-radius: 20px;
    padding: 11px 30px;
    text-transform: uppercase;
    text-align: center;
  }
}
</style>