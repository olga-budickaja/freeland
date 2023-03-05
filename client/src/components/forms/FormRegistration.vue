<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="title title-fz20 form__title">Registration</div>
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
        id="email"
        label="email"
        v-model.trim="email"
        type="email"
        required
        :pattern="emailPattern"
        class="validate"
    >
      <template v-slot:label>Email</template>
    </input-form>
    <div class="form__error" v-if="emailError">{{ emailError }}</div>

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

    <input-form
        id="confirmPassword"
        label="confirmPassword"
        v-model.trim="confirmPassword"
        :type="passwordFieldType"
        required
        class="validate"
    >
      <template v-slot:label>Confirm Password</template>
      <template v-slot:icon>
        <i
            class="material-icons form__iconPassword"
            @click="switchVisibility"
        >
          {{ visible }}
        </i>
      </template>
    </input-form>
    <div class="form__error" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>

    <p>
      <label>
        <input type="checkbox" v-model="isSeller"/>
        <span>Are you a seller?</span>
      </label>
    </p>

    <div class="form__buttons">
      <main-button class="form__button" type="submit">
        <template v-slot:text>Register</template>
        <template v-slot:icon>check_circle</template>
      </main-button>
      <router-link
          to="/login"
          class="form__button-flat waves-effect waves-light"
      >
        I have account
      </router-link>
    </div>

  </form>
</template>

<script>
import InputForm from "@/components/UI/InputForm.vue";
import MainButton from "@/components/UI/MainButton.vue";
import router from "@/router";
import { authApi } from "@/auth-api";
export default {
  name: 'form-registration',
  components: { MainButton, InputForm },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailPattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      isSeller: false,
      passwordFieldType: 'password',
      visible: 'visibility',
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

      if (!this.emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format'
        isValid = false
      } else {
        this.emailError = ''
      }

      if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters'
        isValid = false
      } else {
        this.passwordError = ''
      }

      if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = 'Passwords do not match'
        isValid = false
      } else {
        this.confirmPasswordError = ''
      }
      return isValid
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.visible = this.visible === 'visibility' ? 'visibility_off' : 'visibility';
    },
    async submitForm() {
      if (this.validateForm()) {
          authApi.register(
              this.username,
              this.email,
              this.password,
              this.isSeller
          ).then((res) => {
            this.$message(res.data.message);
            this.usernameError = '';
            this.emailError = '';
            this.passwordError = '';
            this.confirmPasswordError = '';
            this.username = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.isSeller = false;
            router.push({ name: 'login' });
          }).catch((res) => {
            res.status = 500 && this.$message('User already exists!');
          })
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